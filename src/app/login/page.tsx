import LoginForm from "@/components/login/LoginForm";
import { getUser } from "@/utils/getuser";
import { redirect } from "next/navigation";

export default async function PageLogin() {
  const user = await getUser();
  if (user) {
    redirect("/explorar");
  }
  return (
    <section className="anime-left">
      <LoginForm />
    </section>
  );
}
