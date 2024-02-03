import getSession from "@/actions/get-session";
import AuthForm from "@/components/auth-form";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();

  if (session) {
    redirect("/users");
  }

  return (
    <div className="flex min-h-full bg-gray-100 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthForm />
    </div>
  );
};

export default Home;
