<main className="min-h-screen bg-white"></main>

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import TrendChart from "./components/TrendChart";
import DensityMap from "./components/DensityMap";
import Lifecycle from "./components/Lifecycle";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Top Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Metrics Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <Metrics />
      </section>

      {/* Chart Section */}
      <section className="max-w-7xl mx-auto px-6 mt-16 mb-20">
        <TrendChart data={[]} />
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <DensityMap />
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <Lifecycle />
      </section>
    </main>
  );
}