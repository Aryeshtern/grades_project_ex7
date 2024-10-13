import express from "express";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRouter";
import teacherRouter from "./routes/teacherRouter";
import authRouter from "./routes/authRouter";
import connectDB from "./services/db";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import options from "./utils/swaggerOptions";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3030;
dotenv.config();

// Swagger setup
const openapiSpecification = swaggerJsdoc(options);

// Middleware
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(cookieParser());
// Connect to MongoDB
connectDB();

app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/auth", authRouter); 



//app.use('/classes', classRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});