import { Request, Response } from 'express';
import * as teacherServices from '../services/teacherServices';
import UserDetailes from '../dto/userDetailes'
import { authRequest } from '../middelware/authMiddelware';

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

export const addGrade = async (req: authRequest, res: Response): Promise<void> => {
    if(!req.user || req.user.userRank !== "Teacher") {
        res.status(403).send("Access denied. Only teachers can add grades.");
        return;
    }
    const grade = req.body;
    const studentId = req.params.studentId;
    const updatedGrades = await teacherServices.addGradeDB(studentId, grade);
    res.status(201).send(updatedGrades);
}

