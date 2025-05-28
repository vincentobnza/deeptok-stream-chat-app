import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-12 bg-zinc-900 text-white">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-br from-blue-600 to-green-300 bg-clip-text text-transparent">
          WELCOME TO DEEPTOK
        </h1>
        <p>
          Chat with your friends, family, and colleagues using the power of
          Deeptok
        </p>
      </div>

      <Button size="lg">Chat Now</Button>
    </main>
  );
}
