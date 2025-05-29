import { UserButton } from "@clerk/nextjs";
import { UsersRound } from "lucide-react";

export default function MenuBar() {
  return (
    <div className="p-3 flex items-center justify-between bg-gray-100 border-b border-gray-300">
      <UserButton />
      <div>
        <UsersRound />
      </div>
    </div>
  );
}
