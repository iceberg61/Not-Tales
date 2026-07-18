// Single source of truth for how prices are displayed. Switching currency
// again later (or wiring real exchange rates) only means editing this file.
export function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString("en-NG")}`;
}
