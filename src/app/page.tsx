import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-12">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-br text-blue-600 dark:from-blue-600 dark:to-green-300 dark:bg-clip-text dark:text-transparent">
          WELCOME TO DEEPTOK
        </h1>
        <p>
          Chat with your friends, family, and colleagues using the power of
          Deeptok
        </p>
      </div>
      <Link
        href="/chat"
        className={buttonVariants({
          variant: "default",
          size: "lg",
        })}
      >
        <MessageSquare />
        Chat Now
      </Link>
    </main>
  );
}
