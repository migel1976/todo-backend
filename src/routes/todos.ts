import express from 'express';
let router = express.Router();
import {
  add,
  getAllTodos,
  remove,
  edit,
  getTodoById,
} from '../controllers/todos';

router.post('/add', add);
router.get('/getall', getAllTodos);
router.get('/gettodobyid/:id', getTodoById);
router.delete('/remove/:id', remove);
router.put('/edit/:id', edit);

export default router;
