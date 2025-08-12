import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id; // ✅ correctly store userId
      next();
    } else {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default userAuth;
