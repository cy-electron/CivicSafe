import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {

    const { data, error } = await supabase
        .from("reports")
        .select("category");

    if (error) {
        return NextResponse.json({
            success: false
        });
    }

    const counts: any = {};

    data.forEach((r) => {
        counts[r.category] = (counts[r.category] || 0) + 1;
    });

    const result = Object.keys(counts).map((key) => ({
        name: key,
        value: counts[key]
    }));

    return NextResponse.json({
        success: true,
        categories: result
    });
}