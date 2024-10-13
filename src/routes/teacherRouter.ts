import { Router} from 'express'
import { addTecher } from '../controllers/TeacherController'

const router = Router()

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     tags: [Teacher]
 *     summary: Create a new post
 *     description: Adds a new post to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacher'
 *     responses:
 *       201:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: Bad request, invalid input.
*/
router.post('/', addTecher);

export default router;