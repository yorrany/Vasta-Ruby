import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Termos de Serviço | Vasta Pro',
    description: 'Termos de Serviço do Vasta Pro',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Termos de Serviço</h1>
                <p className="text-slate-600 mb-8">Última atualização: 23 de janeiro de 2026</p>

                <div className="prose prose-slate max-w-none space-y-6">

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Ao acessar e usar a plataforma <strong>Vasta Pro</strong> ("Vasta", "Plataforma", "Serviço"), operada pela
                            <strong> YORRANY MARTINS BRAGA LTDA</strong>, você concorda em ficar vinculado a estes Termos de Serviço
                            ("Termos"). Se você não concordar com todos os termos e condições, não utilize nossos serviços.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Descrição do Serviço</h2>
                        <p className="text-slate-700 leading-relaxed">
                            O Vasta Pro é uma plataforma SaaS (Software as a Service) que permite a criadores de conteúdo, influenciadores,
                            profissionais e empresas criarem landing pages personalizadas ("bio links") para centralizar seus links, perfis
                            sociais e conteúdo em uma única página otimizada e responsiva.
                        </p>
                        <p className="text-slate-700 leading-relaxed mt-4">
                            O serviço inclui, mas não se limita a:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Criação e personalização de landing pages</li>
                            <li>Integração com redes sociais (Instagram, Facebook, etc.)</li>
                            <li>Gerenciamento de links e conteúdo</li>
                            <li>Análises e estatísticas de acesso</li>
                            <li>Planos gratuitos e pagos com recursos diferenciados</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Elegibilidade</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Você deve ter pelo menos 18 anos de idade para usar o Vasta Pro. Ao criar uma conta, você declara e garante que:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Possui capacidade legal para celebrar este contrato</li>
                            <li>Todas as informações fornecidas são verdadeiras, completas e atualizadas</li>
                            <li>Cumprirá todos os termos e condições aqui estabelecidos</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Conta de Usuário</h2>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.1 Criação de Conta</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Para usar o Vasta Pro, você deve criar uma conta fornecendo informações precisas e completas. Você é responsável
                            por manter a confidencialidade da sua senha e por todas as atividades realizadas em sua conta.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.2 Segurança da Conta</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Você concorda em:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
                            <li>Não compartilhar suas credenciais com terceiros</li>
                            <li>Sair da sua conta ao final de cada sessão</li>
                            <li>Usar senha forte e única</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.3 Suspensão e Encerramento</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Reservamo-nos o direito de suspender ou encerrar sua conta se você violar estes Termos, sem aviso prévio
                            e sem responsabilidade.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Uso Aceitável</h2>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.1 Conteúdo Permitido</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Você pode usar o Vasta Pro para compartilhar conteúdo legal e ético. É proibido usar a plataforma para:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Conteúdo ilegal, difamatório, obsceno, pornográfico ou ofensivo</li>
                            <li>Violação de direitos autorais, marcas registradas ou propriedade intelectual</li>
                            <li>Phishing, malware, vírus ou qualquer atividade maliciosa</li>
                            <li>Spam, fraudes, esquemas de pirâmide ou marketing enganoso</li>
                            <li>Discurso de ódio, discriminação, assédio ou intimidação</li>
                            <li>Venda de produtos ilegais ou regulamentados (armas, drogas, etc.)</li>
                            <li>Qualquer atividade que viole leis locais, nacionais ou internacionais</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.2 Consequências de Uso Indevido</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Violações das políticas de uso aceitável resultarão em:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Remoção imediata do conteúdo ofensivo</li>
                            <li>Suspensão temporária ou permanente da conta</li>
                            <li>Denúncia às autoridades competentes (se aplicável)</li>
                            <li>Ação legal para recuperação de danos</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Propriedade Intelectual</h2>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">6.1 Conteúdo do Usuário</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Você mantém todos os direitos sobre o conteúdo que publica no Vasta Pro. Ao publicar conteúdo, você nos concede
                            uma licença mundial, não exclusiva, livre de royalties para hospedar, armazenar, exibir e distribuir seu conteúdo
                            conforme necessário para fornecer o serviço.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">6.2 Propriedade do Vasta Pro</h3>
                        <p className="text-slate-700 leading-relaxed">
                            O Vasta Pro, incluindo design, código, logotipos, marcas e todos os elementos da plataforma, são propriedade
                            exclusiva da YORRANY MARTINS BRAGA LTDA e estão protegidos por leis de propriedade intelectual.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Planos e Pagamentos</h2>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7.1 Planos Oferecidos</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Oferecemos planos gratuitos e pagos. As especificações de cada plano estão disponíveis em nossa página de preços.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7.2 Cobrança e Renovação</h3>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li>Assinaturas são cobradas automaticamente no ciclo escolhido (mensal/anual)</li>
                            <li>Renovação automática, salvo cancelamento antecipado</li>
                            <li>Preços podem variar - alterações serão comunicadas com 30 dias de antecedência</li>
                            <li>Processamento via Stripe e/ou AbacatePay</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7.3 Reembolsos</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Oferecemos reembolso de 7 dias para novas assinaturas. Após esse período, não há reembolso proporcional.
                            Cancelamentos podem ser feitos a qualquer momento, mas o acesso aos recursos pagos termina ao final do período
                            de faturamento atual.
                        </p>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7.4 Upgrades e Downgrades</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do dashboard. Ajustes de cobrança
                            serão proporcionais ao tempo restante no ciclo atual.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Integrações de Terceiros</h2>
                        <p className="text-slate-700 leading-relaxed">
                            O Vasta Pro se integra com serviços de terceiros (Instagram, Facebook, etc.). Ao conectar essas contas:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Você autoriza o compartilhamento de dados conforme nossa Política de Privacidade</li>
                            <li>Você está sujeito aos termos dos serviços de terceiros</li>
                            <li>Não somos responsáveis por problemas originados de serviços de terceiros</li>
                            <li>Você pode revogar integrações a qualquer momento</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Disponibilidade do Serviço</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Nos esforçamos para manter o Vasta Pro disponível 24/7, mas não garantimos disponibilidade ininterrupta.
                            Podemos realizar manutenções programadas (com aviso prévio) ou emergenciais. Não nos responsabilizamos por:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Interrupções causadas por terceiros (provedores de hospedagem, serviços externos)</li>
                            <li>Caso fortuito ou força maior</li>
                            <li>Ataques cibernéticos ou problemas de segurança</li>
                            <li>Falhas de internet ou dispositivos do usuário</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Limitação de Responsabilidade</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Na extensão máxima permitida por lei:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>O Vasta Pro é fornecido "como está" (as is) sem garantias de qualquer tipo</li>
                            <li>Não garantimos que o serviço será livre de erros ou ininterrupto</li>
                            <li>Não nos responsabilizamos por perdas indiretas, incidentais ou consequenciais</li>
                            <li>Nossa responsabilidade total não excederá o valor pago nos últimos 12 meses</li>
                            <li>Não somos responsáveis por conteúdo de usuários ou ações de terceiros</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">11. Indenização</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Você concorda em indenizar, defender e isentar a YORRANY MARTINS BRAGA LTDA, seus funcionários, parceiros
                            e afiliados de quaisquer reclamações, danos, perdas ou despesas (incluindo honorários advocatícios) resultantes de:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Violação destes Termos</li>
                            <li>Violação de direitos de terceiros</li>
                            <li>Conteúdo publicado por você</li>
                            <li>Uso indevido do serviço</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">12. Modificações dos Termos</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Reservamo-nos o direito de modificar estes Termos a qualquer momento. Notificaremos sobre alterações
                            significativas por email ou através de aviso na plataforma. O uso contínuo após as alterações constitui
                            aceitação dos novos termos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">13. Rescisão</h2>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">13.1 Rescisão pelo Usuário</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Você pode encerrar sua conta a qualquer momento através das configurações ou entrando em contato conosco.
                            Após o encerramento:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Seus dados serão excluídos conforme nossa Política de Privacidade</li>
                            <li>Seu conteúdo será removido dos servidores</li>
                            <li>Assinaturas ativas não serão renovadas</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">13.2 Rescisão pelo Vasta Pro</h3>
                        <p className="text-slate-700 leading-relaxed">
                            Podemos encerrar ou suspender sua conta imediatamente se você:
                        </p>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4 mt-2">
                            <li>Violar estes Termos</li>
                            <li>Usar o serviço de forma fraudulenta ou ilegal</li>
                            <li>Não pagar valores devidos</li>
                            <li>Causar danos à plataforma ou outros usuários</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">14. Lei Aplicável e Jurisdição</h2>
                        <p className="text-slate-700 leading-relaxed">
                            Estes Termos são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão resolvidas
                            no foro da comarca de [INSERIR COMARCA], com exclusão de qualquer outro, por mais privilegiado que seja.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">15. Disposições Gerais</h2>
                        <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                            <li><strong>Integralidade:</strong> Estes Termos constituem o acordo integral entre as partes</li>
                            <li><strong>Divisibilidade:</strong> Se alguma disposição for inválida, as demais permanecem em vigor</li>
                            <li><strong>Renúncia:</strong> A falta de exercício de qualquer direito não constitui renúncia</li>
                            <li><strong>Cessão:</strong> Você não pode ceder seus direitos sem nosso consentimento prévio</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">16. Contato</h2>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Para dúvidas sobre estes Termos, entre em contato:
                        </p>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mt-4">
                            <p className="text-slate-700"><strong>YORRANY MARTINS BRAGA LTDA</strong></p>
                            <p className="text-slate-700 mt-2"><strong>Email:</strong> support@vasta.pro</p>
                            <p className="text-slate-700"><strong>Website:</strong> https://vasta.pro</p>
                        </div>
                    </section>

                    <section className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-900 font-semibold mb-2">
                            ✓ Ao usar o Vasta Pro, você confirma que leu, entendeu e concorda com estes Termos de Serviço
                        </p>
                        <p className="text-blue-800 text-sm">
                            Última atualização: 23 de janeiro de 2026
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
