const mongoose = require("mongoose");
const dns = require("node:dns/promises");

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const connectDB = async () => {
  // Guards against connectDB() ever being called twice in the same process
  // (e.g. a stray import) — readyState 1 = connected, 2 = connecting.
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    console.log("MongoDB already connected — skipping duplicate connect.");
    return;
  }

  console.log("Connecting to MongoDB...");
  try {
    // Without an explicit timeout, a blocked port or bad DNS just hangs
    // forever with no log and no error — this forces it to fail within 8s
    // instead, so the real problem shows up immediately.
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error(
      "Common causes on Windows: firewall/antivirus silently blocking the " +
        "outbound connection, your IP not whitelisted in Atlas → Network " +
        "Access, or a wrong password in MONGODB_URI (URL-encode special " +
        "characters like @ as %40)."
    );
    process.exit(1);
  }
};

// Every dev-server restart (nodemon) reconnects from scratch — that part's
// normal and expected, not a bug. These just make an unexpected mid-session
// drop visible in the logs instead of silently hanging on the next query.
mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected."));
mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err.message));

module.exports = connectDB;