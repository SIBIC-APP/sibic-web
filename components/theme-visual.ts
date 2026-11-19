import { ChartColumn, GraduationCap, Leaf, Shield, type LucideIcon } from "lucide-react";

export type ThemeVisual = {
  icon: LucideIcon;
  chip: string;
  iconWrap: string;
};

const visuals: Record<string, ThemeVisual> = {
  green: {
    icon: Leaf,
    chip: "bg-emerald-50 text-emerald-700",
    iconWrap: "bg-emerald-50 text-emerald-600",
  },
  blue: {
    icon: GraduationCap,
    chip: "bg-blue-50 text-blue-700",
    iconWrap: "bg-blue-50 text-blue-600",
  },
  red: {
    icon: Shield,
    chip: "bg-rose-50 text-rose-600",
    iconWrap: "bg-rose-50 text-rose-600",
  },
  amber: {
    icon: ChartColumn,
    chip: "bg-amber-50 text-amber-700",
    iconWrap: "bg-amber-50 text-amber-600",
  },
};

export function themeVisual(color: string): ThemeVisual {
  return visuals[color] ?? visuals.blue;
}
