const jwt = require("jsonwebtoken");

const COOKIE_NAME = process.env.COOKIE_NAME || "token";
const JWT_SECRET = process.env.JWT_SECRET;

function requireAuth(req, res, next)
{
  try
  {
    const token = req.cookies[COOKIE_NAME];

    console.log("COOKIES:", req.cookies);
    console.log("TOKEN:", req.cookies.token);

    if (!token)
      {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

function requireRole(...allowedRoles)
{
  return (req, res, next) => {
    if(!req.user)
    {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if(!allowedRoles.includes(req.user.rol))
    {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
    next();
  };
}

module.exports = {
  requireAuth,
  requireRole,
};