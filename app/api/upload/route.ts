import getCurrentUser from "@/actions/get-current-user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { pusherServer } from "@/lib/pusher";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as "message" | "settings" | null;
  const conversationId = searchParams.get("conversationId") as string;

  try {
    const currentUser = await getCurrentUser();
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (type === "message" && (!file || !conversationId)) {
      return NextResponse.json({ error: "Missing data!", status: 400 });
    }

    let image: string | undefined;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      image = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(function (err, result) {
            if (err) {
              reject(err);
            }
            resolve(result?.secure_url);
          })
          .end(buffer);
      });
    }

    if (type === "message") {
      const newMessage = await db.message.create({
        data: {
          image,
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          sender: {
            connect: {
              id: currentUser.id,
            },
          },
        },
        include: {
          sender: true,
        },
      });

      const updatedConversation = await db.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          lastMessageAt: new Date(),
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
        include: {
          users: true,
          messages: true,
        },
      });

      await pusherServer.trigger(conversationId, "messages:new", newMessage);

      const lastMessage =
        updatedConversation.messages[updatedConversation.messages.length - 1];

      updatedConversation.users.map(async (user) => {
        await pusherServer.trigger(user.email!, "conversation:update", {
          id: conversationId,
          messages: [lastMessage],
        });
      });

      return NextResponse.json(newMessage);
    } else if (type === "settings") {
      const updatedUser = await db.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          image: image,
          name: name,
        },
      });

      return NextResponse.json(updatedUser);
    } else {
      return NextResponse.json(
        { error: "Invalid type received!" },
        { status: 400 }
      );
    }
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
