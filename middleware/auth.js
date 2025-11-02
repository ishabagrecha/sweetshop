const jwt = require('jsonwebtoken');

// This is the 'protect' function you already have
function protect(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // req.user now contains { id: '...', role: '...' }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token invalid or expired' });
  }
}

// This is the new 'authorize' function to check roles
function authorize(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: `User role '${req.user.role}' is not authorized for this action`,
      });
    }
    next();
  };
}

// Export both functions
module.exports = { protect, authorize };