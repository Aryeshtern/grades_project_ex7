import { Request, Response } from 'express';
import * as teacherServices from '../services/teacherServices';
import UserDetailes from '../dto/userDetailes'

export const addTecher = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email, className} = req.body;
    const newTeacher: UserDetailes = {
        username,
        email,
        password
    }
    await teacherServices.AddTeacherDB(newTeacher, className);
    res.status(201).send(newTeacher);
}