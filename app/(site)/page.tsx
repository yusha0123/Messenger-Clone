import AuthForm from "@/components/auth-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getServerSession(authOptions);
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
