import ClientOne from "@/components/ClientOne";
import { clerkClient } from "@clerk/nextjs";

export default function StoriesPage() {
  async function getUserId(userId: string) {
    "use server";
    const user = await clerkClient.users.getUser(userId);

    return user;
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        <ClientOne />
      </div>
    </div>
  );
}
