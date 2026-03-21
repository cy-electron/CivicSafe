"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";
import { uploadReportImage } from "@/lib/UploadImages";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        category: "Garbage Dumping"
    });

    const [image, setImage] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!image) {
            alert("Photo evidence is required to submit a report.");
            return;
        }

        setLoading(true);

        try {

            // Step 1: generate case ID
            const caseId = "CIV-" + Math.floor(100000 + Math.random() * 900000);

            // Step 2: upload image
            const imageUrl = await uploadReportImage(image, caseId);

            // Step 3: send report to API
            const res = await fetch("/api/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    location: form.location,
                    category: form.category,
                    caseId: caseId,
                    image_url: imageUrl
                })
            });

            const result = await res.json();

            if (result.success) {
                setSuccess(caseId);

                setForm({
                    title: "",
                    description: "",
                    location: "",
                    category: "Garbage Dumping"
                });

                setImage(null);
            } else {
                alert(result.message);
            }

        } catch (err) {
            console.error(err);
            alert("Something went wrong during submission.");
        }

        setLoading(false);
    };
    return (
        <main className="min-h-screen bg-gray-50">

            <Navbar />

            <div className="py-16 px-6">

                <div className="max-w-3xl mx-auto">

                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-6">
                        Home / Report Issue
                    </div>

                    <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg py-3 text-center text-sm text-gray-700">

                        Already submitted a report?{" "}

                        <Link
                            href="/dashboard"
                            className="text-blue-700 font-semibold hover:underline"
                        >
                            Track your case here →
                        </Link>

                    </div>
                    {/* Card */}
                    <div className="bg-white p-10 rounded-xl shadow-sm border">

                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Report a Civic Issue
                        </h1>

                        <p className="text-gray-600 mb-2">
                            Help improve your city by reporting environmental or civic problems.
                        </p>

                        <p className="text-sm text-gray-500 mb-8">
                            Fields marked with <span className="text-red-500">*</span> are required.
                        </p>

                        {success && (
                            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800">
                                ✅ Report submitted successfully. Case ID: <strong>{success}</strong>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Issue Title <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Example: Garbage dumping near lake"
                                    className="w-full border rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Issue Category
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                >
                                    <option>Garbage Dumping</option>
                                    <option>Water Pollution</option>
                                    <option>Air Pollution</option>
                                    <option>Chemical Waste</option>
                                    <option>Noise Pollution</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe the issue in detail..."
                                    className="w-full border rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="Enter area, landmark, or address"
                                    className="w-full border rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    required
                                />

                                <button
                                    type="button"
                                    className="text-sm text-blue-700 mt-2 hover:underline"
                                >
                                    📍 Use my current location
                                </button>
                            </div>

                            {/* Image uploader component */}
                            <ImageUploader image={image} setImage={setImage} />

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full border rounded-lg px-4 py-3 text-gray-900 font-bold focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            >
                                {loading ? "Submitting..." : "Submit Report"}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </main >
    );
}