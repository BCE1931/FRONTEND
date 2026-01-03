import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { Loader2 } from "lucide-react";

const Middle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const refreshtoken = params.get("refreshtoken");

  useEffect(() => {
    if (token && refreshtoken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshtoken", refreshtoken);

      setTimeout(() => {
        navigate("/home");
      }, 1500); // small delay for UX
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a12] to-[#000000] relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(56,189,248,0.06),transparent_60%)]"></div>

      <Card className="w-full max-w-sm border-none bg-transparent shadow-none relative z-10">
        <MagicCard className="rounded-2xl bg-[#0b0f1a]/90 backdrop-blur-xl border border-gray-800">
          <CardHeader className="text-center border-b border-gray-800 p-6">
            <CardTitle className="text-2xl font-bold text-indigo-300">
              Signing you in
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            <p className="text-sm text-gray-400 text-center">
              Please wait while we securely log you in...
            </p>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
};

export default Middle;
