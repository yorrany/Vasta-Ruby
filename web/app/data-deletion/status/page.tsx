import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Status de Exclusão de Dados | Vasta Pro',
    description: 'Verifique o status da exclusão dos seus dados',
}

export default function DataDeletionStatusPage({
    searchParams,
}: {
    searchParams: { code?: string }
}) {
    const confirmationCode = searchParams.code

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                        <svg
                            className="w-8 h-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 mb-4">
                        Solicitação de Exclusão de Dados Recebida
                    </h1>

                    <p className="text-lg text-slate-700 mb-8">
                        Sua solicitação de exclusão de dados do Instagram foi processada com sucesso.
                    </p>

                    {confirmationCode && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                            <p className="text-sm text-slate-600 mb-2">Código de Confirmação:</p>
                            <p className="text-2xl font-mono font-bold text-slate-900">
                                {confirmationCode}
                            </p>
                        </div>
                    )}

                    <div className="text-left bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-blue-900 mb-3">
                            O que foi excluído?
                        </h2>
                        <ul className="space-y-2 text-blue-800">
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Token de acesso do Instagram</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>ID da conta do Instagram</span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Conexão com o Instagram</span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-left bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-slate-900 mb-3">
                            O que não foi excluído?
                        </h2>
                        <p className="text-slate-700">
                            Sua conta do Vasta Pro permanece ativa. Se desejar excluir completamente
                            sua conta do Vasta Pro, você pode fazer isso através das configurações
                            da sua conta.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://vasta.pro"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                            Voltar para o Vasta Pro
                        </a>
                        <a
                            href="https://vasta.pro/privacy"
                            className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                        >
                            Política de Privacidade
                        </a>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-200">
                        <p className="text-sm text-slate-600">
                            Se você tiver dúvidas sobre a exclusão dos seus dados, entre em contato
                            conosco em{' '}
                            <a
                                href="mailto:privacy@vasta.pro"
                                className="text-blue-600 hover:underline"
                            >
                                privacy@vasta.pro
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
