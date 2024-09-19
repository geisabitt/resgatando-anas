'use client'
import { useAuth } from "@/auth/context/authContext";
import { LoginForm } from "./components/login-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from '../../../components/LoadingComponent';

export default function Login() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = () => {
      if (isAuthenticated) {
        router.push("/user");
      } else {
        setLoading(false);
      }
    };

    checkUserSession();
  }, [isAuthenticated, router]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex align-center justify-center">
          <LoginForm />
        </div>
      )}
    </>
  );
}