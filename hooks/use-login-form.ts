import { isValidEmail, isValidPassword } from "@/lib/utils";
import { LoginForm, LoginFormErrors } from "@/types";
import { useState } from "react";

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormErrors>({
    email: "",
    password: "",
  });

  const updateField = (field: keyof LoginForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    let error = "";

    if (value.trim() === "") {
      switch (field) {
        case "email":
          if (!isValidEmail(value)) {
            error = "Please enter a valid email address";
          }
          break;
        case "password":
          if (!isValidPassword(value)) {
            error = "Password must be at least 6 characters";
          }
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAllFields = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const value = formData[field as keyof LoginForm];

      if (!value) {
        newErrors[field as keyof LoginForm] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      } else if (field === "email" && !isValidEmail(value)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      } else if (field === "password" && !isValidPassword(value)) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      } else {
        newErrors[field as keyof LoginForm] = "";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    formData,
    errors,
    updateField,
    validateAllFields,
  };
}
