const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, number, password } = req.body;
  if (await User.findOne({ email: email })) {
    return res.status(409).json({ msg: "This email is already registred" });
  }
  if (await User.findOne({ number: number })) {
    return res.status(409).json({ msg: "This number is already registred" });
  }
  try {
    const hashedPassword= await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, number, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ msg: `Welcome ${name}` });
  } catch (error) {
    return res.status(500).json({ msg: "error creating user" });
  }
};

const signin = async (req, res) => {
  const { email, number, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { number }] });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect password" });
    }
    return res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const reqsend = async (req,res) => {
  res.send("hello hunny bunny");
};

module.exports = {signup, signin, reqsend}
