export default function LgpdPage() {
    return (
        <>
            <h1 className="text-4xl font-serif font-black mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Padrão LGPD</h1>
            <p className="text-vasta-muted text-lg leading-relaxed">
                O Vasta está em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Seus Direitos</h2>
            <ul className="list-disc pl-6 space-y-4 text-slate-400">
                <li>Confirmação da existência de tratamento de seus dados.</li>
                <li>Acesso aos dados coletados.</li>
                <li>Correção de dados incompletos ou inexatos.</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
                <li>Portabilidade dos dados a outro fornecedor de serviço.</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Segurança</h2>
            <p className="text-slate-400">Implementamos medidas técnicas e organizativas apropriadas para proteger seus dados pessoais contra acessos não autorizados e situações acidentais ou ilícitas.</p>
        </>
    )
}
