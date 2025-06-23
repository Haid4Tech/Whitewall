"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import InputWithLabel from "@/components/general/input-field";
import { login } from "@/firebase/auth";

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

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
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const email = formData?.email;
    const password = formData?.password;
    await login(email, password);

    setIsLoading(false);
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

      {isLogin && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-black hover:text-black/50 cursor-pointer transition-colors"
          >
            Forgot password?
          </button>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            {isLogin ? "Signing in..." : "Creating account..."}
          </div>
        ) : isLogin ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
