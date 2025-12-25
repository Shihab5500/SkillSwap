export default function EmptyState({ title="Nothing found", subtitle="Try changing filters." }){
  return (
    <div className="text-center p-10 border border-dashed rounded-2xl">
      <div className="text-4xl mb-2">🔎</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="opacity-70">{subtitle}</p>
    </div>
  );
}
