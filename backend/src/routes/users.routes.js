import {Router} from 'express';
const router = Router();

import {getUsers, createUser, deleteUser} from '../controllers/users.controller';

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)

module.exports = router;