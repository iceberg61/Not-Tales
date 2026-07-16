const Flutterwave = require("flutterwave-node-v3");

const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY);

// TODO (Phase 4): verify transaction by tx_ref/transaction_id after client-side payment
exports.verifyTransaction = async (transactionId) => {
  return flw.Transaction.verify({ id: transactionId });
};

module.exports.flw = flw;
