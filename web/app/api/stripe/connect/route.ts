
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get current profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id')
      .eq('id', user.id)
      .single()
    
    if (profileError) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    let accountId = profile.stripe_account_id

    // If no account, create one
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'standard',
        email: user.email,
        business_profile: {
            name: user.user_metadata?.full_name,
        }
      })
      accountId = account.id

      // Save to profile
      await supabase
        .from('profiles')
        .update({ stripe_account_id: accountId })
        .eq('id', user.id)
    }

    // Create Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/minha-loja`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/minha-loja?stripe_connected=true`,
      type: 'account_onboarding',
    })

    return NextResponse.json({ url: accountLink.url })

  } catch (error: any) {
    console.error("Stripe Connect Error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
