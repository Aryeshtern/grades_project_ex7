import jwt from "jsonwebtoken";

export const generateToken = (userId: string, userRank: string): string => {
  return jwt.sign({ userId , userRank}, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
