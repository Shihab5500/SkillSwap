
import clsx from "clsx";

export default function Button({
  as: Tag = "button",
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-semibold transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5",
    lg: "px-5 py-3 text-lg",
  };
  const variants = {
    primary: "bg-primary text-white hover:opacity-90 focus:ring-primary",
    outline: "border border-base-300 bg-white hover:bg-base-100",
    ghost: "hover:bg-base-200",
  };

  return (
    <Tag
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
