import { Router } from "express";
import { login } from "../controllers/authController";
import { errorHendler } from "../middelware/errorMiddleware";
import { addTecher } from '../controllers/TeacherController'
import { addStudent} from '../controllers/studentController';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: User login
 *     description: Log in a user with username and password to receive a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "securePassword123"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Login success message
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       400:
 *         description: Bad request, invalid input
 *       401:
 *         description: Unauthorized, invalid credentials
 */

router.post("/login", login);

/**
 * @swagger
 * /auth/teachers:
 *   post:
 *     tags: [Teacher]
 *     summary: Create a new teacher
 *     description: Adds a new teacher to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: teacher created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Bad request, invalid input.
*/
router.post('/teachers', errorHendler(addTecher));

/**
 * @swagger
 * /auth/students:
 *   post:
 *     tags: [Students]
 *     summary: Create a new student
 *     description: Adds a new student to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: Student created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad request, invalid input.
*/

router.post('/students', errorHendler(addStudent));


export default router;
