"use client"

import { useEffect, useState } from "react"
import { DollarSign, ShoppingBag, Users, TrendingUp, Search, Loader2 } from "lucide-react"
import { createClient } from "../../../lib/supabase"
import { useAuth } from "../../../lib/AuthContext"

type Order = {
  id: number
  product_id: number
  buyer_email: string
  amount: number
  status: string
  created_at: string
  products?: {
    title: string
  }
}

export default function VendasPage() {
  const { user } = useAuth()
  const supabase = createClient()
  
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
      totalRevenue: 0,
      totalSales: 0,
      avgTicket: 0,
      uniqueCustomers: 0
  })

  useEffect(() => {
    async function fetchOrders() {
        if (!user) return

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                products (
                    title
                )
            `)
            .eq('profile_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            console.error(error)
        }

        if (data) {
            const formattedOrders = data as any[]
            setOrders(formattedOrders)

            // Calculate Stats
            const revenue = formattedOrders.reduce((acc, order) => acc + (order.amount || 0), 0)
            const salesCount = formattedOrders.length
            const uniqueEmails = new Set(formattedOrders.map(o => o.buyer_email)).size
            
            setStats({
                totalRevenue: revenue,
                totalSales: salesCount,
                avgTicket: salesCount > 0 ? revenue / salesCount : 0,
                uniqueCustomers: uniqueEmails
            })
        }
        setLoading(false)
    }

    fetchOrders()
  }, [user])

  if (loading) {
     return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-vasta-primary" /></div>
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-vasta-text">Vendas</h1>
        <div className="rounded-full bg-vasta-surface px-4 py-2 text-xs font-bold text-emerald-400 border border-emerald-500/20 shadow-sm flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
           Stripe Conectado
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
            { label: 'Receita Total', value: `R$ ${stats.totalRevenue.toFixed(2).replace('.', ',')}`, icon: DollarSign, color: 'text-emerald-400' },
            { label: 'Vendas', value: stats.totalSales, icon: ShoppingBag, color: 'text-blue-400' },
            { label: 'Ticket Médio', value: `R$ ${stats.avgTicket.toFixed(2).replace('.', ',')}`, icon: TrendingUp, color: 'text-amber-400' },
            { label: 'Clientes', value: stats.uniqueCustomers, icon: Users, color: 'text-purple-400' },
        ].map((stat, i) => (
            <div key={i} className="rounded-[2rem] border border-vasta-border bg-vasta-surface p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className={`p-3 rounded-2xl bg-vasta-surface-soft w-fit mb-4 ${stat.color}`}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <p className="text-xs font-bold text-vasta-muted uppercase tracking-wider">{stat.label}</p>
                   <p className="text-2xl font-black text-vasta-text mt-1">{stat.value}</p>
                </div>
            </div>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-vasta-border bg-vasta-surface p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-8 px-2">
          <h3 className="text-lg font-bold text-vasta-text">Histórico de Transações</h3>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vasta-muted" size={14} />
             <input
                placeholder="Buscar pedido..."
                className="rounded-xl bg-vasta-surface-soft pl-9 pr-4 py-2 text-xs font-medium text-vasta-text placeholder:text-vasta-muted focus:outline-none focus:ring-1 focus:ring-vasta-primary border border-transparent focus:border-vasta-primary transition-all"
             />
          </div>
        </div>

        {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-vasta-surface-soft flex items-center justify-center mb-4 text-vasta-muted">
                    <ShoppingBag size={24} />
                </div>
                <p className="text-vasta-text font-bold">Nenhuma venda ainda.</p>
                <p className="text-sm text-vasta-muted mt-1">Divulgue seus produtos para começar a vender!</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="min-w-full text-left">
                <thead className="border-b border-vasta-border text-vasta-muted text-xs uppercase tracking-wider font-bold">
                <tr>
                    <th className="pb-4 pl-4">Produto</th>
                    <th className="pb-4">Cliente</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Valor</th>
                    <th className="pb-4 pr-4 text-right">Status</th>
                </tr>
                </thead>
                <tbody className="text-sm">
                {orders.map(order => (
                    <tr key={order.id} className="group border-b border-vasta-border/50 last:border-0 hover:bg-vasta-surface-soft/50 transition-colors">
                        <td className="py-4 pl-4 font-bold text-vasta-text">
                            {order.products?.title || 'Produto Removido'}
                        </td>
                        <td className="py-4 text-vasta-muted font-medium">
                            {order.buyer_email}
                        </td>
                        <td className="py-4 text-vasta-muted text-xs">
                            {new Date(order.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="py-4 text-vasta-text font-bold">
                            R$ {order.amount.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-4 pr-4 text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${
                                order.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                                order.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                                'bg-red-500/10 text-red-500'
                            }`}>
                                {order.status === 'paid' ? 'Aprovado' : order.status === 'pending' ? 'Pendente' : 'Cancelado'}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
      </section>
    </div>
  )
}


