"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {

    // -------------------------------
    // Dashboard statistics
    // -------------------------------

    const [stats, setStats] = useState({
        total: 0,
        verification: 0,
        resolved: 0
    });

    const [loading, setLoading] = useState(true);

    // -------------------------------
    // Category chart data
    // -------------------------------

    const [categoryData, setCategoryData] = useState<any[]>([]);

    // -------------------------------
    // Case tracking
    // -------------------------------

    const [caseId, setCaseId] = useState("");
    const [reportStatus, setReportStatus] = useState<any>(null);
    const [error, setError] = useState("");

    // -------------------------------
    // Load dashboard data
    // -------------------------------

    useEffect(() => {

        const loadDashboardData = async () => {

            try {

                // Load stats
                const statsRes = await fetch("/api/report/stats");
                const statsData = await statsRes.json();

                if (statsData.success) {
                    setStats(statsData.stats);
                }

                // Load category distribution
                const catRes = await fetch("/api/report/categories");
                const catData = await catRes.json();

                if (catData.success) {
                    setCategoryData(catData.categories);
                }

            } catch (err) {
                console.error("Dashboard load error:", err);
            }

            setLoading(false);

        };

        loadDashboardData();

    }, []);

    // -------------------------------
    // Case ID status lookup
    // -------------------------------

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
            console.error("Case lookup error:", err);
            setError("Something went wrong.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="py-16 px-6">

                <div className="max-w-6xl mx-auto">

                    {/* Page Title */}
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

                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Track Your Report
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Enter your Case ID to check the verification or resolution status.
                        </p>

                        <div className="text-gray-700 flex flex-col md:flex-row gap-4">

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

                        {reportStatus && (
                            <div className="mt-6 border-t pt-6 text-gray-700 space-y-1">

                                <p><strong>Title:</strong> {reportStatus.title}</p>
                                <p><strong>Location:</strong> {reportStatus.location}</p>
                                <p><strong>Status:</strong> {reportStatus.status}</p>
                                <p><strong>Category:</strong> {reportStatus.category}</p>

                            </div>
                        )}

                    </div>
                    {/* Category Chart */}
                    <div className="mt-12">
                        <CategoryChart data={categoryData} />
                    </div>

                </div>

            </div>

        </main>
    );
}