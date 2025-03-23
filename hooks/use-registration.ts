import axios from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { SignupFormData } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const register = async (formData: SignupFormData) => {
    setLoading(true);

    try {
      await axios.post("/api/register", formData);
      setSuccess(true);
    } catch (error) {
      toast.error("An error occurred during registration", {
        description: getErrorMessage(error),
      });
      setError(getErrorMessage(error));
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  return {
    register,
    loading,
    success,
    setSuccess,
    navigateToLogin,
    error,
  };
}
