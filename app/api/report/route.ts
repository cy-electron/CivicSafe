import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/* ===============================
   CREATE REPORT
================================ */
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

        /* Validation */
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


/* ===============================
   TREND ANALYTICS
================================ */
export async function GET() {

    try {

        const { data, error } = await supabase
            .from("reports")
            .select("created_at, status");

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.message
            });
        }

        const weekly: Record<string, {
            week: string;
            total: number;
            resolved: number;
        }> = {};

        data.forEach((report) => {

            const date = new Date(report.created_at);

            const year = date.getFullYear();

            /* Week calculation */
            const start = new Date(year, 0, 1);
            const diff = (date.getTime() - start.getTime()) / 86400000;
            const week = Math.ceil((diff + start.getDay() + 1) / 7);

            const key = `${year}-W${week}`;

            if (!weekly[key]) {
                weekly[key] = {
                    week: `Week ${week}`,
                    total: 0,
                    resolved: 0
                };
            }

            weekly[key].total++;

            if (report.status?.toLowerCase() === "resolved") {
                weekly[key].resolved++;
            }

        });

        const trends = Object.values(weekly);

        /* sort weeks */
        trends.sort((a, b) => {
            const wA = parseInt(a.week.replace("Week ", ""));
            const wB = parseInt(b.week.replace("Week ", ""));
            return wA - wB;
        });

        return NextResponse.json({
            success: true,
            trends
        });

    } catch (error) {

        console.error("Trend API error:", error);

        return NextResponse.json({
            success: false,
            message: "Failed to fetch trend data"
        });

    }
}