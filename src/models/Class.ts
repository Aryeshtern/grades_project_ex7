import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
    classname: string;
    students: Types.Array<Types.ObjectId>;
    teacher: Types.ObjectId;
}

const ClassSchema = new Schema({
    classname: {
        type: String,
        required: true,
        unique: true
    },
    students: [{
        type: Types.ObjectId,
        ref: "Student"
    }],
    teacher: {
        type: Types.ObjectId,
        ref: "Teacher"
    }
});

export default mongoose.model<IClass>("Class", ClassSchema);