import notFound from "@/app/not-found";
import { Client } from "./client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  if (isNaN(id)) return notFound();

  return <Client id={id} />;
}
