// src/services/priceFormatter.js

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price);
};
