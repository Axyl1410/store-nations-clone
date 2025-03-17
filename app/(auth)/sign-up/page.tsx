import { SignUpForm } from "@/components/form/signup-form";
import axios from "@/lib/axios";

export default async function SignUpPage() {
  await axios.post("/api/logout");

  return <SignUpForm />;
}
