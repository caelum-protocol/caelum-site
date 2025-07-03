"use client";
import { Toaster } from "react-hot-toast";
import { ThemeClientWrapper } from "@/components/ThemeClientWrapper";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useHeartbeat } from "@/hooks/useHeartbeat";

type LayoutClientProps = {
  children: React.ReactNode;
};

export default function LayoutClient({ children }: LayoutClientProps) {
  useHeartbeat();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeClientWrapper>
      <Toaster position="top-right" />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-gray-800 text-white",
          success: { iconTheme: { primary: "#22c55e", secondary: "#1e293b" } },
        }}
      />
      {showLoader && <LoadingOverlay />}
      <AnimatePresence initial={false}>{children}</AnimatePresence>
    </ThemeClientWrapper>
  );
}
