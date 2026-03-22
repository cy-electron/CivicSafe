/*import { NextResponse } from "next/server";
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
    */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";



export async function POST(request: Request) {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({
                success: false,
                message: "Missing id or status",
            });
        }

        const { error } = await supabase
            .from("reports")
            .update({ status })
            .eq("id", id);

        if (error) {
            console.error("DB ERROR:", error);
            return NextResponse.json({
                success: false,
                message: error.message,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Report updated successfully",
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        return NextResponse.json({
            success: false,
            message: "Server error",
        });
    }
}
export async function GET() {
    try {
        const { data, error } = await supabase
            .from("reports")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}