import { getUser } from "@/utils/getuser";
import { redirect } from "next/navigation";

export default async function PageExplorar() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  return <div>Explorar</div>;
}
