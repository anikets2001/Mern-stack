//  * ----------------------------------------
//  * Controllers
//  *-----------------------------------------

// ? In an Express.js application, a "controller" refers to a part of your code that
// is responsible for handling the application's logic. Controllers are typically
// used to process incoming requests, interact with models (data sources), and
// send responses back to clients. They help organize your application by separating
//  concerns and following the MVC (model view controller) design pattern.

const User = require("../models/user-model");
const brcrypt = require("bcryptjs");

// controller for home page
const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home page using router");
  } catch (error) {
    console.log(error);
  }
};

/*-- user-registration logic steps
step1: Get Registration Data: Retrieve user data(username, email, password, phone).
step2: Check Email Existence: check if the email is already registered.
step3: Hash Password: Securely hash the password.
step4: Create User: Create a new user with hashed password.
step5: Save to DB: SAve user data to the database.
step6: Respond: Respond with "Registered Successfully" or handle errors.
--*/

// controller for registration page
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    // hash the password
    const saltRound = 10;
    const hash_password = await brcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });
    res.status(200).json({ msg: userCreated });
  } catch (error) {
    res.status(500).send({ msg: "internal server error" });
  }
};

module.exports = { home, register };
