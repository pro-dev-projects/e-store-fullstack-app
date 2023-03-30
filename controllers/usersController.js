import UserCollection from "../models/userSchema.js";
import ImageCollection from "../models/imageSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  //request handle // controller
  try {
    const users = await UserCollection.find();
    res.json({ success: true, data: users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const addNewUser = async (req, res) => {
  try {
    /* const user = UserCollection.create(req.body) */
    const user = new UserCollection(req.body);

    if (req.files) {
      const image = new ImageCollection({
        filename: new Date().getTime() + "_" + req.files.image.name,
        data: req.files.image.data,
        userId: user._id,
      });
      await image.save();
      user.profileImage = `http://localhost:4000/images/${image.filename}`;
    }
    //hashing user password
    // abcdhfgdhsgfjs3424  $gfgfdhdzrzr675656345325tgdvfq

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;

    //storing user into database
    await user.save();

    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    /*  const user = await UserCollection.findOne({_id:id}) */

    const user = await UserCollection.findById(id);
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.json({ success: false, message: "please provide valid id" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await UserCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ success: true, data: updateduser });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteduser = await UserCollection.findByIdAndDelete(id);

    res.json({ success: true, data: deleteduser });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  // authentication is a process of authorizing user
  // issue token (cerificate)
  try {
    const { email, password } = req.body;
    //finding using by email //verifying email
    const user = await UserCollection.findOne({ email });
    if (user) {
      //verify password
      const verifyPassword = bcrypt.compareSync(password, user.password); //returns Boolean
      if (verifyPassword) {
        // issue token (cerificate)
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.SIGNATURE,
          { expiresIn: "1h", issuer: "Naqvi", audience: "e-store-users" }
        );

        res.header("token", token).json({ success: true, data: user });
      } else {
        res.json({ success: false, message: "password doesn't match" });
      }
    } else {
      res.json({ success: false, message: "email doesn't exist" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
