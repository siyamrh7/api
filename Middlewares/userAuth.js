const Users = require("../Models/AuthModel");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.json({msg:"Invalid Authentication"});
    }
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(id)
    if (!id) {
      return res.json({msg:"Invalid Authentication"});
    }
    const user = await Users.findOne({ _id:id });
    req.user = user;
    next();
  } catch (error) {
    res.json({msg:"Please Login First"});
  }
};
const adminAuth = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role != "admin") {
      return res.json({msg:"Admin access denied"});
    }
    next();
  } catch (error) {
    res.json({msg:error.message});
  }
};
module.exports = { userAuth, adminAuth };
