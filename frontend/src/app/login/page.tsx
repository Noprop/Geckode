"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { InputBox,InputBoxRef } from "@/components/ui/InputBox";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const usernameRef = useRef<InputBoxRef | null>(null);
  const passwordRef = useRef<InputBoxRef | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!usernameRef.current || !passwordRef.current) return;

    e.preventDefault();
    setLoading(true);

    try {
      await login(
        usernameRef.current.inputValue,
        passwordRef.current.inputValue,
      );
      router.push("/projects");
    } catch (err: any) {
      showSnackbar("Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>

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
        <Button
          type="submit"
          disabled={loading}
          className="btn-alt2"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="flex justify-center mt-5">
        <Link href='/register'>
          <div className="hover:text-blue-500">
            Don't have an account yet?
          </div>
        </Link>
      </div>
    </div>
  );
}
