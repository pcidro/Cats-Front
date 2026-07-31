"use server";

import { removeToken } from "@/utils/cookies";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await removeToken();
  redirect("/login");
}
