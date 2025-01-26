import Task from '#models/task';
import { Request, Response } from 'express';

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    if (!tasks) throw new Error('No tasks found');
    res.json({ ok: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTasksByUserId = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    console.log({userId});

    const tasks = await Task.find({ userId });
    if (!tasks) throw new Error('No tasks found');

    res.status(200).json({ ok: true, data: tasks });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    console.log({userId});
    const task = new Task({ userId, ...req.body });
    await task.save();

    res.status(201).json({ ok: true, data: task });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    if (!taskId) throw new Error('Bad request');

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ ok: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    if (!taskId) throw new Error('Bad request');

    await Task.findByIdAndDelete(taskId);
    res.status(500).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
