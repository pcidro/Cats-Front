import RegisterForm from "@/components/register/RegisterForm";
import { getUser } from "@/utils/getuser";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const user = await getUser();
  if (user) {
    redirect("/explorar");
  }
  return (
    <section className="anime-left">
      <RegisterForm />
    </section>
  );
}
