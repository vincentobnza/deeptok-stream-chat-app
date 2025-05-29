"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamChat } from "stream-chat";
import { env } from "@/env";

export default function useInitializeChatClient() {
  const { user } = useUser();

  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    const client = StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY);

    client
      .connectUser(
        {
          id: user.id,
          name: user.fullName || user.username || "User",
          image: user.imageUrl || undefined,
        },
        async () => {
          const response = await fetch("/api/get-token");

          if (!response.ok) {
            throw new Error("Failed to fetch token");
          }
          const body = await response.json();
          return body.token;
        },
      )
      .then(() => {
        setChatClient(client);
      })
      .catch((error) => {
        console.error("Failed to connect user:", error);
      });

    return () => {
      setChatClient(null);
      client.disconnectUser().catch((error) => {
        console.error("Failed to disconnect user:", error);
      });
    };
  }, [user?.id, user?.fullName, user?.username, user?.imageUrl]);

  return { chatClient };
}
