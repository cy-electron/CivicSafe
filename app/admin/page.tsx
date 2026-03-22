"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminPage() {

    // 🔐 Auth state
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    // 📊 Data state
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔐 Ask password ONCE
    useEffect(() => {
        const password = prompt("Enter admin password");

        if (password === "admin123") {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    // 🔄 Fetch reports AFTER auth success
    useEffect(() => {
        if (isAuthorized) {
            fetchReports();
        }
    }, [isAuthorized]);

    const fetchReports = async () => {
        try {
            const res = await fetch("/api/report");

            if (!res.ok) {
                throw new Error("Failed to fetch reports");
            }

            const data = await res.json();

            console.log("API DATA:", data);

            // show only under verification
            const pending = data.filter(
                (r: any) => r.status === "under_verification"
            );

            setReports(pending);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Verify function
    const verifyReport = async (id: string, status: string) => {
        console.log("Sending ID:", id);
        try {
            const res = await fetch("/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    status,
                    notes:
                        status === "verified"
                            ? "Approved by admin"
                            : "Rejected by admin",
                }),
            });

            const data = await res.json();

            if (data.success) {
                // remove from UI instantly
                setReports((prev) => prev.filter((r) => r.id !== id));
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error verifying report");
        }
    };

    // ⏳ while checking password
    if (isAuthorized === null) {
        return <div className="p-10">Checking access...</div>;
    }

    // ❌ Unauthorized
    if (!isAuthorized) {
        return <div className="p-10 text-red-600">Unauthorized ❌</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="p-8 max-w-5xl mx-auto">
                <h1 className="text-2xl text-gray-800 font-bold mb-6">
                    🛠 Admin Verification Panel
                </h1>

                {loading ? (
                    <p className="text-gray-600 font-bold"
                    >Loading reports...</p>
                ) : reports.length === 0 ? (
                    <p className="text-gray-800">
                        No reports pending verification 🎉</p>
                ) : (
                    <div className="space-y-6">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="bg-white p-6 rounded-lg shadow border"
                            >
                                {/* Case ID */}
                                <h2 className="text-lg font-semibold text-blue-700">
                                    {report.case_id}
                                </h2>

                                {/* Title */}
                                <p className="text-gray-900 font-medium mt-1">
                                    {report.title}
                                </p>

                                {/* Description */}
                                <p className="text-gray-600 text-sm mt-1">
                                    {report.description}
                                </p>

                                {/* Location */}
                                <p className="text-sm text-gray-500 mt-1">
                                    📍 {report.location}
                                </p>

                                {/* Category */}
                                <p className="text-xs text-gray-400 mt-1">
                                    Category: {report.category}
                                </p>

                                {/* Image */}
                                {report.image_url && (
                                    <img
                                        src={report.image_url}
                                        alt="evidence"
                                        className="mt-4 w-full max-h-64 object-cover rounded-lg border"
                                    />
                                )}

                                {/* Buttons */}
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => verifyReport(report.id, "verified")}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                                    >
                                        ✅ Approve
                                    </button>

                                    <button
                                        onClick={() => verifyReport(report.id, "rejected")}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                                    >
                                        ❌ Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}