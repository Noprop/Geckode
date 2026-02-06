"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import usersApi from "@/lib/api/handlers/users";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Modal } from "@/components/ui/modals/Modal";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import { extractAxiosErrMsg } from "@/lib/api/axios";

export default function RegisterPage() {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const emailRef = useRef<InputBoxRef | null>(null);
  const usernameRef = useRef<InputBoxRef | null>(null);
  const firstNameRef = useRef<InputBoxRef | null>(null);
  const lastNameRef = useRef<InputBoxRef | null>(null);
  const passwordRef = useRef<InputBoxRef | null>(null);
  const password2Ref = useRef<InputBoxRef | null>(null);

  const refs = [emailRef, usernameRef, firstNameRef, lastNameRef, passwordRef, password2Ref];
  const labels = ["Email", "Username", "First Name", "Last Name", "Password", "Re-typed Password"];

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (refs.some((ref) => !ref.current)) return;

    e.preventDefault();
    setLoading(true);

    try {
      const response = await usersApi.create({
        email: emailRef.current!.inputValue,
        username: usernameRef.current!.inputValue,
        first_name: firstNameRef.current!.inputValue,
        last_name: lastNameRef.current!.inputValue,
        password: passwordRef.current!.inputValue,
        password2: password2Ref.current!.inputValue,
      });
      console.log("Successfully created user:", response);
      router.push("/login");
    } catch (err: any) {
      showSnackbar(extractAxiosErrMsg(err, "Register failed. Please try again."), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Register"
      subtitle="Create a new Geckode account"
      icon={Pencil2Icon}
      asOverlay={false}
      actions={
        <>
          <Button onClick={(e) => handleSubmit(e)} disabled={loading} className="btn-confirm">
            {loading ? "Creating account..." : "Register"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {...Array.from({ length: refs.length }, (_, i) => {
          return (
            <InputBox
              ref={refs[i]}
              className="flex-1 w-80"
              type={[passwordRef, password2Ref].includes(refs[i]) ? "password" : "input"}
              placeholder={labels[i]}
              required={true}
            />
          );
        })}
      </form>
    </Modal>
  );
}
