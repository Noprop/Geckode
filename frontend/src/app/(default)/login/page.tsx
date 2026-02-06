"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Modal } from "@/components/ui/modals/Modal";
import { EnterIcon } from "@radix-ui/react-icons";
import { extractAxiosErrMsg } from "@/lib/api/axios";

export default function LoginPage() {
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
      const response = await authApi.login({
        username: usernameRef.current.inputValue,
        password: passwordRef.current.inputValue,
      });
      console.log("Logged in:", response);
      window.location.href = "/projects";
    } catch (err: any) {
      showSnackbar(extractAxiosErrMsg(err), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Login"
      subtitle="Log into your Geckode account"
      icon={EnterIcon}
      asOverlay={false}
      actions={
        <>
          <Button onClick={(e) => handleSubmit(e)} disabled={loading} className="btn-confirm">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <InputBox ref={usernameRef} placeholder="Username" required={true} />
        <InputBox ref={passwordRef} type="password" placeholder="Password" required={true} />
      </div>

      <form className="flex justify-center mt-5">
        <Link href="/register">
          <div className="hover:text-blue-500">Don't have an account yet? Register Here!</div>
        </Link>
      </form>
    </Modal>
  );
}
