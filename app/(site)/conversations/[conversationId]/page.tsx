import getConversationById from "@/actions/get-conversation-by-id";
import getMessages from "@/actions/get-messages";
import EmptyState from "@/components/empty-state";
import React from "react";
import Header from "./components/header";
import Body from "./components/body";
import Form from "./components/form";

type Props = {
  params: {
    conversationId: string;
  };
};

const ConversationIdPage = async ({ params }: Props) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationIdPage;
