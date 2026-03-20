import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {

    const { data, error } = await supabase
        .from("reports")
        .select("status");

    if (error) {
        return NextResponse.json({
            success: false,
            message: "Failed to fetch stats"
        });
    }

    const total = data.length;
    const verification = data.filter(r => r.status === "Under Verification").length;
    const resolved = data.filter(r => r.status === "Resolved").length;

    return NextResponse.json({
        success: true,
        stats: {
            total,
            verification,
            resolved
        }
    });
}