const router = require("express").Router();
const { signupCtrl, signinCtrl ,singleUser,getUsers,deleteUser,editUser} = require("../Controllers/AuthCtrl");
const { userAuth } = require("../Middlewares/userAuth");
router.get("/", (req, res) => {
  res.send("server is running");
});
router.post("/signup", signupCtrl);
router.post("/signin", signinCtrl);
router.get("/user", userAuth,singleUser);
router.get("/users",getUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id",editUser)
module.exports = router;
