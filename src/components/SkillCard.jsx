

import { Link } from "react-router-dom";
import Badge from "./ui/Badge";
import RatingStars from "./ui/RatingStars";

export default function SkillCard({ skill }){
  const { image, skillName, rating, price, skillId, category } = skill;
  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-xl transition rounded-2xl overflow-hidden group">
      <figure className="relative">
        <img src={image} alt={skillName} className="h-48 w-full object-cover group-hover:scale-[1.02] transition"/>
        <div className="absolute left-3 top-3"><Badge>{category}</Badge></div>
        <div className="absolute right-3 bottom-3 backdrop-blur bg-base-100/70 rounded-full px-2 py-1 text-sm font-semibold">${price}</div>
      </figure>
      <div className="card-body">
        <h4 className="font-semibold line-clamp-1">{skillName}</h4>
        <RatingStars value={rating}/>
        <div className="card-actions justify-end">
          <Link to={`/skills/${skillId}`} className="btn btn-primary btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
}
