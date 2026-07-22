"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import api from "@/lib/api";

export default function ProductReviews({ productId, onStatsChange }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("token");

  const loadReviews = () => {
    api
      .get(`/reviews/${productId}`)
      .then(({ data }) => {
        setReviews(data.reviews);
        // Derived straight from the list that's already being fetched here,
        // rather than a second call — this is what lets the rating shown
        // at the top of the page update immediately after a new review,
        // instead of only after the page is reloaded.
        if (onStatsChange) {
          const avg = data.reviews.length
            ? Math.round((data.reviews.reduce((sum, r) => sum + r.rating, 0) / data.reviews.length) * 10) / 10
            : 0;
          onStatsChange(avg, data.reviews.length);
        }
      })
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(loadReviews, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Please select a star rating.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/reviews/${productId}`, { rating, comment });
      setRating(0);
      setComment("");
      loadReviews();
    } catch (err) {
      if (err.response?.status === 409) {
        setAlreadyReviewed(true);
      } else {
        setError(err.response?.data?.message || "Couldn't submit your review.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-20">
      <h2 className="font-display text-2xl font-bold mb-8">
        Reviews {reviews.length > 0 && <span className="text-ink/40 font-normal text-lg">({reviews.length})</span>}
      </h2>

      {/* Write a review */}
      <div className="bg-cream-2 rounded-2xl p-6 mb-8 max-w-lg">
        {!isLoggedIn ? (
          <p className="text-sm text-ink/60">
            <Link href="/login" className="text-brown-dark underline font-medium">Log in</Link> to leave a review.
          </p>
        ) : alreadyReviewed ? (
          <p className="text-sm text-ink/60">You've already reviewed this product.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-sm font-medium mb-2">Your rating</p>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                >
                  <Star
                    size={24}
                    className={(hoverRating || rating) >= n ? "text-mustard" : "text-ink/20"}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts (optional)"
              rows={3}
              className="w-full bg-cream rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
            />

            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 bg-ink text-cream rounded-pill px-6 py-2.5 text-sm font-medium hover:bg-brown-dark transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit review"}
            </button>
          </form>
        )}
      </div>

      {/* Existing reviews */}
      {loading ? (
        <p className="text-sm text-ink/50">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-ink/50">No reviews yet — be the first.</p>
      ) : (
        <div className="space-y-5 max-w-lg">
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-ink/10 pb-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{r.user?.name || "Anonymous"}</p>
                <span className="text-xs text-ink/40">
                  {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex gap-0.5 mt-1 text-mustard">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} fill={i < r.rating ? "currentColor" : "none"} className={i < r.rating ? "" : "text-ink/20"} strokeWidth={i < r.rating ? 0 : 1.5} />
                ))}
              </div>
              {r.comment && <p className="text-sm text-ink/70 mt-2">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}