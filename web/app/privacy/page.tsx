import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Política de Privacidade | Vasta Pro',
    description: 'Política de privacidade do Vasta Pro',
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Política de Privacidade</h1>
                <p className="text-slate-600 mb-8">Última atualização: 23 de janeiro de 2026</p>

                <div className="prose prose-slate max-w-none space-y-6">

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introdução</h2>
                        <p className="text-slate-700 leading-relaxed">
                            A <strong>YORRANY MARTINS BRAGA LTDA</strong>, CNPJ sob o nº [INSERIR CNPJ], proprietária e operadora da plataforma
                            <strong> Vasta Pro</strong> ("Vasta", "nós", "nosso"), está comprometida em proteger a privacidade e os dados
                            pessoais de seus usuários ("você", "usuário").
                        </p>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais
                            de acordo com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e outras regulamentações aplicáveis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Dados Coletados</h2>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.1 Dados Fornecidos Diretamente por Você</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Informações de Cadastro:</strong> Nome, email, senha (criptografada), nome de usuário</li>
                            <li><strong>Informações de Perfil:</strong> Foto de perfil, biografia, links, informações profissionais</li>
                            <li><strong>Informações de Pagamento:</strong> Processadas por terceiros (Stripe/AbacatePay) - não armazenamos dados de cartão</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.2 Dados Coletados via Integrações de Terceiros</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Login Social (Facebook):</strong> Email, nome, foto de perfil (com seu consentimento)</li>
                            <li><strong>Instagram Business:</strong> Nome de usuário, foto de perfil, nome da conta, ID da conta</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.3 Dados Coletados Automaticamente</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de sessão</li>
                            <li><strong>Cookies:</strong> Utilizados para autenticação e preferências (veja seção 7)</li>
                            <li><strong>Dados de Dispositivo:</strong> Sistema operacional, resolução de tela, idioma</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Finalidade do Tratamento de Dados</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">Utilizamos seus dados pessoais para:</p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Criar e gerenciar sua conta na plataforma Vasta Pro</li>
                            <li>Fornecer e personalizar os serviços contratados</li>
                            <li>Processar pagamentos e gerenciar assinaturas</li>
                            <li>Exibir conteúdo do Instagram em sua landing page (quando autorizado)</li>
                            <li>Enviar notificações relacionadas ao serviço (atualizações, confirmações)</li>
                            <li>Melhorar nossos produtos e serviços através de análises agregadas</li>
                            <li>Cumprir obrigações legais e regulatórias</li>
                            <li>Prevenir fraudes e garantir a segurança da plataforma</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Base Legal para o Tratamento</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">O tratamento de seus dados pessoais está fundamentado em:</p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Consentimento:</strong> Para integrações com redes sociais (Instagram, Facebook)</li>
                            <li><strong>Execução de Contrato:</strong> Para fornecer os serviços do Vasta Pro</li>
                            <li><strong>Legítimo Interesse:</strong> Para melhorias do serviço, segurança e prevenção de fraudes</li>
                            <li><strong>Obrigação Legal:</strong> Para cumprimento de obrigações fiscais e regulatórias</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Compartilhamento de Dados</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">Seus dados podem ser compartilhados com:</p>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.1 Prestadores de Serviços (Processadores de Dados)</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Supabase:</strong> Banco de dados e autenticação</li>
                            <li><strong>Vercel:</strong> Hospedagem da aplicação web</li>
                            <li><strong>Stripe/AbacatePay:</strong> Processamento de pagamentos</li>
                            <li><strong>Cloudflare:</strong> Segurança e CDN</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.2 Plataformas de Terceiros (com seu consentimento)</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Meta (Facebook/Instagram):</strong> Para autenticação e integração de conteúdo</li>
                        </ul>

                        <p className="text-slate-700 leading-relaxed mt-4">
                            <strong>Importante:</strong> Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros
                            para fins de marketing sem seu consentimento explícito.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Integração com Instagram</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Quando você conecta sua conta Instagram Business ao Vasta Pro, coletamos e exibimos:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Nome de usuário (@username)</li>
                            <li>Foto de perfil</li>
                            <li>Nome da conta</li>
                            <li>ID da conta (para identificação técnica)</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            <strong>Permissions used:</strong> <code className="bg-slate-100 px-2 py-1 rounded text-sm">instagram_business_basic</code>
                        </p>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Esses dados são exibidos publicamente em sua landing page do Vasta Pro para que visitantes possam
                            visualizar seu perfil profissional do Instagram de forma integrada.
                        </p>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            <strong>Você pode desconectar sua conta Instagram a qualquer momento</strong> através das configurações
                            do seu dashboard, e todos os dados relacionados serão removidos de nossa plataforma.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Cookies e Tecnologias Similares</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Utilizamos cookies essenciais e funcionais para:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Manter você autenticado na plataforma</li>
                            <li>Lembrar suas preferências e configurações</li>
                            <li>Analisar o desempenho e uso da plataforma</li>
                            <li>Melhorar a segurança</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Você pode gerenciar cookies através das configurações do seu navegador, mas isso pode afetar
                            a funcionalidade da plataforma.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Segurança dos Dados</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Implementamos medidas técnicas e organizacionais para proteger seus dados:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Criptografia:</strong> Dados sensíveis são criptografados em trânsito (HTTPS/TLS) e em repouso</li>
                            <li><strong>Controle de Acesso:</strong> Acesso restrito apenas a pessoal autorizado</li>
                            <li><strong>Monitoramento:</strong> Logs de segurança e detecção de atividades suspeitas</li>
                            <li><strong>Backups:</strong> Backups regulares para prevenir perda de dados</li>
                            <li><strong>Auditorias:</strong> Revisões periódicas de segurança</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Retenção de Dados</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Mantemos seus dados pessoais pelo tempo necessário para:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Fornecer os serviços contratados (durante a vigência da sua conta)</li>
                            <li>Cumprir obrigações legais (prazo estabelecido pela legislação)</li>
                            <li>Resolver disputas e fazer cumprir nossos acordos</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Quando você solicita a exclusão da sua conta, seus dados são removidos permanentemente em até 30 dias,
                            exceto aqueles que devemos manter por obrigação legal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Seus Direitos (LGPD)</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            De acordo com a LGPD, você tem direito a:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
                            <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                            <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> Solicitar anonimização, bloqueio ou exclusão de dados</li>
                            <li><strong>Portabilidade:</strong> Solicitar portabilidade dos dados a outro fornecedor</li>
                            <li><strong>Eliminação:</strong> Solicitar eliminação de dados tratados com seu consentimento</li>
                            <li><strong>Informação sobre Compartilhamento:</strong> Saber com quem compartilhamos seus dados</li>
                            <li><strong>Revogação do Consentimento:</strong> Revogar consentimento a qualquer momento</li>
                            <li><strong>Revisão de Decisões Automatizadas:</strong> Solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado</li>
                        </ul>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Para exercer seus direitos, entre em contato conosco através de: <strong>privacy@vasta.pro</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Transferência Internacional de Dados</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Alguns de nossos prestadores de serviços (Supabase, Vercel, Meta) podem estar localizados fora do Brasil.
                            Garantimos que essas transferências são realizadas com base em:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-4">
                            <li>Cláusulas contratuais padrão aprovadas</li>
                            <li>Certificações de adequação (Privacy Shield, etc.)</li>
                            <li>Compromissos de conformidade com LGPD/GDPR</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Menores de Idade</h2>
                        <p className="text-slate-700 leading-relaxed">
                            O Vasta Pro não se destina a menores de 18 anos. Não coletamos intencionalmente dados de menores.
                            Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluí-los imediatamente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Alterações nesta Política</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças
                            significativas por email ou através de um aviso em nossa plataforma. A data da "Última atualização"
                            no topo desta página indica quando a política foi revisada pela última vez.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Contato e Encarregado de Dados (DPO)</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Para questões sobre privacidade, exercício de direitos ou reclamações:
                        </p>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-4">
                            <p className="text-slate-700"><strong>YORRANY MARTINS BRAGA LTDA</strong></p>
                            <p className="text-slate-700 mt-2"><strong>Email:</strong> privacy@vasta.pro</p>
                            <p className="text-slate-700"><strong>Encarregado de Dados (DPO):</strong> privacy@vasta.pro</p>
                            <p className="text-slate-700"><strong>Website:</strong> https://vasta.pro</p>
                        </div>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            Você também pode registrar uma reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD) em:
                            <a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> www.gov.br/anpd</a>
                        </p>
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
