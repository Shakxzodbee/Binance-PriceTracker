// src/services/formatService.js

export const formatVolumeAndMarketCap = (value) => {
  if (!value) return "$0";

  const numValue = parseFloat(value);

  if (numValue >= 1e9) {
    return `$${(numValue / 1e9).toFixed(2)}B`; 
  } else if (numValue >= 1e6) {
    return `$${(numValue / 1e6).toFixed(2)}M`; 
  } else {
    return `$${numValue.toFixed(2)}`;
  }
};
