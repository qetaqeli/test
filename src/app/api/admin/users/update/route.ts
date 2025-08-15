import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { id, email, password, role, banned } = await req.json();

    if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const updates: any = { id };
    if (email) updates.email = email;
    if (password) updates.password = password;
    if (role) updates.app_metadata = { role };
    if (typeof banned === "boolean") {
      updates.user_metadata = { banned }; // store ban as user_metadata.banned
    }

    const { data, error } = await supabase.auth.admin.updateUserById(id, updates);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ user: data.user });
  } catch (e) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
