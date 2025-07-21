import Router from "express";
import { login, signup } from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.post('/sign-up', signup);
userRoutes.post('/log-in', login);

export default userRoutes;