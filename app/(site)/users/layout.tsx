import getUsers from "@/actions/get-users";
import Sidebar from "@/components/navigation/sidebar";
import UsersList from "@/app/(site)/users/components/users-list";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UsersList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
