# 🧪 GUIA DE TESTE COMPLETO - PRODUÇÃO

**Data**: 2026-01-25  
**Status**: Sistema pronto para testes em produção

## ⚠️ IMPORTANTE

Este é um teste em **PRODUÇÃO**. Pagamentos reais serão processados.  
Use um cartão real com um valor que você pode reembolsar.

---

## 📋 Teste 1: Signup e Plano Gratuito (5 min)

### Objetivo

Verificar se novos usuários entram corretamente no plano gratuito.

### Passos

1. ✅ Abra https://vasta.pro em uma aba anônima
2. ✅ Clique em "Começar grátis" no plano "Começo"
3. ✅ Complete o signup com um email de teste
4. ✅ Verifique se foi redirecionado para /onboarding
5. ✅ Complete o onboarding
6. ✅ Vá para Dashboard → Billing

### Verificações

- [ ] Plano atual mostra "Começo"
- [ ] `plan_code` no Supabase = `'start'`
- [ ] Não há `stripe_customer_id`

### SQL para verificar

```sql
SELECT
  email,
  username,
  plan_code,
  stripe_customer_id,
  subscription_status
FROM profiles
WHERE email = 'SEU_EMAIL_DE_TESTE'
ORDER BY created_at DESC
LIMIT 1;
```

---

## 💳 Teste 2: Upgrade para Plano Pro (10 min)

### Objetivo

Testar fluxo completo de pagamento em produção.

### Preparação

⚠️ **ATENÇÃO**: Este teste cobrará R$ 49,00 no seu cartão real!  
Você pode cancelar e pedir reembolso logo após.

### Passos

1. ✅ Faça login com o usuário de teste
2. ✅ Vá para Dashboard → Billing
3. ✅ Clique em "Fazer Upgrade" no plano Pro
4. ✅ Preencha os dados do cartão **REAL**
5. ✅ Complete o pagamento
6. ✅ Aguarde redirecionamento para /checkout/success
7. ✅ Aguarde redirecionamento automático para /dashboard

### Verificações Imediatas

- [ ] Página de sucesso apareceu
- [ ] Mensagem "Pagamento Confirmado!" mostrada
- [ ] Redirecionamento para dashboard funcionou

### Verificações no Dashboard

- [ ] Plano atual mostra "Pro"
- [ ] Badge "RECOMENDADO" aparece no plano Pro
- [ ] Plano Pro está marcado como "Plano Atual"
- [ ] Botão de upgrade está desabilitado no plano Pro

### Verificações no Supabase

Execute este SQL:

```sql
SELECT
  email,
  username,
  plan_code,
  stripe_customer_id,
  stripe_subscription_id,
  subscription_status,
  updated_at
FROM profiles
WHERE email = 'SEU_EMAIL_DE_TESTE';
```

Esperado:

- [ ] `plan_code` = `'pro'`
- [ ] `stripe_customer_id` começa com `cus_`
- [ ] `stripe_subscription_id` começa com `sub_`
- [ ] `subscription_status` = `'active'`

### Verificações no Stripe Dashboard

1. Acesse: https://dashboard.stripe.com/payments
2. Verifique:
   - [ ] Pagamento de R$ 49,00 aparece
   - [ ] Status: "Succeeded"
   - [ ] Cliente criado
   - [ ] Assinatura criada

3. Acesse: https://dashboard.stripe.com/webhooks
4. Clique no seu webhook
5. Verifique:
   - [ ] Eventos foram enviados
   - [ ] Status 200 (sucesso) nos eventos
   - [ ] Nenhum erro relatado

---

## 🔄 Teste 3: Webhook de Cancelamento (5 min)

### Objetivo

Verificar se cancelamento sincroniza corretamente.

### Passos

1. ✅ Vá para https://dashboard.stripe.com/subscriptions
2. ✅ Encontre a assinatura criada
3. ✅ Clique em "Cancel subscription"
4. ✅ Confirme o cancelamento
5. ✅ Aguarde 5-10 segundos

### Verificações no Supabase

Execute novamente:

```sql
SELECT
  email,
  plan_code,
  subscription_status,
  stripe_subscription_id,
  updated_at
FROM profiles
WHERE email = 'SEU_EMAIL_DE_TESTE';
```

Esperado:

- [ ] `plan_code` voltou para `'start'`
- [ ] `subscription_status` = `'canceled'`
- [ ] `stripe_subscription_id` = NULL
- [ ] `updated_at` foi atualizado

### Verificações no Dashboard da Aplicação

1. ✅ Faça refresh da página de billing
2. Verifique:
   - [ ] Plano atual voltou para "Começo"
   - [ ] Planos Pro/Business mostram botão "Fazer Upgrade"

### Verificações do Webhook

1. Acesse: https://dashboard.stripe.com/webhooks
2. Clique no seu webhook
3. Verifique:
   - [ ] Evento `customer.subscription.deleted` foi enviado
   - [ ] Response: 200
   - [ ] Payload correto

---

## 💰 Teste 4: Reembolso (Opcional - 2 min)

### Passos

1. ✅ Vá para https://dashboard.stripe.com/payments
2. ✅ Encontre o pagamento de R$ 49,00
3. ✅ Clique no pagamento
4. ✅ Clique em "Refund payment"
5. ✅ Confirme o reembolso total

### Verificações

- [ ] Reembolso processado
- [ ] Valor retornará ao cartão em 5-10 dias úteis

---

## 🧹 Limpeza Pós-Teste

### Excluir Dados de Teste (Opcional)

```sql
-- CUIDADO: Isso exclui o usuário de teste!
-- Só execute se tiver certeza
DELETE FROM profiles
WHERE email = 'SEU_EMAIL_DE_TESTE';
```

### Manter Dados

Recomendado! Deixe o usuário de teste para futuras verificações.

---

## 📊 Resultados Esperados

### ✅ Sucesso Total

- Todos os checkboxes marcados
- Sem erros no console
- Dados sincronizados entre Stripe ↔ Supabase
- Webhooks funcionando (status 200)

### ⚠️ Problemas Comuns

#### Webhook não sincroniza

**Sintoma**: Pagamento funciona mas dados não atualizam  
**Solução**:

1. Verifique se `STRIPE_WEBHOOK_SECRET` está correto
2. Veja logs em https://dashboard.stripe.com/webhooks
3. Teste webhook manualmente: "Send test webhook"

#### Erro 500 no checkout

**Sintoma**: Modal de checkout não abre  
**Solução**:

1. Verifique console do browser (F12)
2. Verifique logs do servidor
3. Confirme que Price IDs estão corretos

#### Dados não aparecem no Supabase

**Sintoma**: Pagamento ok mas perfil não atualiza  
**Solução**:

1. Verifique se SQL foi executado corretamente
2. Confirme que colunas existem:

```sql
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name LIKE '%stripe%';
```

---

## 📈 Monitoramento Contínuo

### Diário

- [ ] Verificar https://dashboard.stripe.com/payments
- [ ] Confirmar que webhooks estão 200
- [ ] Verificar se há falhas de pagamento

### Semanal

- [ ] Revisar logs de erro
- [ ] Verificar métricas de conversão
- [ ] Analisar motivos de cancelamento

### Mensal

- [ ] Reconciliar pagamentos Stripe vs Supabase
- [ ] Validar que todos os assinantes ativos têm plano correto
- [ ] Revisar e otimizar taxas de conversão

---

## 🆘 Suporte de Emergência

### Se algo der errado:

**Stripe não funciona:**

- Status da API: https://status.stripe.com
- Suporte: https://support.stripe.com

**Webhook com erro:**

1. Vá para https://dashboard.stripe.com/webhooks
2. Clique no webhook
3. Veja logs de erro
4. Clique em "Send test webhook" para reprocessar

**Banco de dados:**

1. Verifique Supabase logs
2. Confirme que as colunas existem
3. Teste queries manualmente

---

## ✅ Checklist Final

Antes de declarar vitória completa:

- [ ] Teste 1 concluído (signup gratuito)
- [ ] Teste 2 concluído (upgrade pago)
- [ ] Teste 3 concluído (cancelamento webhook)
- [ ] Teste 4 concluído (reembolso)
- [ ] Todos os dados sincronizados
- [ ] Webhooks funcionando 100%
- [ ] Sem erros no console
- [ ] Documentação revisada
- [ ] Equipe treinada no processo

---

**Status Final**: ⬜ Aguardando testes  
**Próximo passo**: Execute Teste 1 agora!

Boa sorte! 🚀
