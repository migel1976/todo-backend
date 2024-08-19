// const { Pool } = require("pg");
import { Pool } from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
console.log("connectionString ", connectionString);

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const add = async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "введите имя" });

  const todos = await prisma.todos.create({
    data: {
      title,
    },
  });
  if (todos) {
    res.status(200).json({
      name: todos.name,
    });
  } else {
    return res.status(400).json({ message: "ошибка записи в БД" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await prisma.todos.findMany();
    return res.status(200).json(todos);
  } catch {
    return res.status(400).json({ message: "ошибка в получении todos" });
  }
};

export const remove = async (req, res) => {
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

export const edit = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    await prisma.todos.update({
      where: { id: +id },
      // data: { name: data.name, position: data.position },
      data: { title: data.title },
    });
    res.status(204).json("OK");
  } catch {
    res.status(400).json({ message: "не удалось изменить todo" });
  }
};

export const getTodoById = async (req, res) => {
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
