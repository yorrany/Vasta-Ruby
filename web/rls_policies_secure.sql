-- ============================================
-- 🔐 VASTA SECURITY HARDENING - RLS POLICIES
-- ============================================
-- Execute this in Supabase SQL Editor
-- 
-- IMPORTANTE: Este script corrige vulnerabilidades críticas
-- onde policies usavam USING (true), permitindo acesso 
-- irrestrito aos dados.
-- ============================================

-- =====================
-- HELPER FUNCTION
-- =====================
-- Função para obter tenant_id do usuário autenticado
CREATE OR REPLACE FUNCTION get_user_tenant_id()
RETURNS bigint AS $$
  SELECT tenant_id FROM public.profiles WHERE id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- =====================
-- TENANTS TABLE
-- =====================
-- ANTES: USING (true) - Qualquer pessoa podia ver todos os tenants
-- DEPOIS: Apenas o tenant do próprio usuário

DROP POLICY IF EXISTS "Public read tenants" ON public.tenants;

-- Usuários autenticados só podem ver seu próprio tenant
CREATE POLICY "Users can view own tenant" ON public.tenants 
  FOR SELECT USING (
    id = get_user_tenant_id()
  );

-- =====================
-- PROFILES TABLE  
-- =====================
-- Perfis públicos são necessários para páginas /@username
-- Mas precisamos de controle mais granular

DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Leitura pública APENAS de profiles ativos (para páginas públicas /@username)
-- Isso é seguro pois são perfis que o usuário QUER que sejam públicos
CREATE POLICY "Public read active profiles" ON public.profiles 
  FOR SELECT USING (
    status = 'active'
  );

-- Usuários podem atualizar APENAS seu próprio profile
-- WITH CHECK impede que alterem tenant_id (escalada de privilégio)
CREATE POLICY "Users update own profile" ON public.profiles 
  FOR UPDATE USING (
    auth.uid() = id
  ) WITH CHECK (
    auth.uid() = id
    AND tenant_id = get_user_tenant_id() -- Impede alteração de tenant
  );

-- Insert apenas para o próprio usuário
-- O trigger handle_new_user já cuida disso, mas policy extra é defesa em profundidade
CREATE POLICY "Users insert own profile" ON public.profiles 
  FOR INSERT WITH CHECK (
    auth.uid() = id
  );

-- =====================
-- LINKS TABLE
-- =====================
-- Links devem ser públicos apenas se:
-- 1. O profile associado está ativo
-- 2. O próprio link está ativo (is_active = true)

DROP POLICY IF EXISTS "Public read links" ON public.links;
DROP POLICY IF EXISTS "Users can manage own links" ON public.links;

-- Links públicos apenas de profiles ativos e links ativos
CREATE POLICY "Public read active user links" ON public.links 
  FOR SELECT USING (
    is_active = true
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = links.profile_id 
      AND profiles.status = 'active'
    )
  );

-- Gerenciamento de links próprios com WITH CHECK
CREATE POLICY "Users manage own links" ON public.links 
  FOR ALL USING (
    auth.uid() = profile_id
  ) WITH CHECK (
    auth.uid() = profile_id
  );

-- =====================
-- PRODUCTS TABLE
-- =====================
-- Produtos públicos seguem mesma lógica de links

DROP POLICY IF EXISTS "Public read products" ON public.products;
DROP POLICY IF EXISTS "Users can manage own products" ON public.products;

-- Produtos públicos apenas de profiles ativos e status ativo
CREATE POLICY "Public read active products" ON public.products 
  FOR SELECT USING (
    status = 'active'
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = products.profile_id 
      AND profiles.status = 'active'
    )
  );

-- Usuários gerenciam próprios produtos
CREATE POLICY "Users manage own products" ON public.products 
  FOR ALL USING (
    auth.uid() = profile_id
  ) WITH CHECK (
    auth.uid() = profile_id
  );

-- =====================
-- ORDERS TABLE (SENSÍVEL)
-- =====================
-- Orders contém dados financeiros sensíveis
-- Frontend NUNCA deve poder inserir/atualizar orders diretamente

DROP POLICY IF EXISTS "Users can view their sales" ON public.orders;

-- Vendedores veem apenas suas vendas (SELECT)
CREATE POLICY "Sellers view own sales" ON public.orders 
  FOR SELECT USING (
    auth.uid() = profile_id
  );

-- NÃO criar policies INSERT/UPDATE para usuários normais
-- Inserção de orders só via service_role (backend) ou RPC functions

-- =====================
-- VERIFICATION QUERIES
-- =====================
-- Execute estas queries para verificar as policies aplicadas:

-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies 
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
