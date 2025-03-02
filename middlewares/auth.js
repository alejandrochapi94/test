//npm install jasonwebtoken
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {//petición, respuesta, callback (pasa al siguiente middleware)
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}