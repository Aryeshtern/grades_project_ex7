import { Router } from 'express';
import { addStudent} from '../controllers/studentController';
import { errorHendler} from '../middelware/errorMiddleware'

const router = Router();

/**
 * @swagger
 * /students:
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

router.post('/', errorHendler(addStudent));

export default router;