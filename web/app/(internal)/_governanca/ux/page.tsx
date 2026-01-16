import { getScanResults } from '@/app/actions/governance'
import { AlertCircle, CheckCircle, ShieldAlert, XCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function GovernancePage() {
  const data = await getScanResults()

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-mono"> {/* @vasta-ux-exception: Internal Governance Theme */}
        <div className="text-center space-y-4">
            <h1 className="text-xl text-red-500">Scanner Failed</h1>
            <p className="text-neutral-500">Could not retrieve governance data.</p>
        </div>
      </div>
    )
  }

  const { manifestoVersion, summary, violations, timestamp } = data

  const groupedViolations = violations.reduce((acc: any, v: any) => {
    const key = v.message
    if (!acc[key]) acc[key] = { ...v, count: 0, instances: [] }
    acc[key].count++
    acc[key].instances.push(v)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-red-900 selection:text-white pb-20"> {/* @vasta-ux-exception: Internal Governance Theme */}
      {/* Header */}
      <header className="border-b border-neutral-800 bg-[#0A0A0A] sticky top-0 z-10 backdrop-blur-md bg-opacity-80"> {/* @vasta-ux-exception: Internal Governance Theme */}
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-serif text-xl tracking-tight text-white">Vasta UX Guard</h1>
            <span className="px-2 py-0.5 text-xs font-mono bg-neutral-900 border border-neutral-700 rounded text-neutral-400">
              {manifestoVersion}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-mono">
             <div className="flex items-center gap-2 text-red-400">
                <ShieldAlert size={16} />
                <span>{summary.critical} Critical</span>
             </div>
             <div className="flex items-center gap-2 text-yellow-500">
                <AlertCircle size={16} />
                <span>{summary.warning} Warnings</span>
             </div>
             <div className="flex items-center gap-2 text-neutral-500">
                <CheckCircle size={16} />
                <span>{summary.exceptions} Exceptions</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Violations */}
        <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Detected Violations</h2>
            <div className="space-y-3">
                {Object.values(groupedViolations).map((group: any) => (
                    <div key={group.message} className="group p-4 bg-[#0A0A0A] border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer rounded-sm"> {/* @vasta-ux-exception: Internal Governance Theme */}
                        <div className="flex justify-between items-start mb-2">
                             <span className={`text-[10px] font-mono px-1.5 py-0.5 border rounded uppercase ${group.severity === 'CRITICAL' ? 'border-red-900 text-red-500 bg-red-950/20' : 'border-yellow-900 text-yellow-500 bg-yellow-950/20'}`}>
                                {group.severity}
                             </span>
                             <span className="text-xs font-mono text-neutral-600">x{group.count}</span>
                        </div>
                        <h3 className="text-sm font-medium text-neutral-300 leading-snug group-hover:text-white transition-colors">{group.message}</h3>
                        <p className="mt-2 text-xs text-neutral-500 truncate">{group.principle}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Right Column: Detail Panel (Example View of First Violation) */}
        <div className="lg:col-span-8 space-y-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">Inspection Panel</h2>
            
            {violations.length === 0 ? (
                 <div className="p-12 border border-neutral-800 bg-[#0A0A0A] text-center rounded-sm"> {/* @vasta-ux-exception: Internal Governance Theme */}
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg text-white font-medium">System Secure</h3>
                    <p className="text-neutral-500 mt-2">No violations detected against current Manifesto.</p>
                 </div>
            ) : (
                <div className="space-y-6">
                    {violations.slice(0, 10).map((violation: any, idx: number) => (
                        <div key={idx} className="border border-neutral-800 bg-[#0A0A0A] rounded-sm overflow-hidden"> {/* @vasta-ux-exception: Internal Governance Theme */}
                            <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/30">
                                <div className="font-mono text-xs text-neutral-400">
                                    {violation.file}:{violation.line}
                                </div>
                                <div className="flex gap-2">
                                     <button className="px-3 py-1 text-xs border border-neutral-700 text-neutral-300 bg-neutral-800 hover:bg-neutral-700 transition">Inspect</button>
                                     <button className="px-3 py-1 text-xs bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40 transition">Fix</button>
                                </div>
                            </div>
                            <div className="p-6 grid gap-6">
                                <div>
                                    <h4 className="text-xs uppercase text-neutral-500 font-mono mb-2">Offending Code</h4>
                                    <div className="bg-[#050505] p-3 border border-neutral-800 font-mono text-sm text-red-300 overflow-x-auto"> {/* @vasta-ux-exception: Internal Governance Theme */}
                                        {violation.match}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-xs uppercase text-neutral-500 font-mono mb-1">Principle Violated</h4>
                                        <p className="text-sm text-neutral-300">{violation.principle}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs uppercase text-neutral-500 font-mono mb-1">Correction Strategy</h4>
                                        <p className="text-sm text-neutral-300">{violation.suggestion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {violations.length > 10 && (
                        <div className="text-center py-4 text-xs font-mono text-neutral-600">
                            + {violations.length - 10} more violations hidden
                        </div>
                    )}
                </div>
            )}
        </div>
      </main>
    </div>
  )
}
