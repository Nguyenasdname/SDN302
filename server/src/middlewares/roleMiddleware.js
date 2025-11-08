exports.allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.userRole;
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "No Access" });
    }
    next();
  };
};
