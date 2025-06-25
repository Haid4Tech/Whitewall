import { useState } from "react";
import AuthForm from "./auth-form";
import { format } from "date-fns";
import { useMainContext } from "@/components/provider/main-provider";

const AuthScreen = () => {
  const { isLogin } = useMainContext();
  const [date] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-gold/50 via-white to-primary-gold/80 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="pb-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 animate-fade-in">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-bold">
              Sign in to your Admin Dashboard
            </p>
          </div>

          {/* Auth Form */}
          <AuthForm isLogin={isLogin} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm">
            Copyright © {format(date, "yyyy")} HAID Technologies. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
