"use client";

import useConversation from "@/hooks/use-conversation";
import { pusherClient } from "@/lib/pusher";
import { FullMessageType } from "@/types";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./message-box";

type Props = {
  initialMessages: FullMessageType[];
};

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      setMessages((current) => {
        //prevent message duplication
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox key={message.id} data={message} />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
