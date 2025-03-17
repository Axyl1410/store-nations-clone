import { LoginForm } from "@/components/form/login-form";
import axios from "@/lib/axios";

export default async function LoginPage() {
  await axios.post("/api/logout");

  return <LoginForm />;
}
