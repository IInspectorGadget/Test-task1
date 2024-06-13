import { validationResult } from 'express-validator';
import RetryQueue from './RetryQueue.js';
import PrismaService from './database.js';

const prismaService = new PrismaService();
const retryQueue = new RetryQueue();

const createChangeLog = (fields) => {
  let change = 'change fields: ';
  const fieldKeys = Object.keys(fields);
  fieldKeys.forEach((key) => {
    if (fields[key] !== undefined) {
      change += `${key}: ${fields[key]}, `;
    }
  });
  if (change.endsWith(', ')) {
    change = change.slice(0, -2);
  }
  return change;
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await prismaService.createUser(req.body);
    const data = {
      user_id: user.id,
      change: `Init fields: lastName:${user.lastName}, firstName:${user.firstName}, age:${user.age}, gender:${user.gender}`,
      date: new Date(),
    };

    retryQueue.addToQueue(data);

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(503).json({ message: 'Database error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await prismaService.updateUser(req.params.id, req.body);
    const change = createChangeLog(req.body);
    const data = {
      user_id: user.id,
      change: change,
      date: new Date(),
    };

    retryQueue.addToQueue(data);

    return res.status(200).send('User updated');
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(503).json({ message: 'Database error', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prismaService.getUsers();
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(503).json({ message: 'Database error', error: error.message });
  }
};


export const gracefulShutdown = async () => {
  console.log('Shutting down server...');
  try {
    await prismaService.disconnect();
    retryQueue.saveQueueToFile();
    console.log('Prisma disconnected');
  } catch (error) {
    console.error('Error disconnecting Prisma:', error);
  } finally {
    process.exit(0);
  }
};
