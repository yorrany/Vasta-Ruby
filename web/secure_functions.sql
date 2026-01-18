-- ============================================
-- 🔐 VASTA SECURITY HARDENING - SECURE FUNCTIONS
-- ============================================
-- Execute this in Supabase SQL Editor
-- 
-- Funções com SECURITY DEFINER para operações críticas
-- que devem ser controladas pelo backend, não pelo frontend.
-- ============================================

-- =====================
-- CREATE ORDER (Segura)
-- =====================
-- Apenas backend (via service_role) deve criar orders
-- Esta função valida e cria a order atomicamente

CREATE OR REPLACE FUNCTION create_order(
  p_profile_id uuid,
  p_product_id bigint,
  p_buyer_email text,
  p_amount numeric,
  p_stripe_payment_intent_id text
)
RETURNS bigint AS $$
DECLARE
  new_order_id bigint;
  v_product_exists boolean;
BEGIN
  -- Validação: Amount deve ser positivo
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be positive';
  END IF;

  -- Validação: Email deve estar presente
  IF p_buyer_email IS NULL OR p_buyer_email = '' THEN
    RAISE EXCEPTION 'Buyer email is required';
  END IF;

  -- Validação: Product existe e pertence ao profile
  SELECT EXISTS(
    SELECT 1 FROM public.products 
    WHERE id = p_product_id 
    AND profile_id = p_profile_id
    AND status = 'active'
  ) INTO v_product_exists;

  IF NOT v_product_exists THEN
    RAISE EXCEPTION 'Product not found or not active';
  END IF;

  -- Criar order
  INSERT INTO public.orders (
    profile_id, 
    product_id, 
    buyer_email, 
    amount, 
    stripe_payment_intent_id, 
    status,
    created_at
  ) VALUES (
    p_profile_id, 
    p_product_id, 
    p_buyer_email,
    p_amount, 
    p_stripe_payment_intent_id, 
    'paid',
    now()
  ) RETURNING id INTO new_order_id;

  -- Incrementar contador de vendas do produto
  UPDATE public.products 
  SET sales_count = COALESCE(sales_count, 0) + 1,
      updated_at = now()
  WHERE id = p_product_id;

  RETURN new_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Revogar acesso público - apenas service_role pode chamar
REVOKE ALL ON FUNCTION create_order FROM PUBLIC;
REVOKE ALL ON FUNCTION create_order FROM anon;
REVOKE ALL ON FUNCTION create_order FROM authenticated;

-- =====================
-- RECORD SECURITY EVENT
-- =====================
-- Função para registrar eventos de segurança
-- Chamada pelo backend para auditoria

CREATE OR REPLACE FUNCTION record_security_event(
  p_action text,
  p_resource_type text DEFAULT NULL,
  p_resource_id text DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS bigint AS $$
DECLARE
  v_user_id uuid;
  v_tenant_id bigint;
  new_log_id bigint;
BEGIN
  -- Obter contexto do usuário atual (se autenticado)
  v_user_id := auth.uid();
  
  IF v_user_id IS NOT NULL THEN
    SELECT tenant_id INTO v_tenant_id 
    FROM public.profiles 
    WHERE id = v_user_id;
  END IF;

  INSERT INTO public.security_audit_logs (
    user_id,
    tenant_id,
    action,
    resource_type,
    resource_id,
    metadata,
    created_at
  ) VALUES (
    v_user_id,
    v_tenant_id,
    p_action,
    p_resource_type,
    p_resource_id,
    p_metadata,
    now()
  ) RETURNING id INTO new_log_id;

  RETURN new_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permitir que authenticated users registrem eventos (para ações de frontend)
GRANT EXECUTE ON FUNCTION record_security_event TO authenticated;

-- =====================
-- SAFE PROFILE UPDATE
-- =====================
-- Função segura para atualizar profile
-- Previne alteração de campos críticos como tenant_id

CREATE OR REPLACE FUNCTION safe_update_profile(
  p_display_name text DEFAULT NULL,
  p_bio text DEFAULT NULL,
  p_username text DEFAULT NULL,
  p_profile_image text DEFAULT NULL,
  p_cover_image text DEFAULT NULL,
  p_theme text DEFAULT NULL,
  p_link_style text DEFAULT NULL,
  p_typography text DEFAULT NULL,
  p_accent_color text DEFAULT NULL,
  p_bg_color text DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  -- Validar que usuário está autenticado
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- Validar username (se fornecido)
  IF p_username IS NOT NULL THEN
    -- Username deve ser lowercase e alfanumérico
    IF p_username !~ '^[a-z0-9_]{3,30}$' THEN
      RAISE EXCEPTION 'Username must be 3-30 lowercase alphanumeric characters';
    END IF;
    
    -- Verificar se username já existe (exceto para o próprio usuário)
    IF EXISTS(
      SELECT 1 FROM public.profiles 
      WHERE username = p_username 
      AND id != auth.uid()
    ) THEN
      RAISE EXCEPTION 'Username already taken';
    END IF;
  END IF;

  -- Atualizar apenas campos permitidos
  UPDATE public.profiles SET
    display_name = COALESCE(p_display_name, display_name),
    bio = COALESCE(p_bio, bio),
    username = COALESCE(p_username, username),
    profile_image = COALESCE(p_profile_image, profile_image),
    cover_image = COALESCE(p_cover_image, cover_image),
    theme = COALESCE(p_theme, theme),
    link_style = COALESCE(p_link_style, link_style),
    typography = COALESCE(p_typography, typography),
    accent_color = COALESCE(p_accent_color, accent_color),
    bg_color = COALESCE(p_bg_color, bg_color),
    updated_at = now()
  WHERE id = auth.uid();

  -- Log da atualização
  PERFORM record_security_event(
    'profile_update',
    'profile',
    auth.uid()::text,
    jsonb_build_object('fields_updated', ARRAY[
      CASE WHEN p_display_name IS NOT NULL THEN 'display_name' END,
      CASE WHEN p_bio IS NOT NULL THEN 'bio' END,
      CASE WHEN p_username IS NOT NULL THEN 'username' END
    ])
  );

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usuários autenticados podem usar esta função
GRANT EXECUTE ON FUNCTION safe_update_profile TO authenticated;
