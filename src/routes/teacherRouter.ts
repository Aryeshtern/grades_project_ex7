import { Router} from 'express'
import { addTecher } from '../controllers/TeacherController'
import { errorHendler} from '../middelware/errorMiddleware'

const router = Router()

/**
 * @swagger
 * /teachers:
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
router.post('/', errorHendler(addTecher));

export default router;