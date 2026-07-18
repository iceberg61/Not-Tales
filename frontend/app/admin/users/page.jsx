import AdminSidebar from "@/components/AdminSidebar";
import { adminUsers } from "@/lib/mockData";

export default function AdminUsersPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 lg:flex gap-10">
      <aside className="lg:w-56 shrink-0 mb-8 lg:mb-0">
        <AdminSidebar />
      </aside>

      <div className="flex-1 min-w-0">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-8">Users</h1>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-ink/50 border-b border-ink/10">
                <th className="py-3 px-6 sm:px-0 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Joined</th>
                <th className="py-3 px-4 font-medium">Orders</th>
                <th className="py-3 px-4 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((u) => (
                <tr key={u.id} className="border-b border-ink/5">
                  <td className="py-3 px-6 sm:px-0 font-medium">{u.name}</td>
                  <td className="py-3 px-4 text-ink/60">{u.email}</td>
                  <td className="py-3 px-4 text-ink/60">{u.joined}</td>
                  <td className="py-3 px-4 text-ink/60">{u.orders}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-pill text-xs font-medium capitalize ${
                        u.role === "admin" ? "bg-brown-dark text-cream" : "bg-cream-2 text-ink/60"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}