import cn, { clsx } from "clsx";
import type { FC } from "react";
import React from "react";

import s from "./section.module.css";

interface SectionProps {
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
  hero?: boolean;
  color?: string;
}

const Section: FC<SectionProps> = ({
  children,
  className,
  el = "section",
  clean = false, // Full Width Screen
  hero = false,
  color = "bg-alice-blue",
}) => {
  const rootClassName = cn(s.root, className);

  const Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return (
    <Component className={rootClassName}>
      {/* Section__masked */}
      <div className="overflow-hidden">
        {/* Section__backgroundMask */}
        <div className="absolute h-full w-full overflow-visible">
          {/* Section__backgrounds (transform-origin: 100% 0; transform: skewY(0);) */}
          <div
            className={clsx(
              "relative top-0 left-0 h-full w-full overflow-hidden",
              color
            )}
          >
            {/* Guides (max-width: calc(100vw - var(--scrollbarWidth);) */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-full px-4">
              {/* Guides__container */}
              <div className={s.guides__container}>
                {/* Guides__guide */}
                <div className={s.guides__guide}></div>
                <div className={s.guides__guide}></div>
                <div className={s.guides__guide}></div>
                <div className={s.guides__guide}></div>
                <div className={s.guides__guide}></div>
              </div>
            </div>
          </div>
        </div>
        {/* Section__container  */}
        <div className="relative z-[1] flex justify-center">
          {/* Section__layoutContainer */}
          <div className={s.layoutContainer}>
            {/* Section__layout */}
            {/* <div className={clsx("py-32", { "pt-0": hero })}>{children}</div> */}
            {children}
          </div>
        </div>
      </div>
    </Component>
  );
};

export default Section;
