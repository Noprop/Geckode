"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import usersApi from "@/lib/api/handlers/users";
import { InputBox, InputBoxRef } from "@/components/ui/inputs/InputBox";
import { Button } from "@/components/ui/Button";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Modal } from "@/components/ui/modals/Modal";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { extractAxiosErrMsg, extractAxiosFieldErrors } from "@/lib/api/axios";
import { AxiosError } from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const emailRef = useRef<InputBoxRef | null>(null);
  const usernameRef = useRef<InputBoxRef | null>(null);
  const firstNameRef = useRef<InputBoxRef | null>(null);
  const lastNameRef = useRef<InputBoxRef | null>(null);
  const passwordRef = useRef<InputBoxRef | null>(null);
  const password2Ref = useRef<InputBoxRef | null>(null);

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    if (
      !emailRef.current ||
      !usernameRef.current ||
      !firstNameRef.current ||
      !lastNameRef.current ||
      !passwordRef.current ||
      !password2Ref.current
    )
      return;

    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    try {
      const response = await usersApi.create({
        email: emailRef.current.inputValue,
        username: usernameRef.current.inputValue,
        first_name: firstNameRef.current.inputValue,
        last_name: lastNameRef.current.inputValue,
        password: passwordRef.current.inputValue,
        password2: password2Ref.current.inputValue,
      });
      console.log("Successfully created user:", response);
      router.push("/login");
    } catch (err: unknown) {
      const errors = extractAxiosFieldErrors(err as AxiosError);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
      }
      showSnackbar(extractAxiosErrMsg(err as AxiosError, "Register failed. Please try again."), "error");
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
        <RegisterInputBox
          ref={emailRef}
          placeholder="Email"
          error={fieldErrors.email}
        />
        <RegisterInputBox
          ref={usernameRef}
          placeholder="Username"
          error={fieldErrors.username}
        />
        <RegisterInputBox
          ref={firstNameRef}
          placeholder="First Name"
          error={fieldErrors.first_name}
        />
        <RegisterInputBox
          ref={lastNameRef}
          placeholder="Last Name"
          error={fieldErrors.last_name}
        />
        <RegisterInputBox
          ref={passwordRef}
          placeholder="Password"
          error={fieldErrors.password}
        />
        <RegisterInputBox
          ref={password2Ref}
          placeholder="Re-typed Password"
          error={fieldErrors.password2}
        />
      </form>
    </Modal>
  );
}

function RegisterInputBox({ ref, placeholder, error }: {
  ref: React.RefObject<InputBoxRef | null>,
  placeholder: string,
  error: string[],
}) {
  return (
    <InputBox
      ref={ref}
      className="flex-1 w-80"
      type="input"
      placeholder={placeholder}
      required
      error={error}
    />
  );
}