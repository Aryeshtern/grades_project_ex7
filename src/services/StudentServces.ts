import UserDetailes from "../dto/userDetailes";
import * as classServces from "../services/classServices";
import User, { IGrade, Student } from "../models/User";
import Class from "../models/Class";

export const addstudentDB = async (
  student: UserDetailes,
  className: string
) => {
  const requestedClass = await classServces.GetClassByNameDB(className);
  if (!requestedClass) {
    throw new Error("Class not found");
  }
  const newStudent = new Student({
    username: student.username,
    email: student.email,
    password: student.password,
    class: requestedClass._id,
  });

  requestedClass.updateOne({
    $push: { students: newStudent._id },
  })

  await requestedClass.save();
  await newStudent.save();
  return newStudent;
};


