import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

//  כל אחד וסוגוrank  אני מגדיר קולקציה שמחזיקה גם מורים וגם סטודנטים כל אחד בסכמה אחרת שהמשותף שלהם זה השדה 
const options = { 
    timestamps: true,
    discriminatorKey: "rank",
    collection: "users",
    useFindAndModify: false,
    autoCreate: true,
}

//הגדת אינטרפייסים
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    rank: "student" | "teacher";
    class?: Types.ObjectId;
    comparePassword(userPassword: string): Promise<boolean>;
}

export interface IGrade extends Document {
    examname: string;
    grade: number;
    comment: string;
}

export interface Student extends IUser {
    grades: IGrade[];
}

export interface Teacher extends IUser {
}

// סכמות
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        validate: [validator.isAlphanumeric, "Username can only contain alphanumeric characters."],
        minlength: [3, "Username must be at least 3 characters long."],
        maxlength: [20, "Username must be at most 20 characters long."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        validate: [validator.isEmail, "Invalid email format."],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 characters long."],
        select: false
    },
    rank: {
        type: String,
        required: true,
        enum: ["student", "teacher"]
    }
}, options);

// טיפול בהצפנת וקריאת הסיסמא הקיימת בבכמה הזאת
userSchema.pre<IUser>("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function(userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password);
};



const thcherSchema: Schema = new Schema ({
});

const gradeSchema: Schema = new Schema({
    examname: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    }
});

const studentSchema: Schema = new Schema({
    grades: {
        type: [gradeSchema],
        default: []
    }
});

// ייצוא המודלים
const User = mongoose.model<IUser>("User", userSchema);
export const Teacher = User.discriminator<Teacher>("teacher", thcherSchema)
export const Student = User.discriminator<Student>("Student", studentSchema);

export default User;




