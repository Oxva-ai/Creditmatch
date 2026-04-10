"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminMe, getLeads, updateLead, deleteLead, exportLeads } from "@/lib/api";
import type { Lead, LeadStatus } from "@/types";
import { Download, Trash2, Save, Filter } from "lucide-react";

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, pages: 1 });
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("cm_admin_token");
    if (!token) { router.push("/admin/login"); return; }
    adminMe().catch(() => { localStorage.removeItem("cm_admin_token"); router.push("/admin/login"); });
    fetchLeads();
  }, [router, statusFilter]);

  const fetchLeads = async (page = 1) => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: "20" };
      if (statusFilter !== "ALL") params.status = statusFilter;
      const data = await getLeads(params);
      setLeads(data.leads);
      setPagination(data.pagination);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStatusUpdate = async (id: string) => {
    try {
      await updateLead(id, { status: editStatus });
      setEditingId(null);
      fetchLeads(pagination.page);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead? This action cannot be undone (GDPR erasure).")) return;
    try {
      await deleteLead(id);
      fetchLeads(pagination.page);
    } catch (err) { console.error(err); }
  };

  const handleExport = async (markSold = false) => {
    setExportLoading(true);
    try {
      const data = await exportLeads(statusFilter === "ALL" ? undefined : statusFilter, markSold);
      const blob = new Blob([JSON.stringify(data.leads, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `creditmatch-leads-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      if (markSold) fetchLeads(pagination.page);
    } catch (err) { console.error(err); }
    finally { setExportLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-bold text-gray-900">CreditMatch Admin — Leads</h1>
          <a href="/admin/dashboard" className="text-sm text-brand-600 hover:underline">← Dashboard</a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New</option>
              <option value="SOLD">Sold</option>
              <option value="CONTACTED">Contacted</option>
              <option value="CONVERTED">Converted</option>
              <option value="DISMISSED">Dismissed</option>
            </select>
          </div>
          <button onClick={() => handleExport(false)} className="btn-secondary btn-sm" disabled={exportLoading}>
            <Download className="mr-1 h-3.5 w-3.5" /> Export {statusFilter}
          </button>
          <button onClick={() => handleExport(true)} className="btn-primary btn-sm" disabled={exportLoading}>
            <Download className="mr-1 h-3.5 w-3.5" /> Export & Mark Sold
          </button>
          <span className="text-sm text-gray-500">{pagination.total || 0} total leads</span>
        </div>

        {/* Table */}
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="card py-12 text-center text-gray-500">No leads found.</div>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Income</th>
                  <th className="px-4 py-3 font-medium">Credit</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{lead.name || "—"}</td>
                    <td className="px-4 py-3 text-brand-600">{lead.email}</td>
                    <td className="px-4 py-3">{lead.phone || "—"}</td>
                    <td className="px-4 py-3">£{lead.annualIncome?.toLocaleString()}</td>
                    <td className="px-4 py-3">{lead.creditHistory}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${lead.score >= 60 ? "bg-green-100 text-green-700" : lead.score >= 30 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {lead.score}%
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {editingId === lead.id ? (
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded border border-gray-300 px-2 py-1 text-xs"
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value)}
                          >
                            {["NEW", "SOLD", "CONTACTED", "CONVERTED", "DISMISSED"].map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <button onClick={() => handleStatusUpdate(lead.id)} className="text-brand-600 hover:text-brand-800">
                            <Save className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditingId(lead.id); setEditStatus(lead.status); }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {lead.status}
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-600" title="Delete (GDPR erasure)">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => fetchLeads(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="btn-secondary btn-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">Page {pagination.page} of {pagination.pages}</span>
            <button
              onClick={() => fetchLeads(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="btn-secondary btn-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
