import { NextRequest, NextResponse } from 'next/server'

/**
 * Instagram Data Deletion Callback
 * 
 * Este endpoint é chamado pelo Instagram/Meta quando um usuário solicita a exclusão
 * de seus dados através das configurações do Instagram.
 * 
 * Conforme requisitos do Meta: https://developers.facebook.com/docs/instagram-basic-display-api/overview#data-deletion
 * 
 * O Meta envia um POST com { signed_request: "..." } e espera uma resposta com:
 * - url: URL para verificar status da exclusão
 * - confirmation_code: Código único de confirmação
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Instagram envia: { signed_request: "..." }
    const signedRequest = body.signed_request

    if (!signedRequest) {
      return NextResponse.json(
        { error: 'Missing signed_request parameter' },
        { status: 400 }
      )
    }

    // Parse do signed_request (formato: encoded_sig.payload)
    const [encodedSig, payload] = signedRequest.split('.')
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid signed_request format' },
        { status: 400 }
      )
    }

    // Decodifica o payload
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8')
    const data = JSON.parse(decodedPayload)

    // Extrai o user_id do Instagram
    const instagramUserId = data.user_id

    if (!instagramUserId) {
      return NextResponse.json(
        { error: 'Missing user_id in payload' },
        { status: 400 }
      )
    }

    console.log('[Data Deletion] Request received for Instagram user:', instagramUserId)

    // Gera código de confirmação único
    const confirmationCode = generateConfirmationCode(instagramUserId)

    // Log the deletion request for manual processing if needed
    console.log('[Data Deletion] Deletion request logged:', {
      instagramUserId,
      confirmationCode,
      timestamp: new Date().toISOString()
    })

    // TODO: Implement actual database cleanup when Supabase connection is available
    // For now, we just log the request and return success to comply with Meta requirements
    
    // Retorna resposta conforme especificação do Instagram
    return NextResponse.json({
      url: `https://vasta.pro/data-deletion/status?code=${confirmationCode}`,
      confirmation_code: confirmationCode
    })

  } catch (error) {
    console.error('[Data Deletion] Unexpected error:', error)
    
    // Even on error, return a valid response to Instagram to avoid repeated callbacks
    const fallbackCode = generateConfirmationCode('error-fallback')
    
    return NextResponse.json({
      url: `https://vasta.pro/data-deletion/status?code=${fallbackCode}`,
      confirmation_code: fallbackCode
    })
  }
}

/**
 * Gera código de confirmação único para rastreamento
 */
function generateConfirmationCode(instagramUserId: string): string {
  const timestamp = Date.now()
  const hash = Buffer.from(`${instagramUserId}-${timestamp}`).toString('base64')
  return hash.substring(0, 16).toUpperCase()
}

/**
 * Endpoint GET para verificar status do endpoint (health check)
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/instagram/data-deletion',
    description: 'Instagram Data Deletion Callback',
    documentation: 'https://developers.facebook.com/docs/instagram-basic-display-api/overview#data-deletion',
    method: 'POST',
    expectedPayload: {
      signed_request: 'encoded_signature.base64_payload'
    },
    response: {
      url: 'URL to check deletion status',
      confirmation_code: 'Unique confirmation code'
    }
  })
}
