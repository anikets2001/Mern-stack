//  * ----------------------------------------
//  * Controllers
//  *-----------------------------------------

// ? In an Express.js application, a "controller" refers to a part of your code that
// is responsible for handling the application's logic. Controllers are typically
// used to process incoming requests, interact with models (data sources), and
// send responses back to clients. They help organize your application by separating
//  concerns and following the MVC (model view controller) design pattern.

// controller for home page
const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home page using router");
  } catch (error) {
    console.log(error);
  }
};

// controller for registration page
const register = async (req, res) => {
  try {
    res.status(200).send("welcome to registration page using controller again");
  } catch (error) {
    res.status(400).send({msg: "page not found"})
  }
};


module.exports = { home, register };
