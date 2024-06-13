import express from 'express';
import { validateCreateUser, validateUpdateUser } from './validators.js';
import { createUser, updateUser, getUsers } from './userController.js';

const router = express.Router();

router.post('/users', validateCreateUser, createUser);
router.patch('/users/:id', validateUpdateUser, updateUser);
router.get('/users', getUsers);

export default router;
