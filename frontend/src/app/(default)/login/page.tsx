"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { authApi } from "@/lib/api/auth";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Modal } from "@/components/ui/modals/Modal";
import { EnterIcon } from "@radix-ui/react-icons";
import { extractAxiosErrMsg } from "@/lib/api/axios";

export default function LoginPage() {
  const showSnackbar = useSnackbar();

  const usernameRef = useRef<InputBoxRef | null>(null);
  const passwordRef = useRef<InputBoxRef | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!usernameRef.current || !passwordRef.current) return;

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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >
        <LoginInputBox
          ref={usernameRef}
          placeholder="Username"
        />
        <LoginInputBox
          ref={passwordRef}
          placeholder="Password"
          password
        />
      </form>

      <div className="flex justify-center mt-5">
        <Link href="/register">
          <div className="hover:text-blue-500">Don't have an account yet? Register Here!</div>
        </Link>
      </div>
    </Modal>
  );
}

function LoginInputBox({
  ref,
  placeholder,
  password,
}: {
  ref: React.RefObject<InputBoxRef | null>;
  placeholder: string;
  password?: boolean;
}) {
  return (
    <InputBox
      ref={ref}
      className="flex-1 w-80"
      type={password ? "password" : "input"}
      placeholder={placeholder}
      required
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.form?.requestSubmit();
        }
      }}
    />
  );
}
