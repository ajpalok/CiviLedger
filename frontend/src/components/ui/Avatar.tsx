interface AvatarProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

const COLORS = [
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-fuchsia-500",
];

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % COLORS.length;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ name = "U", size = "md", className = "" }: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = COLORS[getColorIndex(name)];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br ${colorClass} text-white font-semibold shrink-0 ${SIZES[size]} ${className}`}
      title={name}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
