import { useState } from "react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Package, DollarSign, Users, TrendingUp, Plus } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const [tab, setTab] = useState<"overview" | "products" | "orders" | "customers">("overview");

  const stats = [
    { Icon: DollarSign, label: "Revenue (30d)", value: "$148,294", trend: "+24.3%" },
    { Icon: Package, label: "Orders (30d)", value: "1,847", trend: "+18.1%" },
    { Icon: Users, label: "New Customers", value: "1,204", trend: "+31.7%" },
    { Icon: TrendingUp, label: "Conversion", value: "4.8%", trend: "+0.6%" },
  ];

  const orders = [
    { id: "AUR8K2L9P", customer: "Sarah M.", total: 218, status: "Delivered" },
    { id: "AUR3F7M2Q", customer: "David K.", total: 89, status: "Shipped" },
    { id: "AUR9P4N1R", customer: "Maria L.", total: 249, status: "Processing" },
    { id: "AURX5K8T2", customer: "Mike R.", total: 189, status: "Delivered" },
    { id: "AUR2L9F3K", customer: "Amanda P.", total: 79, status: "Shipped" },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Admin</p>
            <h1 className="font-serif text-4xl">Dashboard</h1>
          </div>
          <Button onClick={() => toast.info("Connect Lovable Cloud to enable real product management")} className="bg-foreground text-background rounded-none">
            <Plus className="h-4 w-4 mr-2" /> New Product
          </Button>
        </div>

        <div className="flex gap-1 mb-8 border-b border-border overflow-x-auto">
          {(["overview", "products", "orders", "customers"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-xs uppercase tracking-widest border-b-2 -mb-px transition-elegant ${
                tab === t ? "border-foreground text-foreground" : "border-transparent text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(({ Icon, label, value, trend }) => (
                <div key={label} className="bg-secondary/40 p-6">
                  <Icon className="h-5 w-5 text-gold mb-3" strokeWidth={1.4} />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  <p className="font-serif text-3xl mt-1">{value}</p>
                  <p className="text-xs text-gold mt-1">{trend} vs last 30d</p>
                </div>
              ))}
            </div>
            <div className="bg-secondary/40 p-6">
              <h3 className="font-serif text-xl mb-4">Recent Orders</h3>
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground tracking-widest">
                  <tr className="text-left border-b border-border">
                    <th className="py-2">Order</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0">
                      <td className="py-3 font-mono text-xs">{o.id}</td>
                      <td>{o.customer}</td>
                      <td>${o.total}</td>
                      <td>
                        <span className={`text-xs px-2 py-1 ${
                          o.status === "Delivered" ? "bg-gold/15 text-gold" :
                          o.status === "Shipped" ? "bg-blue-500/15 text-blue-700" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "products" && (
          <div className="bg-secondary/40 p-6">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground tracking-widest">
                <tr className="text-left border-b border-border">
                  <th className="py-2">Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="py-3 flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 object-cover bg-background" />
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td>{p.category}</td>
                    <td>${p.price}</td>
                    <td>{p.reviews.toLocaleString()} ({p.rating}★)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(tab === "orders" || tab === "customers") && (
          <div className="bg-secondary/40 p-12 text-center text-muted-foreground">
            <p className="font-serif text-2xl mb-2">Connect Lovable Cloud</p>
            <p className="text-sm mb-4">Enable real-time {tab} management with our integrated backend.</p>
            <Button variant="outline" className="rounded-none">Enable Cloud</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
