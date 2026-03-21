"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryChart({ data }: any) {

    const COLORS = [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
        "#7c3aed"
    ];

    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm">

            <h3 className="text-gray-700 font-semibold mb-4">
                Issue Category Distribution
            </h3>

            <div className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                        >

                            {data.map((entry: any, index: number) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}