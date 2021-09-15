export const formatPrice = (price: number) => {
  if (price > 999 && price < 1000000) {
    return (price / 1000).toFixed(1) + " Nghìn";
  } else if (price > 1000000 && price < 1000000000) {
    return (price / 1000000).toFixed(1) + " Triệu";
  } else if (price >= 1000000000) {
    return (price / 1000000000).toFixed(1) + " Tỷ";
  } else if (price < 900) {
    return price;
  }
};
