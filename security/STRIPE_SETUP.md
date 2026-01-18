# Configuração do Stripe Webhook

Como o frontend Vasta (Next.js) é hospedado como um site estático no Cloudflare Pages, os webhooks do Stripe devem ser direcionados para a **API Backend (Rails)**.

## 1. Acesse o Stripe Dashboard

Vá para [Developers > Webhooks](https://dashboard.stripe.com/webhooks) e clique em **Add endpoint**.

## 2. Configure o Endpoint

- **URL do Endpoint**: `https://api.vasta.pro/webhooks/stripe`
  _(Substitua `api.vasta.pro` pelo domínio real onde sua API Rails está hospedada. Se estiver usando Railway, será algo como `https://vasta-backend.up.railway.app/webhooks/stripe`)_
- **Descrição**: "Vasta Production API"

## 3. Selecione os Eventos

O controlador `StripeWebhooksController` (`app/controllers/stripe_webhooks_controller.rb`) está configurado para ouvir estritamente estes eventos. Selecione apenas eles para evitar chamadas desnecessárias:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `invoice.payment_failed`

## 4. Obtenha o Signing Secret

1. Após criar o endpoint, abra os detalhes dele no Dashboard.
2. Em **Signing secret**, clique em **Reveal**.
3. Copie o valor que começa com `whsec_...`.

## 5. Configure no Servidor (Backend)

Adicione este segredo às variáveis de ambiente do seu **Backend Rails** (NÃO no frontend `wrangler.toml` nem `.env.local`).

**No Docker/Railway/Render:**

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 6. Testando Localmente (Opcional)

Para testar webhooks no seu ambiente de desenvolvimento (`localhost:3000`):

1. Instale o [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Login: `stripe login`
3. Encaminhe eventos:
   ```bash
   stripe listen --forward-to localhost:3000/webhooks/stripe
   ```
4. O CLI fornecerá um segredo temporário (`whsec_...`). Coloque esse segredo no seu `.env` local do Rails (não do frontend).
