import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { uploadReportImage } from "@/lib/UploadImages";

// CREATE REPORT
export async function POST(request: Request) {
    try {

        const body = await request.json();

        const {
            title,
            description,
            location,
            category,
            caseId,
            image_url
        } = body;

        // Validation
        if (!title || !description || !location || !image_url) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing required fields"
                },
                { status: 400 }
            );
        }

        const report = {
            case_id: caseId,
            title,
            description,
            location,
            category,
            image_url,
            status: "Under Verification"
        };

        const { data, error } = await supabase
            .from("reports")
            .insert([report])
            .select()
            .single();

        if (error) {
            console.error("Database error:", error);

            return NextResponse.json(
                {
                    success: false,
                    message: "Failed to create report"
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Report submitted successfully",
            caseId: data.case_id,
            report: data
        });

    } catch (error) {

        console.error("Report API error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 }
        );
    }
}

export async function GET() {

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

    return NextResponse.json({
        success: true,
        reports: data
    })
}