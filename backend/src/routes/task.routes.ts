import { Router } from "express";

import { addTask, deleteTask, getTasks, getTasksByUserId, updateTask } from "#controllers/task.controller";
import Auth from "#middlewares/auth.middleware";

const router = Router();

router.get("/",Auth, getTasks);
router.get("/userTasks",Auth, getTasksByUserId);
router.post("/",Auth, addTask);
router.put("/:id",Auth, updateTask);
router.delete("/:taskId",Auth, deleteTask);

export default router;