const STATUS_STYLES = {
  processing: "bg-mustard/20 text-mustard",
  shipped: "bg-sage/20 text-sage",
  out_for_delivery: "bg-brown/20 text-brown-dark",
  delivered: "bg-sage/30 text-sage",
  cancelled: "bg-red-100 text-red-600",
};

const STATUS_LABELS = {
  processing: "Processing",
  shipped: "Shipped",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-pill text-xs font-medium whitespace-nowrap ${
        STATUS_STYLES[status] || "bg-cream-2 text-ink/60"
      }`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}
