export const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export type Json =
    | string | number | boolean | null
    | { [key: string]: Json | undefined }
    | Json[];

export class HttpError extends Error {
    status: number;
    body?: unknown;
    constructor(status: number, message: string, body?: unknown) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

export async function http<T>(path: string, init?: RequestInit): Promise<T> {

    // src/lib/http.ts (or https.ts in your case)
    console.log("API_BASE =", API_BASE);

    if (!API_BASE) {
        throw new Error("VITE_API_URL is not set. Add it to .env");
    }
    const res = await fetch(`${API_BASE}${path}`, {
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        credentials: "include",
        ...init,
    });

    if (res.status === 204) return undefined as T;

    let data: unknown;
    const text = await res.text().catch(() => "");
    try { data = text ? JSON.parse(text) : undefined; } catch { data = text; }

    if (!res.ok) {
        throw new HttpError(res.status, res.statusText, data);
    }
    return data as T;
}