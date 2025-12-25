

import { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import skillsData from "../data/skills.json";
import providers from "../data/providers.json"; // ✅ Top Rated Providers JSON
import HeroSlider from "../components/HeroSlider";
import SkillCard from "../components/SkillCard";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(skillsData.map((s) => s.category)))],
    []
  );

  const filtered = useMemo(() => {
    let arr = skillsData.filter(
      (s) =>
        (category === "All" || s.category === category) &&
        (s.skillName.toLowerCase().includes(query.toLowerCase()) ||
          s.providerName.toLowerCase().includes(query.toLowerCase()))
    );
    if (sortBy === "rating") arr.sort((a, b) => b.rating - a.rating);
    if (sortBy === "priceLow") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [query, category, sortBy]);

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-10">
      <HeroSlider />

      {/* Filters */}
      <section className="my-6 animate-fade-up">
        <div className="flex flex-col gap-3 bg-base-200 p-4 rounded-2xl md:flex-row md:items-center md:justify-between">
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  category === c
                    ? "bg-primary text-white border-primary"
                    : "border-base-300 hover:bg-base-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search, Sort, Reset */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-end w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills or providers…"
              className="input input-bordered w-full sm:w-56 md:w-72"
            />
            <select
              className="select select-bordered w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="priceLow">Price: Low → High</option>
              <option value="priceHigh">Price: High → Low</option>
            </select>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setQuery("");
                setCategory("All");
                setSortBy("rating");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="my-8">
        <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Popular Skills
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card bg-base-100 p-4">
                <div className="w-full h-40 rounded-lg bg-base-200 animate-pulse" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-base-200 rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-base-200 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(0, 6).map((s) => (
              // ✅ show only 6 cards on big screens
              <SkillCard key={s.skillId} skill={s} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No skills match your filters"
            subtitle="Try a different keyword or category."
          />
        )}
      </section>

      {/* ✅ Top Rated Providers (from fake JSON) */}
      <section data-aos="fade-up" className="my-12">
        <h3 className="text-2xl font-semibold mb-4 text-center md:text-left">
          Top Rated Providers
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((p, i) => (
            <div
              key={i}
              className="p-5 bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-16 h-16 rounded-full ring-2 ring-base-300"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm opacity-70">{p.skill}</p>
                  <p className="text-sm mt-0.5">⭐ {Number(p.rating).toFixed(1)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <h1 className="text-center text-5xl font-bold text-gray-700 pt-9">How it works</h1>
      <section className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[ 
          { icon: "🎯", title: "Find A Skill", sub: "Browse through hundreds of skills offered by talented individuals in your area." },
          { icon: "⭐", title: "Explore Ratings & Reviews", sub: "Learn more about the skills you need by reading reviews and comparing prices." },
          { icon: "📅", title: "Learn & Grow", sub: "Attend your session, learn a new skill, and leave a review to help the community." },
        ].map((i, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-base-200 hover:bg-base-300/60 transition animate-scale-in text-center md:text-left"
          >
            <div className="text-3xl">{i.icon}</div>
            <h4 className="font-semibold mt-2">{i.title}</h4>
            <p className="opacity-70">{i.sub}</p>
          </div>
        ))}
      </section>

      {/* Extra CTA */}
      <section className="my-12 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h3 className="text-2xl font-semibold">Got a Skill? Share & Earn</h3>
          <p className="opacity-70">Create a listing and connect with local learners.</p>
        </div>
        <Button size="lg" className="w-full md:w-auto">
          Post a Skill (coming soon)
        </Button>
      </section>
    </div>
  );
}
