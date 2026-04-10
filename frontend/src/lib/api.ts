const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function request<T>(endpoint: string, options: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: getHeaders(token),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Public API ─────────────────────────────────────────────────────

export async function submitQuiz(payload: any): Promise<any> {
  return request("/api/leads/submit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getProducts(params?: Record<string, string>): Promise<any> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return request(`/api/products${query}`);
}

// ── Admin API ──────────────────────────────────────────────────────

function getToken(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return localStorage.getItem("cm_admin_token") || undefined;
}

export async function adminLogin(email: string, password: string): Promise<any> {
  return request("/api/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function adminMe(): Promise<any> {
  return request("/api/admin/auth/me", {}, getToken());
}

export async function getLeads(params?: Record<string, string>): Promise<any> {
  const query = params ? `?${new URLSearchParams(params).toString()}` : "";
  return request(`/api/leads${query}`, {}, getToken());
}

export async function updateLead(id: string, data: any): Promise<any> {
  return request(`/api/leads/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, getToken());
}

export async function deleteLead(id: string): Promise<any> {
  return request(`/api/leads/${id}`, { method: "DELETE" }, getToken());
}

export async function exportLeads(status?: string, markSold?: boolean): Promise<any> {
  const params = new URLSearchParams();
  if (status) params.set("status", status);
  if (markSold) params.set("markSold", "true");
  return request(`/api/leads/export?${params.toString()}`, {}, getToken());
}

export async function getStats(): Promise<any> {
  return request("/api/admin/stats", {}, getToken());
}

export async function createProduct(data: any): Promise<any> {
  return request("/api/admin/products", {
    method: "POST",
    body: JSON.stringify(data),
  }, getToken());
}

export async function updateProduct(id: string, data: any): Promise<any> {
  return request(`/api/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, getToken());
}

export async function deleteProduct(id: string): Promise<any> {
  return request(`/api/admin/products/${id}`, { method: "DELETE" }, getToken());
}

export async function getAdminProducts(): Promise<any> {
  return request("/api/products", {}, getToken());
}
