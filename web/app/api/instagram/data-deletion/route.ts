import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * Instagram Data Deletion Callback
 * 
 * Este endpoint é chamado pelo Instagram quando um usuário solicita a exclusão
 * de seus dados através das configurações do Instagram.
 * 
 * Conforme requisitos do Meta: https://developers.facebook.com/docs/instagram-basic-display-api/overview#data-deletion
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

    // Conecta ao Supabase
    const supabase = await createClient()

    // Busca o usuário associado a este Instagram ID
    const { data: profileData, error: findError } = await supabase
      .from('profiles')
      .select('id, instagram_username')
      .eq('instagram_user_id', instagramUserId)
      .single()

    if (findError) {
      console.error('[Data Deletion] Error finding user:', findError)
      
      // Mesmo que não encontremos, retornamos sucesso para o Instagram
      // (o usuário pode já ter sido deletado)
      return NextResponse.json({
        url: `https://vasta.pro/data-deletion/status?code=${generateConfirmationCode(instagramUserId)}`,
        confirmation_code: generateConfirmationCode(instagramUserId)
      })
    }

    // Remove dados do Instagram do perfil do usuário
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        instagram_user_id: null,
        instagram_username: null,
        instagram_access_token: null,
        instagram_connected_at: null,
        updated_at: new Date().toISOString()
      })
      .eq('instagram_user_id', instagramUserId)

    if (updateError) {
      console.error('[Data Deletion] Error updating profile:', updateError)
      throw updateError
    }

    console.log('[Data Deletion] Successfully removed Instagram data for user:', profileData.instagram_username)

    // Gera código de confirmação único
    const confirmationCode = generateConfirmationCode(instagramUserId)

    // Retorna resposta conforme especificação do Instagram
    return NextResponse.json({
      url: `https://vasta.pro/data-deletion/status?code=${confirmationCode}`,
      confirmation_code: confirmationCode
    })

  } catch (error) {
    console.error('[Data Deletion] Unexpected error:', error)
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
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
 * Endpoint GET para verificar status de exclusão (opcional)
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'active',
    endpoint: '/api/instagram/data-deletion',
    description: 'Instagram Data Deletion Callback',
    documentation: 'https://developers.facebook.com/docs/instagram-basic-display-api/overview#data-deletion'
  })
}
