import { Conversation, Message as PrismaMessage, User } from "@prisma/client";

export type FullMessageType = PrismaMessage & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
