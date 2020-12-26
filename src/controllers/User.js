// const User = require('../models/User');

const User = require("../models/User");

const controller = {
  test: async (req, res) => {
    await res.status(200).send({
      message: "I'm test method",
    });
  },

  getUsers: async (req, res) => {
    try {
      User.find({}).exec((err, users) => {
        // Error first
        if (err) {
          return res
            .status(500)
            .send({ message: "Error while trying to fetch data..." });
        }

        return res.status(200).send({ users }); // Si encontramos usuarios los devolvemos
      });
    } catch (error) {
      return res.status(500).send({ message: "No users..." });
    }
  },

  getUser: async (req, res) => {
    try {
      const userID = req.params.id;
      if (userID === null)
        return res.status(404).send({ message: "User not found" });

      User.findById(userID, (err, user) => {
        if (err)
          return res.status(500).send({ message: "Error has ocurred..." });

        if (!user)
          return res.status(404).send({ message: "The user doesn't exist" });

        return res.status(200).send({ user });
      });
    } catch (error) {
      return res.status(500).send({ message: "Error has ocurred" });
    }
  },
  createUser: async (req, res) => {
    try {
      const user = new User();
      const { name, password, email } = req.body;
      user.name = name;
      user.password = password;
      user.email = email;

      user.save((err, userSaved) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "Error trying to create the user" });
        }

        if (!userSaved)
          return res.status(500).send({ message: "Error has ocurred" });

        return res.status(201).send({ user: userSaved });
      });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;      
    try {
      const user = await User.findOne({ email }).exec();
      if (!user)
        return res
          .status(400)
          .send({ message: "The email does not exist", state: false });

      user.comparePassword(password, (error, match) => {

        if(error) return res.status(500).send({ message: "Error trying to compare password", error: error});

        if (!match)
          return res
            .status(400)
            .send({ message: "The password is invalid", state: false });
      });

      res.send({
        message: "The email and password combination is correct!",
        state: true,
        user,
      });
    } catch (error) {
      res.status(500).send({ message: "Error has ocurred" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userID = req.params.id;
      const update = req.body;

      User.findByIdAndUpdate(
        userID,
        update,
        { new: true },
        (err, userUpdated) => {
          if (err)
            return res
              .status(500)
              .send({ message: "Error trying to update the user" });

          if (!userUpdated)
            return res.status(404).send({ message: "User not found" });

          return res.status(200).send({ user: userUpdated });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};

module.exports = controller;
