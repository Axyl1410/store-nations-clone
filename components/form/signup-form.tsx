"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResponsiveDialog,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { useRegistration } from "@/hooks/use-registration";
import { useSignupForm } from "@/hooks/use-signup-form";
import Link from "next/link";
import { TextMorph } from "../motion-primitives/text-morph";
import { ErrorMessage } from "./error-message";

export function SignUpForm() {
  const { formData, errors, updateField, validateAllFields } = useSignupForm();
  const { register, loading, success, setSuccess, navigateToLogin } =
    useRegistration();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    // Validate all fields before submission
    if (!validateAllFields()) {
      return;
    }

    await register(formData);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="border shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Sign up to get started with our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  disabled
                  className="hover:bg-accent relative w-full overflow-hidden transition-all"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 127.14 96.36"
                    fill="currentColor"
                  >
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                  </svg>
                  Sign up with Discord
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    <ErrorMessage error={errors.firstName} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    <ErrorMessage error={errors.lastName} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.address"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  <ErrorMessage error={errors.email} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <p className="text-muted-foreground hover:text-primary text-xs">
                      Password requirements
                    </p>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <ErrorMessage error={errors.password} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  <ErrorMessage error={errors.phone} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="1234 Main St"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  <ErrorMessage error={errors.address} />
                </div>
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  disabled={loading}
                >
                  <TextMorph>
                    {loading ? "Creating account..." : "Create Account"}
                  </TextMorph>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <ResponsiveDialog open={success} onOpenChange={setSuccess}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Navigate to Login</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Your account has been created. Do you want to go to login?
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogFooter>
          <Button variant="outline" onClick={() => setSuccess(false)}>
            Cancel
          </Button>
          <Button onClick={navigateToLogin}>Continue</Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialog>
    </div>
  );
}
