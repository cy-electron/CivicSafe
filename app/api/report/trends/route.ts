import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {

    const { data, error } = await supabase
        .from("reports")
        .select("created_at");

    if (error) {
        return NextResponse.json({ success: false });
    }

    const counts: any = {};

    data.forEach((r) => {

        const date = new Date(r.created_at).toLocaleDateString();

        counts[date] = (counts[date] || 0) + 1;

    });

    const result = Object.keys(counts).map((key) => ({
        date: key,
        reports: counts[key]
    }));

    return NextResponse.json({
        success: true,
        trends: result
    });
}