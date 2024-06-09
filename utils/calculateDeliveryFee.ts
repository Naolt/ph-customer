const RATE = 10;

export const calculateDeliveryFee = (distance: number): number => {
  return distance * RATE;
};
