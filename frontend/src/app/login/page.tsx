"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { InputBox,InputBoxRef } from "@/components/ui/InputBox";

export default function LoginPage() {
  const router = useRouter();

  const usernameRef = useRef<InputBoxRef | null>(null);
  const passwordRef = useRef<InputBoxRef | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!usernameRef.current || !passwordRef.current) return;

    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login({
        username: usernameRef.current.inputValue,
        password: passwordRef.current.inputValue,
      });
      console.log("Logged in:", response);
      router.push("/projects");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <InputBox
          ref={usernameRef}
          placeholder="Username"
          required={true}
        />
        <InputBox
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required={true}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
