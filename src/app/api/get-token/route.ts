import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { StreamChat } from "stream-chat";
import { env } from "@/env";

export async function GET() {
  try {
    const user = await currentUser();

    console.log("Calling get-token for user: ", user?.id);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const streamClient = StreamChat.getInstance(
      env.NEXT_PUBLIC_STREAM_KEY,
      env.STREAM_SECRET,
    );

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60; // Token valid for 1 hour
    const issuedAt = Math.floor(Date.now() / 1000) - 60; // Current time in seconds

    const token = streamClient.createToken(user.id, expirationTime, issuedAt);

    return NextResponse.json(
      {
        token,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in GET /api/get-token:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
