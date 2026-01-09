"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-200 text-slate-950",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#ffffff_0%,#f3e8ff_8%,#e9d5ff_16%,#d8b4fe_24%,#c084fc_32%,#a855f7_40%,#7c3aed_48%,#f5d0fe_56%,#ffffff_72%)",
              "--aurora-beams":
                "repeating-linear-gradient(115deg,transparent_0%,transparent_6%,#a855f7aa_8%,#f5d0feaa_10%,transparent_14%,transparent_18%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,transparent_10%,transparent_12%,var(--white)_16%)",

"--blue-300": "#d6c7f5",   /* soft lavender-blue */
              "--blue-400": "#bfa6ef",   /* muted blue-violet */
              "--blue-500": "#9b7fe3",   /* deeper aura blue */

              "--indigo-300": "#c3a4e8", /* lavender-indigo glow */

              "--violet-200": "#eadbfb", /* very light violet mist */

              "--black": "#000000",      /* pure black */

              "--white": "#e5e7eb",      /* darker white (light gray) */

"--transparent": "transparent"

            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora-beams),var(--aurora)] [background-size:260%,_160%,_240%] [background-position:50%_50%,50%_50%,50%_50%] opacity-90 blur-[18px] saturate-[1.4] will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_18%,var(--blue-300)_28%,var(--violet-200)_40%,var(--blue-400)_52%)] [--aurora-beams:repeating-linear-gradient(115deg,transparent_0%,transparent_5%,var(--blue-500)_7%,var(--violet-200)_9%,transparent_13%,transparent_18%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_6%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora-beams),var(--aurora)] after:[background-size:220%,_140%,_120%] after:[background-attachment:fixed] after:content-[""]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
