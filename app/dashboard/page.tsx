"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {

    const [stats, setStats] = useState({
        total: 0,
        verification: 0,
        resolved: 0
    });

    const [loading, setLoading] = useState(true);
    const [caseId, setCaseId] = useState("");
    const [reportStatus, setReportStatus] = useState<any>(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadStats = async () => {
            try {
                const res = await fetch("/api/report/stats");
                const data = await res.json();

                if (data.success) {
                    setStats(data.stats);
                }

            } catch (err) {
                console.error("Failed to load stats", err);
            }

            setLoading(false);
        };

        loadStats();

    }, []);

    const handleCheckStatus = async () => {

        if (!caseId) {
            setError("Please enter a Case ID.");
            return;
        }

        setError("");

        try {

            const res = await fetch("/api/report/case", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ caseId })
            });

            const data = await res.json();

            if (data.success) {
                setReportStatus(data.report);
            } else {
                setReportStatus(null);
                setError(data.message || "Report not found");
            }

        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="py-16 px-6">

                <div className="max-w-6xl mx-auto">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-10">
                        CivicSafe Dashboard
                    </h1>

                    {/* Stats Cards */}
                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Total Reports
                            </p>

                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                {loading ? "..." : stats.total}
                            </p>
                        </div>

                        <div className="bg-yellow-50 border rounded-xl p-6 shadow-sm">
                            <p className="text-sm text-yellow-700">
                                Under Verification
                            </p>

                            <p className="text-3xl font-bold text-yellow-800 mt-2">
                                {loading ? "..." : stats.verification}
                            </p>
                        </div>

                        <div className="bg-green-50 border rounded-xl p-6 shadow-sm">
                            <p className="text-sm text-green-700">
                                Resolved
                            </p>

                            <p className="text-3xl font-bold text-green-800 mt-2">
                                {loading ? "..." : stats.resolved}
                            </p>
                        </div>

                    </div>

                    {/* Case Tracking */}
                    <div className="mt-16 bg-white border rounded-xl p-8 shadow-sm">

                        <h2 className="text-gray-700 font-semibold mb-4">
                            Track Your Report
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Enter your Case ID to check the verification or resolution status.
                        </p>

                        <div className="text-gray-800 flex flex-col md:flex-row gap-4">

                            <input
                                type="text"
                                value={caseId}
                                onChange={(e) => setCaseId(e.target.value)}
                                placeholder="Example: CIV-483291"
                                className="border rounded-lg px-4 py-3 w-full md:w-72"
                            />

                            <button
                                onClick={handleCheckStatus}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Check Status
                            </button>

                        </div>

                        {error && (
                            <p className="text-red-500 mt-4">
                                {error}
                            </p>
                        )}

                        {/* Report Result */}
                        {reportStatus && (
                            <div className="text-gray-700 mt-6 border-t pt-6">

                                <p><strong>Title:</strong> {reportStatus.title}</p>
                                <p><strong>Location:</strong> {reportStatus.location}</p>
                                <p><strong>Status:</strong> {reportStatus.status}</p>
                                <p><strong>Category:</strong> {reportStatus.category}</p>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </main>
    );
}