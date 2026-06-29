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
      window.location.href = "/owner/inquiries";
      return;
    }
    setError("Login failed. Check the owner email and password.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-[#d7dde7] bg-white p-6 shadow-sm">
      <label className="label">
        Email
        <input className="field" name="email" type="email" required />
      </label>
      <label className="label">
        Password
        <input className="field" name="password" type="password" required />
      </label>
      <button className="button-primary" disabled={loading} type="submit">
        {loading ? "Signing in..." : "Sign in"}
      </button>
      {error ? <p className="font-bold text-red-700">{error}</p> : null}
    </form>
  );
}
