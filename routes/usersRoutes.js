import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// POST api/users/signup registro del usuario
router.post("/signup", async (req, res) => {
  let user;
  user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  try {
    await user.save();
    //para firmar necesitamos
    // los datos, la clave secreta y el tiempo de expiración
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // y ahora enviamos el token en el header de la respuesta al usuario
    res
    .status(201)
    .header("Authorization", token)
    .json({
      user: {
        name: user.name, // solo es de prueba
        email: user.email, //solo es de prueba
        role: user.role, //solo es de prueba
      },
      token,
    });
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

// POST api/users/login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).header("Authorization", token).json({token: token});
});

export default router;