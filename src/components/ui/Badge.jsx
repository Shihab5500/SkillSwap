export default function Badge({ children, color="secondary" }){
  return <span className={`badge badge-${color} badge-soft`}>{children}</span>;
}
