'use client'
import { useAuth } from "@/auth/context/authContext";
import { LoginForm } from "./components/login-form";
import { useEffect } from "react";

export default function Login() {
  const { checkSession } = useAuth();
  useEffect(() => {
    checkSession();
  }, [checkSession]);
  return (
    <div className="flex align-center justify-center">
        <LoginForm />
    </div>
  )
}