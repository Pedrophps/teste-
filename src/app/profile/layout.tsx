
"use client";

import { useUser } from "@/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProfileNav } from "@/components/user/profile-nav";
import { Loader2 } from "lucide-react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isUserLoading && !isAuthenticated) {
      router.push('/login?redirect=/profile');
    }
  }, [isAuthenticated, isUserLoading, router]);

  if (isUserLoading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <aside className="md:w-1/4 lg:w-1/5">
            <ProfileNav />
        </aside>
        <main className="flex-1">
            {children}
        </main>
    </div>
  );
}
