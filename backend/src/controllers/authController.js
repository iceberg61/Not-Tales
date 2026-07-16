// TODO (Phase 3): implement with bcrypt hashing + JWT signing
exports.register = async (req, res, next) => {
  // create user, hash password, return token
};

exports.login = async (req, res, next) => {
  // verify credentials, return token
};

exports.logout = async (req, res, next) => {
  // client-side token discard (or blacklist if using refresh tokens)
};

exports.getProfile = async (req, res, next) => {
  // return req.user profile
};

exports.forgotPassword = async (req, res, next) => {
  // generate reset token, email via emailService
};

exports.resetPassword = async (req, res, next) => {
  // verify token, update password
};
