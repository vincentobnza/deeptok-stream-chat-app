import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

type ChatChannelProps = {
  show: boolean;
  hideChannelOnThread: boolean;
};

export default function ChatChannel({
  show,
  hideChannelOnThread,
}: ChatChannelProps) {
  return (
    <div
      className={`dark:bg-zinc-9001 flex h-full w-full flex-col bg-white ${show ? "block" : "hidden"}`}
    >
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        {hideChannelOnThread ? null : <Thread />}
      </Channel>
    </div>
  );
}
