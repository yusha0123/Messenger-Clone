import getConversations from "@/actions/get-conversations";
import getUsers from "@/actions/get-users";
import ConversationList from "@/components/conversation-list";
import Sidebar from "@/components/navigation/sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          title="Messages"
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
