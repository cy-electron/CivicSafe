import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {

    const { data, error } = await supabase
        .from("reports")
        .select("status");

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }

    const total = data.length;

    const verification = data.filter(
        r => r.status?.toLowerCase() === "under_verification"
    ).length;

    const progress = data.filter(
        r => r.status?.toLowerCase() === "in_progress"
    ).length;

    const resolved = data.filter(
        r => r.status?.toLowerCase() === "resolved"
    ).length;

    return NextResponse.json({
        success: true,
        stats: {
            total,
            verification,
            progress,
            resolved
        }
    });
}