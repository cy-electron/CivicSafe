"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend
} from "recharts";

type TrendData = {
    week: string;
    total: number;
    resolved: number;
};

export default function TrendChart({ data }: { data: TrendData[] }) {

    if (!data || data.length === 0) {
        return (
            <div className="border rounded-xl p-8 bg-white shadow-sm mt-16 text-center text-gray-500">
                No reporting trend data available yet.
            </div>
        );
    }

    return (
        <div className="border rounded-xl p-8 bg-white shadow-sm mt-16">

            {/* Title */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Reporting Trend Analysis
                </h2>

                <p className="text-sm text-gray-500">
                    Monitoring how civic issues are reported and resolved week by week.
                </p>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={320}>

                <LineChart data={data}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="week"
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                    />

                    <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="#9ca3af"
                        allowDecimals={false}
                    />

                    <Tooltip />

                    <Legend />

                    {/* Total Reports */}
                    <Line
                        type="monotone"
                        dataKey="total"
                        name="Total Reports"
                        stroke="#1e3a8a"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                    />

                    {/* Resolved Reports */}
                    <Line
                        type="monotone"
                        dataKey="resolved"
                        name="Resolved Reports"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}