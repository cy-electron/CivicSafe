
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
console.log("SERVICE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY); export async function POST(request: Request) {

    try {
        const body = await request.json();

        const { id, status, notes } = body;

        // 🔒 validation
        if (!id || !status) {
            return NextResponse.json(
                { success: false, message: "Missing id or status" },
                { status: 400 }
            );
        }

        // ✅ update report
        const { data, error } = await supabaseAdmin
            .from("reports")
            .update({
                status: status, // "verified" or "rejected"

            })
            .eq("id", id)
            .select();

        if (error) {
            console.error("DB ERROR FULL:", error); // 🔥 IMPORTANT
            return NextResponse.json(
                { success: false, message: error.message },

            );
        }

        return NextResponse.json({
            success: true,
            message: `Report ${status} successfully`,
            data
        });

    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}