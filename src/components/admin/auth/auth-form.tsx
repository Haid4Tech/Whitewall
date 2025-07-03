"use client";

import { useState } from "react";
import { useMainContext } from "@/components/provider/main-provider";
import { Button } from "@/components/ui/button";
import InputWithLabel from "@/components/general/input-field";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { login } from "@/firebase/auth";

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const { isLoading } = useMainContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(false);
    setIsAuth(true);

    // Basic validation
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setIsAuth(false);
      return;
    }

    const email = formData?.email;
    const password = formData?.password;
    await login(email, password);

    setIsAuth(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputWithLabel
        items={{
          id: "email",
          label: "Email",
          placeholder: "Enter Email",
          type: "email",
          htmlfor: "email",
        }}
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <InputWithLabel
        items={{
          id: "password",
          label: "Password",
          placeholder: "Password",
          type: `${showPassword ? "text" : "password"}`,
          htmlfor: "password",
        }}
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <Button
        type="submit"
        disabled={isAuth}
        className="w-full text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isAuth ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner size="sm" />
            {isLogin ? "Signing in..." : "Creating account..."}
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex flex-row gap-1 items-center">
                <LoadingSpinner size="sm" />
                <p>Checking...</p>
              </div>
            ) : (
              <>{isLogin ? "Sign In" : "Create Account"}</>
            )}
          </>
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
