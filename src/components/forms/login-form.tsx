"use client";

import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    if (response.ok) {
      window.location.href = "/admin/inquiries";
      return;
    }
    setError("Login failed. Check the admin email and password.");
  }

  return (
    <form onSubmit={submit} className="glass-panel grid gap-4 p-5 md:p-6">
      <label className="label">
        Email
        <input className="field" name="email" type="email" autoComplete="email" required />
      </label>
      <label className="label">
        Password
        <input className="field" name="password" type="password" autoComplete="current-password" required />
      </label>
      <button className="button-primary justify-center" disabled={loading} type="submit">
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error ? (
        <p className="font-bold text-[#f87171]" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
