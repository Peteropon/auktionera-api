export function calculateCost(storage) {
  const rate = storage <= 5 ? 0 : storage <= 20 ? 4 : storage <= 100 ? 2 : 1;

  return rate * storage * 100;
}
