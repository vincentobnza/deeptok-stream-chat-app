import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div>
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            formFieldInput: "border-gray-300 focus:border-blue-500",
            formFieldLabel: "text-gray-700",
          },
        }}
      />
    </div>
  );
}
