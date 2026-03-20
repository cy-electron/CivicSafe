import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { caseId } = body;

        if (!caseId) {
            return NextResponse.json({
                success: false,
                message: "Case ID is required"
            });
        }

        const { data, error } = await supabase
            .from("reports")
            .select("*")
            .eq("case_id", caseId)
            .single();

        if (error || !data) {
            return NextResponse.json({
                success: false,
                message: "No report found with this Case ID"
            });
        }

        return NextResponse.json({
            success: true,
            report: data
        });

    } catch (err) {

        console.error("Case lookup error:", err);

        return NextResponse.json({
            success: false,
            message: "Server error while checking case"
        });
    }
}