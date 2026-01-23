import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Como Usamos Dados do Instagram | Vasta Pro',
    description: 'Explicação transparente sobre como o Vasta Pro utiliza dados do Instagram',
}

export default function InstagramDataPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    Como Usamos Dados do Instagram
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                    Transparência total sobre nossa integração com o Instagram
                </p>

                <div className="space-y-8">

                    {/* Introdução */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Por Que Conectamos ao Instagram?
                        </h2>
                        <p className="text-slate-700 leading-relaxed">
                            O Vasta Pro permite que criadores de conteúdo, influenciadores e profissionais exibam automaticamente
                            informações do seu perfil Instagram Business em suas landing pages personalizadas. Isso aumenta a
                            autenticidade e credibilidade da sua página profissional.
                        </p>
                    </section>

                    {/* O que coletamos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Quais Dados Coletamos?
                        </h2>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <p className="text-blue-900 font-semibold mb-4">
                                Utilizamos apenas a permissão <code className="bg-blue-100 px-2 py-1 rounded text-sm font-mono">instagram_business_basic</code>
                            </p>
                            <p className="text-blue-800 mb-4">Esta permissão nos permite acessar:</p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <strong className="text-blue-900">Nome de usuário</strong>
                                        <p className="text-blue-700 text-sm">Exemplo: @seuusuario</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <strong className="text-blue-900">Foto de perfil</strong>
                                        <p className="text-blue-700 text-sm">URL pública da sua foto do Instagram</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <strong className="text-blue-900">Nome da conta</strong>
                                        <p className="text-blue-700 text-sm">Nome de exibição do seu perfil Business</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <strong className="text-blue-900">ID da conta</strong>
                                        <p className="text-blue-700 text-sm">Identificador único técnico (não visível publicamente)</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* O que NÃO coletamos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            O Que NÃO Coletamos
                        </h2>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <p className="text-red-900 font-semibold mb-4">🔒 Garantimos que NÃO acessamos:</p>
                            <ul className="space-y-2 text-red-800">
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Suas mensagens diretas (DMs)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Lista de seguidores ou seguindo</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Comentários ou interações privadas</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Stories ou Reels</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Posts ou fotos do feed</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Estatísticas ou insights da conta</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✗</span>
                                    <span>Localização ou dados pessoais sensíveis</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Como usamos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Como Usamos Esses Dados?
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">✓ Exibição na Sua Landing Page</h3>
                                <p className="text-green-800">
                                    Os dados são exibidos publicamente na sua página do Vasta Pro (exemplo: vasta.pro/seuusuario)
                                    para que visitantes possam ver seu perfil profissional do Instagram integrado.
                                </p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">✓ Autenticação e Cache</h3>
                                <p className="text-green-800">
                                    Armazenamos temporariamente as informações para melhorar a performance da sua página.
                                    Atualizamos os dados periodicamente quando você acessa o dashboard.
                                </p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 mb-2">✓ Nada Mais</h3>
                                <p className="text-green-800">
                                    Não usamos seus dados do Instagram para publicidade, marketing, análise de comportamento,
                                    revenda ou qualquer outra finalidade além da exibição na sua landing page.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Armazenamento */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Onde e Por Quanto Tempo Armazenamos?
                        </h2>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">📍 Localização</h3>
                                    <p className="text-slate-700">
                                        Os dados são armazenados de forma criptografada em nossos servidores (Supabase - EUA)
                                        com conformidade LGPD/GDPR.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">⏰ Duração</h3>
                                    <p className="text-slate-700">
                                        Mantemos os dados enquanto sua conta Instagram estiver conectada ao Vasta Pro.
                                        Quando você desconecta, os dados são removidos em até 48 horas.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-2">🔐 Segurança</h3>
                                    <p className="text-slate-700">
                                        • Criptografia SSL/TLS em trânsito<br />
                                        • Criptografia em repouso no banco de dados<br />
                                        • Tokens de acesso armazenados com hash seguro<br />
                                        • Acesso restrito apenas a sistemas autorizados
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Como conectar */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Como Funciona a Conexão?
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Você Autoriza</h3>
                                    <p className="text-slate-700 text-sm">
                                        No dashboard do Vasta Pro, você clica em "Conectar Instagram" e é redirecionado para o Instagram.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Instagram Confirma</h3>
                                    <p className="text-slate-700 text-sm">
                                        O Instagram mostra exatamente quais permissões estamos solicitando. Você pode aceitar ou recusar.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Dados São Sincronizados</h3>
                                    <p className="text-slate-700 text-sm">
                                        Após autorização, coletamos apenas as informações básicas mencionadas acima.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Exibição Pública</h3>
                                    <p className="text-slate-700 text-sm">
                                        Seu perfil do Instagram aparece integrado na sua landing page do Vasta Pro.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Como desconectar */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Como Desconectar o Instagram?
                        </h2>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                            <p className="text-purple-900 font-semibold mb-4">Você tem controle total. Pode desconectar a qualquer momento:</p>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-2">Opção 1: Pelo Vasta Pro</h3>
                                    <ol className="list-decimal list-inside text-purple-800 space-y-1 ml-4">
                                        <li>Faça login no Vasta Pro</li>
                                        <li>Vá em Configurações → Instagram</li>
                                        <li>Clique em "Desconectar Instagram"</li>
                                    </ol>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-purple-900 mb-2">Opção 2: Pelo Instagram</h3>
                                    <ol className="list-decimal list-inside text-purple-800 space-y-1 ml-4">
                                        <li>Abra o app do Instagram</li>
                                        <li>Configurações → Segurança → Apps e Sites</li>
                                        <li>Encontre "Vasta Pro" e remova</li>
                                    </ol>
                                </div>
                            </div>

                            <p className="text-purple-800 mt-4 text-sm">
                                ⚡ Após desconectar, seus dados do Instagram serão removidos do Vasta Pro em até 48 horas.
                            </p>
                        </div>
                    </section>

                    {/* Seus direitos */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Seus Direitos (LGPD)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold text-slate-900 mb-2">🔍 Acessar</h3>
                                <p className="text-slate-700 text-sm">
                                    Solicitar uma cópia de todos os dados do Instagram que armazenamos sobre você.
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold text-slate-900 mb-2">✏️ Corrigir</h3>
                                <p className="text-slate-700 text-sm">
                                    Atualizar informações incorretas (sincronizam automaticamente do Instagram).
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold text-slate-900 mb-2">🗑️ Excluir</h3>
                                <p className="text-slate-700 text-sm">
                                    Remover permanentemente todos os dados do Instagram armazenados.
                                </p>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h3 className="font-semibold text-slate-900 mb-2">🚫 Revogar</h3>
                                <p className="text-slate-700 text-sm">
                                    Revogar o consentimento e desconectar a qualquer momento.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contato */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            Dúvidas ou Preocupações?
                        </h2>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <p className="text-slate-700 mb-4">
                                Se você tiver dúvidas sobre como usamos dados do Instagram ou quiser exercer seus direitos:
                            </p>
                            <div className="space-y-2 text-slate-700">
                                <p><strong>Email de Privacidade:</strong> <a href="mailto:privacy@vasta.pro" className="text-blue-600 hover:underline">privacy@vasta.pro</a></p>
                                <p><strong>Suporte Geral:</strong> <a href="mailto:support@vasta.pro" className="text-blue-600 hover:underline">support@vasta.pro</a></p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-300">
                                <p className="text-sm text-slate-600">
                                    📄 Veja também: <Link href="/privacy" className="text-blue-600 hover:underline">Política de Privacidade Completa</Link>
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="mt-12 pt-8 border-t border-slate-200">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                Pronto para Conectar?
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Integre seu Instagram profissional à sua landing page do Vasta Pro
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/dashboard/settings"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                                >
                                    Conectar Instagram
                                </Link>
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-semibold"
                                >
                                    Voltar para Home
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>

                <div className="mt-12 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-600 text-center">
                        © 2026 YORRANY MARTINS BRAGA LTDA - Vasta Pro. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    )
}
