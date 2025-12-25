
import { useParams, Link, useNavigate } from "react-router-dom";
import skills from "../data/skills.json";
import { toast } from "react-hot-toast";
import RatingStars from "../components/ui/RatingStars";

export default function SkillDetails() {
  const { id } = useParams();
  const nav = useNavigate();


  const skill = skills.find((s) => String(s.skillId) === String(id));

  // যদি skill না পাওয়া যায়
  if (!skill) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center p-6 max-w-md bg-base-200 rounded-2xl shadow">
          <h2 className="text-2xl font-bold text-error mb-2">Skill not found</h2>
          <p className="opacity-70 mb-4">
            Sorry 😔, no skill found for <span className="font-semibold">ID #{id}</span>.
          </p>

          <div className="flex justify-center gap-3">
            <button onClick={() => nav(-1)} className="btn btn-outline">
              ← Go Back
            </button>
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // বুকিং ফর্ম সাবমিট
  const submit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast.success("Session booked successfully!");
  };


  return (
    <div className="my-8 grid md:grid-cols-2 gap-8 animate-fade-up">
      {/* ইমেজ */}
      <img
        src={skill.image}
        alt={skill.skillName}
        className="w-full rounded-2xl shadow-lg object-cover"
      />

      {/* তথ্য */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{skill.skillName}</h2>
          <div className="text-2xl font-extrabold text-primary">
            ${skill.price}
          </div>
        </div>

        <div className="mt-1">
          <RatingStars value={skill.rating} />
        </div>

        <p className="opacity-80 my-3">{skill.description}</p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-base-200">
            Provider: <b>{skill.providerName}</b>
          </div>
          <div className="p-3 rounded-xl bg-base-200">
            Email: <b>{skill.providerEmail}</b>
          </div>
          <div className="p-3 rounded-xl bg-base-200">
            Category: <b>{skill.category}</b>
          </div>
          <div className="p-3 rounded-xl bg-base-200">
            Slots: <b>{skill.slotsAvailable}</b>
          </div>
        </div>

        {/* বুকিং ফর্ম */}
        <form onSubmit={submit} className="space-y-3 mt-6">
          <input
            name="name"
            className="input input-bordered w-full"
            placeholder="Your Name"
            required
          />
          <input
            name="email"
            type="email"
            className="input input-bordered w-full"
            placeholder="Your Email"
            required
          />
          <button className="btn btn-primary w-full">Book Session</button>
        </form>
      </div>
    </div>
  );
}
