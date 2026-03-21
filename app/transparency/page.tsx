import Navbar from "../components/Navbar";

export default function TransparencyPage() {
    return (
        <main className="min-h-screen bg-gray-50">

            <Navbar />

            <section className="max-w-6xl mx-auto py-20 px-6">

                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Transparency Dashboard
                </h1>

                <p className="text-gray-600 mb-12 max-w-2xl">
                    CivicSafe promotes transparency by publicly displaying pollution
                    reports, their status, and how they are being handled by authorities.
                </p>

                {/* Example statistics */}
                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm text-gray-800">Total Reports</h3>
                        <p className="text-3xl text-gray-600 font-bold mt-2">2,847</p>
                    </div>

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm text-gray-800">Cases Resolved</h3>
                        <p className="text-3xl text-gray-600 font-bold mt-2">1,613</p>
                    </div>

                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm text-gray-800">Pending Review</h3>
                        <p className="text-3xl text-gray-600 font-bold mt-2">234</p>
                    </div>

                </div>

            </section>

        </main>
    );
}