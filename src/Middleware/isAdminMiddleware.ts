import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { UserRole } from "../utils/enum";


export const isAdmin = (
    req: AuthRequest,
    res: Response,
    NextFunction: NextFunction
): void =>{
    if (!req.user || req.user.role !==UserRole.SUPERADMIN){
        res.status(403).json({error: 'only admin can perfrom this action'})
        return;
    }
    next();
};