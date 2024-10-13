import {Teacher, Student, IGrade} from "../models/User";
import Class from "../models/Class";
import UserDetailes from "../dto/userDetailes";

export const AddTeacherDB = async (user: UserDetailes, name:string) => {
    const newClass = new Class({
        classname: name
    });
    const newTeacher = new Teacher({
        username: user.username,
        email: user.email,
        password: user.password,
        class: newClass._id
    });
    await newTeacher.save();
    newClass.$set("teacher", newTeacher);
    console.log(newTeacher);
    await newClass.save();
    return newTeacher;
}

export const addGradeDB = async (_id: string, grade: IGrade) =>{
    const student = await Student.findById(_id);
    if (!student) {
      throw new Error("Student not found");
    }
    student.updateOne({
        $push: { grades: grade },
      });
    await student.save();
    return student;

}

