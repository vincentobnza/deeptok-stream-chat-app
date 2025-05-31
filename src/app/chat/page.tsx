"use client";

import useInitializeChatClient from "./useInitializeChatClient";
import { useUser } from "@clerk/nextjs";
import ChatSidebar from "./ChatSidebar";
import ChatChannel from "./ChatChannel";
import { Chat } from "stream-chat-react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

export default function ChatPage() {
  const { chatClient } = useInitializeChatClient();
  const { user } = useUser();
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const windowSize = useWindowSize();

  const isLargeScreen = windowSize.width >= 768;

  useEffect(() => {
    if (windowSize.width >= 768) {
      setChatSidebarOpen(true);
    }
  }, [windowSize.width]);

  const handleSidebarOnClose = useCallback(() => {
    if (!isLargeScreen) {
      setChatSidebarOpen(false);
    }
  }, [isLargeScreen]);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-50 xl:px-20 xl:py-8">
      <div className="h-full max-w-[1600px] min-w-[350px] rounded-lg shadow-sm">
        <Chat client={chatClient}>
          <div className="flex justify-center border-b border-zinc-100 p-3 md:hidden">
            <button onClick={() => setChatSidebarOpen(!chatSidebarOpen)}>
              {!chatSidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu />
                  Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex h-full flex-row">
            <ChatSidebar
              user={user}
              show={isLargeScreen || chatSidebarOpen}
              onClose={handleSidebarOnClose}
            />
            <ChatChannel
              show={isLargeScreen || !chatSidebarOpen}
              hideChannelOnThread={!isLargeScreen && !chatSidebarOpen}
            />
          </div>
        </Chat>
      </div>
    </div>
  );
}
