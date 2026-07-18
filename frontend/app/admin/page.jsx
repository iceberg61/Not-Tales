import { DollarSign, ShoppingBag, Package, Users } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import OrderStatusBadge from "@/components/OrderStatusBadge";
import { adminStats, orders } from "@/lib/mockData";
import { formatNaira } from "@/lib/currency";

const statCards = [
  { label: "Revenue", value: formatNaira(adminStats.revenue), icon: DollarSign },
  { label: "Orders", value: adminStats.ordersCount.toLocaleString(), icon: ShoppingBag },
  { label: "Products", value: adminStats.productsCount.toLocaleString(), icon: Package },
  { label: "Users", value: adminStats.usersCount.toLocaleString(), icon: Users },
];

export default function AdminDashboardPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:flex gap-10">
      <aside className="lg:w-56 shrink-0 mb-8 lg:mb-0">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-cream-2 rounded-2xl p-5">
              <span className="w-9 h-9 rounded-full bg-cream flex items-center justify-center mb-3">
                <Icon size={16} className="text-brown-dark" />
              </span>
              <p className="text-ink/50 text-xs">{label}</p>
              <p className="font-display text-xl sm:text-2xl font-bold mt-1">{value}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-lg font-semibold mb-4">Recent orders</h2>
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-ink/50 border-b border-ink/10">
                <th className="py-3 px-6 sm:px-0 font-medium">Order</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-ink/5">
                  <td className="py-3 px-6 sm:px-0 font-medium">{o.id}</td>
                  <td className="py-3 px-4 text-ink/60">{o.date}</td>
                  <td className="py-3 px-4"><OrderStatusBadge status={o.status} /></td>
                  <td className="py-3 px-4 text-right font-medium">{formatNaira(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}