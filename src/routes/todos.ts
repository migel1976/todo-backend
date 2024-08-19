var express = require("express");
var router = express.Router();
// const {
//   add,
//   // remove,
//   // edit,
//   // getAllUsers,
//   // getUserByName,
// } = require("../controllers/todos");
import {
  add,
  getAllTodos,
  remove,
  edit,
  getTodoById,
} from "../controllers/todos";

router.post("/add", add);
router.get("/getall", getAllTodos);
router.get("/gettodobyid/:id", getTodoById);
router.delete("/remove/:id", remove);
router.put("/edit/:id", edit);

module.exports = router;
