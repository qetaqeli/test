"use client";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  if (!session) {
    return (
      <div className="p-10 text-white">
        <Loader2 className="animate-spin inline mr-2" /> Loading...
      </div>
    );
  }

  // User is logged in
  return (
    <div className="p-6 text-white">
      <Card className="bg-card border border-border shadow-md">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Atomic Funding</h2>
          <p className="text-sm text-muted-foreground mb-6">
            To start your journey, you need to purchase a challenge.
          </p>
          <Button onClick={() => router.push("/dashboard/new-challenge")}>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
