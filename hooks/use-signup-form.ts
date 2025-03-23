import { isValidEmail, isValidPassword } from "@/lib/utils";
import { SignupFormData, SignupFormErrors } from "@/types";
import { useState } from "react";

export function useSignupForm() {
  // Form data state
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Error states
  const [errors, setErrors] = useState<SignupFormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  // Update form data and validate field
  const updateField = (field: keyof SignupFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Validate the field
    let error = "";

    if (value.trim() === "") {
      // Only set required error if user has entered something and then deleted it
      if (formData[field] !== "") {
        error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    } else {
      // Field-specific validations
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

  // Validate all fields at once (useful for form submission)
  const validateAllFields = (): boolean => {
    const newErrors = { ...errors };
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const field = key as keyof SignupFormData;
      const value = formData[field];

      if (!value) {
        newErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        isValid = false;
      } else if (field === "email" && !isValidEmail(value)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      } else if (field === "password" && !isValidPassword(value)) {
        newErrors.password = "Password must be at least 6 characters";
        isValid = false;
      } else {
        newErrors[field] = ""; // Clear error if valid
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
