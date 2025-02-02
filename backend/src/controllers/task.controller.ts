import { Request, Response } from 'express';

import Task from '#models/task';

export const getTasks = async (_: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    if (!tasks) throw new Error('No tasks found');
    res.json({ ok: true, data: tasks });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const getTasksByUserId = async (_: Request, res: Response) => {
  try {
    const userId = res.locals.userId;

    const tasks = await Task.find({ userId });
    if (!tasks) throw new Error('No tasks found');

    res.status(200).json({ ok: true, data: tasks });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const addTask = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    
    const task = new Task({ userId, ...req.body });
    await task.save();

    res.status(201).json({ ok: true, data: task });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
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
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    if (!taskId) throw new Error('Bad request');

    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(200).json({ error: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
