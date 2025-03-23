import axios from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { LoginForm } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = async (formData: LoginForm) => {
    setLoading(true);

    try {
      await axios.post("/api/login", formData);
      setSuccess(true);
    } catch (error) {
      toast.error("An error occurred during login", {
        description: getErrorMessage(error),
      });
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    success,
  };
}
