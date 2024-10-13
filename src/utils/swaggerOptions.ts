import { Schema } from "mongoose";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Grades Prodject",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Teacher: {
          type: "object",
          require: true,
          properties: {
            username: {
              type: String,
            },
            email: { type: String },
            class: {
                type: Schema.Types.ObjectId,
                ref: "Class",
            }
          },
        },
        CreateUser: {
          type: "object",
          properties: {
            username: {
              type: "string",
              required: true,
            },
            email: {
              type: "string",
              format: "email",
              required: true,
            },
            password: {
              type: "string",
              minLength: 8,
              required: true,
            },
           className:
            {
              type: "string",
              required: true,
            },
          },
        },
        Student: {
            type: "object",
            properties: {
              username: {
                type: "string",
                required: true,
              },
              email: {
                type: "string",
                format: "email",
                required: true,
              },
              class: {
                type: Schema.Types.ObjectId,
                ref: "Class",
              },
              grades:{
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    exsmname: { type: "string" },
                    grade: { type: "number" },
                    comment: {type: "string"}
                  },
                },
              }
            },
          },
        }
      },
    },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  apis: ["./src/routes/*.ts"],
};

export default options;
