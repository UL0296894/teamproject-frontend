import React from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

type Props = { rating: number; className?: string };

const RatingBadge = ({ rating, className }: Props) => {
  return (
    <Badge
      className={cn(
        "h-10 text-lg",
        {
          "bg-red-500": rating > 0 && rating <= 1.7,
          "bg-orange-500": rating > 1.7 && rating <= 3,
          "bg-emerald-500": rating > 3 && rating <= 4.4,
          "bg-violet-600": rating > 4.5,
        },
        className
      )}
    >
      {rating.toFixed(1)}/5
    </Badge>
  );
};

export default RatingBadge;
