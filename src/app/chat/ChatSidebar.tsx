import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
} from "stream-chat-react";
import MenuBar from "./MenuBar";
import { UserResource } from "@clerk/types";
import { useCallback } from "react";

type ChatSidebarProps = {
  user: UserResource;
  show: boolean;
  onClose: () => void;
};

export default function ChatSidebar({ user, show, onClose }: ChatSidebarProps) {
  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => {
      return (
        <ChannelPreviewMessenger
          {...props}
          onSelect={() => {
            props.setActiveChannel?.(props.channel, props.watchers);
            onClose();
          }}
        />
      );
    },
    [onClose],
  );

  return (
    <div
      className={`w-full md:max-w-[360px] ${show ? "flex" : "hidden"} flex-col border-r border-zinc-100 bg-white dark:bg-gray-800`}
    >
      <div className="flex-shrink-0">
        <MenuBar />
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ChannelList
          key={user.id}
          filters={{
            type: "messaging",
            members: { $in: [user.id] },
          }}
          sort={{ last_message_at: -1 }}
          options={{ state: true, presence: true, limit: 10 }}
          showChannelSearch
          additionalChannelSearchProps={{
            searchForChannels: true,
            searchQueryParams: {
              channelFilters: {
                filters: {
                  type: "messaging",
                  members: { $in: [user.id] },
                },
              },
            },
          }}
          Preview={ChannelPreviewCustom}
        />
      </div>
    </div>
  );
}
