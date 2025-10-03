import { useState } from "react";
import { Slider } from "@/components/ui/slider";

function PriceSlider({
  value, // Controlled value from parent
  onChange, // Callback to send value to parent
  min = 0, // Minimum value
  max = 100, // Maximum value
  step = 1, // Step increment
  className = "my-slider w-100", // Root slider class
  trackClassName = "bg-gray-200 h-2 rounded-full", // Track class
  rangeClassName = "bg-blue-500 h-2 rounded-full", // Filled range class
  thumbClassName = "w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md", // Thumb class
  showTooltip = true, // Show tooltip
  tooltipClassName = "bg-black text-white px-2 py-1 rounded text-xs", // Tooltip container class
  tooltipTextClassName = "font-medium", // Tooltip text class
  tooltipStyle = {}, // Inline tooltip style
  tooltipArrow = true, // Show arrow under tooltip
  tooltipArrowClassName = "bg-black", // Tooltip arrow color class
  showValueOutside = false, // Show values outside slider
  valueOutsideClassName = "text-gray-800 font-medium text-xs", // Outside value class
}) {
  // Internal state to control slider if parent doesn't provide value
  const [internalValue, setInternalValue] = useState(value || [min, max]);

  const handleValueChange = (vals) => {
    setInternalValue(vals); // Update internal state
    if (onChange) onChange(vals); // Send value to parent
  };

  return (
    <Slider
      value={internalValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      step={step}
      className={className}
      trackClassName={trackClassName}
      rangeClassName={rangeClassName}
      thumbClassName={thumbClassName}
      showTooltip={showTooltip}
      tooltipClassName={tooltipClassName}
      tooltipTextClassName={tooltipTextClassName}
      tooltipStyle={tooltipStyle}
      tooltipArrow={tooltipArrow}
      tooltipArrowClassName={tooltipArrowClassName}
      showValueOutside={showValueOutside}
      valueOutsideClassName={valueOutsideClassName}
    />
  );
}

export default PriceSlider;
