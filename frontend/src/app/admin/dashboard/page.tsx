"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminMe, getStats } from "@/lib/api";
import type { DashboardStats } from "@/types";
import {
  Users, DollarSign, CreditCard, TrendingUp,
  LogOut, BarChart3, Clock, CheckCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cm_admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    adminMe().catch(() => {
      localStorage.removeItem("cm_admin_token");
      router.push("/admin/login");
    });

    getStats()
      .then((data) => {
        setStats(data.stats);
        setRecentLeads(data.recentLeads || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("cm_admin_token");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-lg font-bold text-gray-900">CreditMatch Admin</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Nav */}
        <nav className="mb-8 flex gap-4">
          <a href="/admin/dashboard" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white">Dashboard</a>
          <a href="/admin/leads" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Leads</a>
          <a href="/admin/products" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Products</a>
        </nav>

        {/* Stats Grid */}
        {stats && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Users} label="Total Leads" value={stats.totalLeads} color="bg-blue-500" />
            <StatCard icon={Clock} label="New Leads" value={stats.newLeads} color="bg-amber-500" />
            <StatCard icon={CheckCircle} label="Sold" value={stats.soldLeads} color="bg-green-500" />
            <StatCard icon={DollarSign} label="Est. Revenue" value={`£${stats.estimatedRevenue}`} color="bg-brand-500" />
          </div>
        )}

        {/* Secondary Stats */}
        {stats && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="card">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.todayLeads}</p>
                  <p className="text-xs text-gray-500">Today</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.weekLeads}</p>
                  <p className="text-xs text-gray-500">This Week</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                  <p className="text-xs text-gray-500">Active Products</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Leads */}
        <div className="card">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Leads</h2>
          {recentLeads.length === 0 ? (
            <p className="py-8 text-center text-gray-500">No leads yet. Share your quiz link to start capturing leads!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Score</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-100">
                      <td className="py-3">{lead.name || "—"}</td>
                      <td className="py-3 text-brand-600">{lead.email}</td>
                      <td className="py-3">
                        <span className={`badge ${lead.score >= 60 ? "bg-green-100 text-green-700" : lead.score >= 30 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                          {lead.score}%
                        </span>
                      </td>
                      <td className="py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="py-3 text-gray-500">{new Date(lead.createdAt).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    SOLD: "bg-green-100 text-green-700",
    CONTACTED: "bg-purple-100 text-purple-700",
    CONVERTED: "bg-emerald-100 text-emerald-700",
    DISMISSED: "bg-gray-100 text-gray-500",
  };
  return <span className={`badge ${colors[status] || "bg-gray-100 text-gray-500"}`}>{status}</span>;
}
