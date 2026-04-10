"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminMe, getAdminProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api";
import type { Product, ProductCategory } from "@/types";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";

const CATEGORIES: ProductCategory[] = [
  "BALANCE_TRANSFER", "CREDIT_BUILDER", "CASHBACK", "REWARDS",
  "PURCHASE_0PC", "TRAVEL", "LOW_APR",
];

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("cm_admin_token");
    if (!token) { router.push("/admin/login"); return; }
    adminMe().catch(() => { localStorage.removeItem("cm_admin_token"); router.push("/admin/login"); });
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAdminProducts();
      setProducts(data.products);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openNew = () => {
    setEditing(null);
    setForm({
      name: "", description: "", shortDescription: "", apr: 22.9,
      creditLimitMin: 200, creditLimitMax: 5000, representativeExample: "",
      minIncome: 12000, minCreditScore: "POOR", requiresEmployment: false,
      excludedEmployment: [], affiliateLink: "", brokerPayout: 20,
      category: "CASHBACK", features: [], pros: [], cons: [],
      isFeatured: false, logoUrl: "",
    });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ ...p });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await updateProduct(editing.id, form);
      } else {
        await createProduct(form);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deactivate this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-bold text-gray-900">CreditMatch Admin — Products</h1>
          <a href="/admin/dashboard" className="text-sm text-brand-600 hover:underline">← Dashboard</a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">{products.length} products</p>
          <button onClick={openNew} className="btn-primary btn-sm">
            <Plus className="mr-1 h-3.5 w-3.5" /> Add Product
          </button>
        </div>

        {showForm && (
          <div className="mb-8 card">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editing ? "Edit Product" : "New Product"}</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Name *</label>
                <input className="input" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="input" value={form.category || "CASHBACK"} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">APR (%)</label>
                <input type="number" step="0.1" className="input" value={form.apr || ""} onChange={(e) => setForm({ ...form, apr: parseFloat(e.target.value) })} />
              </div>
              <div>
                <label className="label">Min Income (£)</label>
                <input type="number" className="input" value={form.minIncome || ""} onChange={(e) => setForm({ ...form, minIncome: parseInt(e.target.value) })} />
              </div>
              <div>
                <label className="label">Min Credit Score</label>
                <select className="input" value={form.minCreditScore || "POOR"} onChange={(e) => setForm({ ...form, minCreditScore: e.target.value })}>
                  {["POOR", "FAIR", "GOOD", "EXCELLENT"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Broker Payout (£)</label>
                <input type="number" step="0.01" className="input" value={form.brokerPayout || ""} onChange={(e) => setForm({ ...form, brokerPayout: parseFloat(e.target.value) })} />
              </div>
              <div>
                <label className="label">Affiliate Link</label>
                <input className="input" value={form.affiliateLink || ""} onChange={(e) => setForm({ ...form, affiliateLink: e.target.value })} />
              </div>
              <div>
                <label className="label">Logo URL</label>
                <input className="input" value={form.logoUrl || ""} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Short Description</label>
                <input className="input" value={form.shortDescription || ""} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Full Description</label>
                <textarea className="input" rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Representative Example</label>
                <input className="input" value={form.representativeExample || ""} onChange={(e) => setForm({ ...form, representativeExample: e.target.value })} />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.requiresEmployment || false} onChange={(e) => setForm({ ...form, requiresEmployment: e.target.checked })} />
                  Requires Employment
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isFeatured || false} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                  Featured
                </label>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleSave} className="btn-primary btn-sm"><Save className="mr-1 h-3.5 w-3.5" /> Save</button>
              <button onClick={() => setShowForm(false)} className="btn-secondary btn-sm">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="card flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category} · {p.apr}% APR · Min income: £{p.minIncome?.toLocaleString()} · Score min: {p.minCreditScore}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${p.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                  <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-gray-600"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
