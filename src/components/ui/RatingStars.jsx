export default function RatingStars({ value=0 }){
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({length:5}).map((_,i)=>(
        <svg key={i} viewBox="0 0 20 20" className={`w-4 h-4 ${i<full ? "fill-yellow-400" : i===full && half ? "fill-yellow-300" : "fill-base-300"}`}>
          <path d="M10 15l-5.878 3.09 1.122-6.545L0.488 6.91l6.561-0.954L10 0l2.951 5.956 6.561 0.954-4.756 4.635 1.122 6.545z"/>
        </svg>
      ))}
      <span className="text-xs opacity-70 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}
