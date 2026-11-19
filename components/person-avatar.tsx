import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "cn";

export function PersonAvatar({
  name,
  src,
  className,
}: {
  name: string;
  src: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Avatar className={cn("size-12", className)}>
      {src ? <AvatarImage src={src} alt="" /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
