import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  styles?: CSSProperties;
};

const MaxWidthWrapper = ({ className, children, styles }: Props) => {
  return (
    <div
      style={styles}
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
