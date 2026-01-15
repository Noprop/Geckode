"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import usersApi from "@/lib/api/handlers/users";
import { InputBox,InputBoxRef } from "@/components/ui/inputs/InputBox";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useSnackbar } from "@/hooks/useSnackbar";

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
  const labels = ['Email', 'Username', 'First Name', 'Last Name', 'Password', 'Re-typed Password'];

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (refs.some(ref => !ref.current)) return;

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
      showSnackbar("Register failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Register</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {...Array.from({ length: refs.length / 2 }, ((_, i) => (
          <div className="flex gap-4">
            {...Array.from({ length: 2 }, (_, j) => {
              const index = i * 2 + j;
              return (
                <InputBox
                  ref={refs[index]}
                  className="flex-1 w-80"
                  type={[passwordRef, password2Ref].includes(refs[index]) ? "password" : "input"}
                  placeholder={labels[index]}
                  required={true}
                />
              );
            })}
          </div>
        )))}

        <Button
          type="submit"
          disabled={loading}
          className="btn-alt2"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="flex justify-center mt-5">
        <Link href='/login'>
          <div className="hover:text-blue-500">
            Already have an account?
          </div>
        </Link>
      </div>
    </div>
  );
}
