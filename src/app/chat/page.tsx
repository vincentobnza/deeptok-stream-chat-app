"use client";

import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";
import { useUser } from "@clerk/nextjs";
import MenuBar from "./MenuBar";

export default function ChatPage() {
  const { chatClient } = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg">Loading chat...</p>
      </div>
    );
  }
  return (
    <div className="h-screen w-full">
      <Chat client={chatClient}>
        <div className="flex flex-row h-full">
          <div className="w-full max-w-[360px]">
            <MenuBar />
            <ChannelList
              filters={{
                type: "messaging",
                members: { $in: [user.id] },
              }}
              sort={{ last_message_at: -1 }}
              options={{ state: true, presence: true, limit: 10 }}
            />
          </div>
          <div className="w-full h-">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}
