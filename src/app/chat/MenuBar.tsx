import { UserButton } from "@clerk/nextjs";
import { UsersRound } from "lucide-react";

export default function MenuBar() {
  return (
    <div className="bg-zinc-150 flex items-center justify-between border border-zinc-100 border-r-zinc-100 border-b-zinc-300 bg-white p-3">
      <UserButton />
      <div>
        <UsersRound size={18} />
      </div>
    </div>
  );
}
