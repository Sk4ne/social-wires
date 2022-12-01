import { Router } from 'express';
import { addUser,deleteUser,getUser,getUsers, updateUser} from '../../controllers/userController'
import { validationExpress } from '../../middlewares/validatationExpress'

import { check } from 'express-validator';
import { login } from '../../controllers/auth';
import { validateJwt } from '../../middlewares/validateJwt';

const router:Router = Router();

/* 
 * Con express-validator verificamos que el usuario ingrese un email valido 
 * Que la contrasena tenga minimo cinco caracteres 
*/
router.post(
  '/user',[
  check('email','Email is not valid')
    .isEmail(),
  check('password')
    .isLength({min:5})
    .withMessage('Password must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('Must contain a number'),
    validationExpress
  ],addUser);

router
  .get('/users',validateJwt,getUsers)
  .get('/user/:id',getUser)
  .put('/user/:id',updateUser)
  .delete('/user/:id',deleteUser)
  /* login */
  .post('/user/login',login)



export default router;