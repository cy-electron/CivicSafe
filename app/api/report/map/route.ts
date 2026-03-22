import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {

    const { data, error } = await supabase
        .from("reports")
        .select("latitude, longitude, category, location")
        .not("latitude", "is", null)
        .not("longitude", "is", null);

    if (error) {
        return NextResponse.json({ success: false });
    }

    return NextResponse.json({
        success: true,
        reports: data
    });
}