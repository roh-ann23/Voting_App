
import express from 'express'
const router = express.Router();
import {signUpUser,signInUser,getProfile,updateUser} from '../controllers/userController.js'
import {jwtAuthMiddleware} from '../middlewares/jwt.js'



/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - address
 *        - adharCardNumber
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: The name of the user
 *        age:
 *          type: number
 *          description: The age of the user
 *        email:
 *          type: string
 *          description: The email address of the user
 *        mobile:
 *          type: string
 *          description: The mobile phone number of the user
 *        address:
 *          type: string
 *          description: The home address of the user
 *        adharCardNumber:
 *          type: number
 *          description: The Aadhar card number of the user, must be unique
 *        password:
 *          type: string
 *          description: The password for the user's account, must be secure
 *        role:
 *          type: string
 *          enum:
 *            - voter
 *            - admin
 *          default: voter
 *          description: The role of the user
 *        isVoted:
 *          type: boolean
 *          default: false
 *          description: Indicates whether the user has voted
 *      example:
 *        name: John Doe
 *        age: 30
 *        email: john.doe@gmail.com
 *        mobile: 123-456-7890
 *        address: 123 Main St, Springfield
 *        adharCardNumber: 123456789012
 *        password: mysecurepassword
 * 
 */


/**
 *  @swagger
 *  tags:
 *    name: User 
 *    description: User apis
 */


// register
/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. The request payload is invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.post('/signup', signUpUser)

// login

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized. Invalid credentials provided.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.post("/login",  signInUser);


// getProfile
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */
router.get('/profile', jwtAuthMiddleware, getProfile)

// Update User
/**
 * @swagger
 * /user/profile/password:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request. The request payload is invalid.
 *       401:
 *         description: Unauthorized. Access token is missing or invalid.
 *       500:
 *         description: Internal server error. Something went wrong on the server side.
 */

router.put("/profile/password", jwtAuthMiddleware, updateUser);

export default router;