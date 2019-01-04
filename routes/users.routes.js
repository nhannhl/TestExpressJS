import { Router } from 'express';
import Validate from 'express-validation';
import UserController from '../controllers/users.controller';
import UserValidate from '../validators/user.validator';

const router = new Router();

router.get('/users', UserController.getAll);
router.get('/users/:id', [Validate(UserValidate.paramIdUser)], UserController.getUserById);
router.post('/users', [Validate(UserValidate.postDataUser)] , UserController.addUser);
router.put('/users/:id', [Validate(UserValidate.postDataUser), 
    Validate(UserValidate.paramIdUser)], UserController.updateUser);
router.delete('/users/:id', [Validate(UserValidate.paramIdUser)], UserController.deleteUser);
router.get('/users/search/:name', [Validate(UserValidate.paramNameUser)], UserController.getUserByName);
router.get('/users/search/regex/:name', [Validate(UserValidate.paramNameUser)], UserController.getUserByRegexName);
router.get('/users/testPopulate', UserController.testPopulate);

export default router;
