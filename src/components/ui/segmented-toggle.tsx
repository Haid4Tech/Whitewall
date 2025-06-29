import React, { useRef, useLayoutEffect, useState } from "react";

interface SegmentedToggleProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumbStyle, setThumbStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const idx = options.findIndex((opt) => opt.value === value);
    const btn = btnRefs.current[idx];
    const container = containerRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      // const containerRect = container.getBoundingClientRect();
      setThumbStyle({
        width: btnRect.width,
        height: btnRect.height,
        transform: `translateX(${btn.offsetLeft}px)`,
      });
    }
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={`relative flex w-max rounded-full border-1 border-black p-1 transition-colors ${className}`}
    >
      {/* Animated Thumb */}
      <span
        className="absolute top-1 left-0 rounded-full bg-white py-1 shadow transition-all duration-300 ease-in-out z-0"
        style={thumbStyle}
      />
      {options.map((option, idx) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              btnRefs.current[idx] = el;
              return undefined;
            }}
            type="button"
            onClick={() => onChange(option.value)}
            className={`cursor-pointer z-10 flex-1 py-1 px-5 rounded-full text-xs md:text-sm transition-colors duration-200 focus:outline-none text-black hover:text-gray-500"
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
export const AvailabilityToggle: React.FC<SegmentedToggleProps> = ({
  options,
  value,
  onChange,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumbStyle, setThumbStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const idx = options.findIndex((opt) => opt.value === value);
    const btn = btnRefs.current[idx];
    const container = containerRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      // const containerRect = container.getBoundingClientRect();
      setThumbStyle({
        width: btnRect.width,
        height: btnRect.height,
        transform: `translateX(${btn.offsetLeft}px)`,
      });
    }
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={`relative flex w-full rounded-md bg-white border-2 border-black p-1 transition-colors ${className}`}
    >
      {/* Animated Thumb */}
      <span
        className="absolute top-1 left-0 rounded-md bg-black shadow transition-all duration-300 ease-in-out z-0"
        style={thumbStyle}
      />
      {options.map((option, idx) => {
        return (
          <button
            key={option.value}
            ref={(el) => {
              btnRefs.current[idx] = el;
              return undefined;
            }}
            type="button"
            onClick={() => onChange(option.value)}
            className={`z-10  flex-1 px-5 rounded-full text-xs md:text-sm transition-colors duration-200 focus:outline-none hover:text-purple-200
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
