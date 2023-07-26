const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  // Регистрация пользователя
  registerUser: async (req, res) => {
    const { login, password, name, follow, balance } = req.body;
    const candidate = await User.findOne({ login });
    if (candidate) {
      return res
        .status(401)
        .json({ error: "Пользователь с таким Логином уже существует" });
    }

    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));

    const user = await User.create({
      name: name,
      login: login,
      password: hash,
      follow: follow,
      balance: balance,
    });

    res.json(user);
  },
  // Вход в учетную запись
  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login: login });
    if (!candidate) {
      return res.status(401).json({ error: "Неверный Логин или пароль" });
    }
    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный Логин или пароль" });
    }
    const payload = {
      id: candidate._id,
      login: candidate.login,
      name: candidate.name,
      follow: candidate.follow,
      balance: candidate.balance,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "72h",
    });

    res.json(token);
  },
  // вывод одного пользователя
  getUser: async (req, res) => {
    const data = await User.findById(req.user.id).populate("follow");
    res.json(data);
  },
  addMoney: async (req, res) => {
    const data = await User.findOneAndUpdate(
      { login: req.user.login },
      { $inc: { balance: req.body.balance } },
      { new: true }
    );
    res.json(data);
  },
  addFollow: async (req, res) => {
    const getFollow = await User.findOne({ login: req.user.login });
    if (getFollow.follow.length > 0) {
      return res.json("У вас уже есть абонемент");
    }
    const data = await User.findOneAndUpdate(
      { login: req.user.login },
      {
        $push: { follow: req.body.follow },
      },
      { new: true }
    );
    res.json(data);
  },
};
