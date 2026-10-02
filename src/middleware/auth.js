function requireAdmin(req, res, next) {
  const expected = process.env.ADMIN_TOKEN || "change-me";
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || token !== expected) {
    return res.status(401).json({
      error: "UNAUTHORIZED",
      message: "Administrator authentication required."
    });
  }
  next();
}

module.exports = { requireAdmin };