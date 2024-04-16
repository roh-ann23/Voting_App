
import express from 'express'
const router = express.Router();
import {signUpUser,signInUser,getProfile,updateUser} from '../controllers/userController.js'
import {jwtAuthMiddleware} from '../middlewares/jwt.js'


// register
router.post('/signup', signUpUser)

// login
router.post("/login",  signInUser);

// getProfile
router.get('/profile', jwtAuthMiddleware, getProfile)

// Update User
router.put("/profile/password", jwtAuthMiddleware, updateUser);

export default router;