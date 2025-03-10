// 3 es el router.ts
import { Router } from "express";
import { createAccount, getUser, getYUserByHandle, login, searchByHandle, updateProfile, uploadImage } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./midleware/validation";
import { authenticate } from "./midleware/auth";

const router = Router()
 

// autenticacion y registro
// http://localhost:4000/api/auth/register
router.post('/auth/register',
    body('handle').notEmpty().withMessage('handle vacio'),
    body('name').notEmpty().withMessage('nombre vacio'),
    body('email').isEmail().withMessage('email incorrecto'),
    body('password').isLength({min:8}).withMessage('password vacio o muy corto minimo 8 caracteres'),
    handleInputErrors,
    createAccount)
/*router.post('/auth/register', async (req, res) => {
    // desde modelo se puede realiar el create
    //1 forma await User.create(req.body) 
    //2 forma
    const user = new User(req.body)
    await user.save()
    // se tiene que finalizar
    res.send('procesado');
    // res.json({msg: 'uusario creado'})
})*/

router.post('/auth/login', 
    body('email').isEmail().withMessage('email incorrecto'),    
    body('password').notEmpty().withMessage('password incorrecto'),
    handleInputErrors,
    login)

router.get('/user', authenticate, getUser)

router.patch('/user', 
    body('handle').notEmpty().withMessage('handle vacio'),
    handleInputErrors,
    authenticate, 
    updateProfile)

router.post('/user/image',authenticate,uploadImage)

router.get('/:handle', getYUserByHandle )
router.post('/search', 
    body('handle').notEmpty().withMessage('el handle es obligartorio'),
    handleInputErrors,
    searchByHandle)
export default router;
