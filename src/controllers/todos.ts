import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import type { RequestHandler } from "express";
type ArgumentTypes<T> = T extends (...args: infer P) => any ? P : never;
type RequestHandlerArgs = ArgumentTypes<RequestHandler>;

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const add = async (...args: RequestHandlerArgs) => {
  const [req, res] = args;
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ message: "введите имя" });

  const todos = await prisma.todos.create({
    data: {
      title,
      status: JSON.parse(status),
    },
  });
  if (todos) {
    res.status(200).json({
      title: todos.title,
    });
  } else {
    return res.status(400).json({ message: "ошибка записи в БД" });
  }
};

export const getAllTodos = async (...args: RequestHandlerArgs) => {
  const [req, res] = args;
  try {
    const todos = await prisma.todos.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
    return res.status(200).json(todos);
  } catch {
    return res.status(400).json({ message: "ошибка в получении todos" });
  }
};

export const remove = async (...args: RequestHandlerArgs) => {
  const [req, res] = args;
  try {
    const { id } = req.params;
    await prisma.todos.delete({
      where: {
        id: +id,
      },
    });
    res.status(204).json({ message: "todo успешно удален" });
  } catch {
    res.status(500).json({ message: "не удалось удалить todo" });
  }
};

export const edit = async (...args: RequestHandlerArgs) => {
  const [req, res] = args;
  try {
    const data = req.body;
    const { id } = req.params;

    await prisma.todos.update({
      where: { id: +id },
      data: { title: data.title, status: JSON.parse(data.status) },
    });
    res.status(204).json("OK");
  } catch {
    res.status(400).json({ message: "не удалось изменить todo" });
  }
};

export const getTodoById = async (...args: RequestHandlerArgs) => {
  const [req, res] = args;
  try {
    const { id } = req.params;
    const todo = await prisma.todos.findUnique({
      where: {
        id: +id,
      },
    });
    return res.status(200).json(todo);
  } catch {
    return res.status(400).json({ message: "ошибка получения todo" });
  }
};
