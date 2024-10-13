import UserDetailes from '../dto/userDetailes';
import { IUser } from '../models/User';
import * as studentServices from '../services/StudentServces';
import {Request, Response} from 'express';

export const addStudent = async (req: Request, res: Response): Promise<void> => {
    const {username, email, password, classNmae} = req.body;
    const newStudent: UserDetailes = {
        username,
        email,
        password,
    };
    await studentServices.addstudentDB(newStudent, classNmae);
    res.status(201).send(newStudent);
}
