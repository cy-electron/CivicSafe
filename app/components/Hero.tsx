import Link from "next/link";

export default function Hero() {
    return (
        <section className="py-32 px-6 text-center bg-gray-50">

            {/* Badge */}
            <p className="inline-block text-sm font-semibold bg-blue-100 text-blue-800 px-4 py-1 rounded-full">
                Pollution Transparency Platform
            </p>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-8 leading-tight">
                Structured Pollution
                <br />
                Reporting. Transparent
                <br />
                Tracking.
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-500 mt-6 max-w-2xl mx-auto">
                Documenting and analyzing polluted public areas through verified
                case tracking and lifecycle transparency.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

                {/* Report Button */}
                <Link
                    href="/report"
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition"
                >
                    Report a Case
                </Link>

                {/* Dashboard Button */}
                <Link
                    href="/dashboard"
                    className="border border-gray-300 hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-medium transition"
                >
                    View Dashboard
                </Link>

            </div>

        </section>
    );
}  