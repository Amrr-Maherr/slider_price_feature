import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className = "my-slider w-full",
  trackClassName = "bg-gray-200 h-2 rounded-full",
  rangeClassName = "bg-blue-500 h-2 rounded-full",
  thumbClassName = "w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md",
  tooltipClassName = "bg-black text-white px-2 py-1 rounded text-xs",
  tooltipTextClassName = "font-medium",
  tooltipArrowClassName = "bg-black",
  tooltipStyle = {},
  tooltipArrow = true,
  showTooltip = true,
  showValueOutside = true,
  valueOutsideClassName = "text-gray-800 font-medium text-xs",
  value,
  defaultValue = [0, 100],
  min = 0,
  max = 100,
  onValueChange = () => {},
  onChangeValue = () => {},
  ...props
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  const [activeIndex, setActiveIndex] = React.useState(null);
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <SliderPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      onValueChange={(vals) => {
        onValueChange(vals);
        onChangeValue(vals);
      }}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full",
          trackClassName
        )}
      >
        <SliderPrimitive.Range
          className={cn("bg-primary absolute h-full", rangeClassName)}
        />
      </SliderPrimitive.Track>

      {/* Thumbs */}
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow]",
            thumbClassName
          )}
          style={{ cursor: isDragging ? "grabbing" : "grab" }} // cursor change
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
          onFocus={() => setActiveIndex(index)}
          onBlur={() => setActiveIndex(null)}
          onPointerDown={() => {
            setActiveIndex(index);
            setIsDragging(true); // start dragging
          }}
          onPointerUp={() => setIsDragging(false)} // stop dragging
          onPointerCancel={() => setIsDragging(false)} // safety
        >
          {/* Tooltip */}
          {showTooltip && !showValueOutside && activeIndex === index && (
            <div
              className={cn(
                "absolute -top-8 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs text-white",
                tooltipClassName
              )}
              style={tooltipStyle}
            >
              <span className={tooltipTextClassName}>{_values[index]}</span>
              {tooltipArrow && (
                <span
                  className={cn(
                    "absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 rotate-45 bg-inherit",
                    tooltipArrowClassName
                  )}
                />
              )}
            </div>
          )}
        </SliderPrimitive.Thumb>
      ))}

      {/* Values outside slider */}
      {showValueOutside && (
        <>
          <div
            className={cn(
              "absolute -top-6 left-0 text-xs font-medium text-gray-800",
              valueOutsideClassName
            )}
          >
            {_values[0]}
          </div>
          <div
            className={cn(
              "absolute -top-6 right-0 text-xs font-medium text-gray-800",
              valueOutsideClassName
            )}
          >
            {_values[_values.length - 1]}
          </div>
        </>
      )}
    </SliderPrimitive.Root>
  );
}

export { Slider };
