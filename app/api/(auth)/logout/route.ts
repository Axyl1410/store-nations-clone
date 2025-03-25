import { createResponse } from "@/lib/utils";

export async function POST() {
  const response = createResponse("Logged out successfully", true, 200);
  response.cookies.delete("authToken");
  response.cookies.delete("idUser");
  response.cookies.delete("fullname");

  return response;
}
