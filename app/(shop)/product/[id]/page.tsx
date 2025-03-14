import { Client } from "./client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  return <Client id={id} />;
}
