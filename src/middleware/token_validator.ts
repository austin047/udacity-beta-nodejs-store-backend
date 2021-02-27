import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';

const secret: Secret = process.env.SECRET_KEY as string;

export const createAuthToken = ((payload: Object): string => jwt.sign(payload, secret, { expiresIn: '7d' }));

export const validateToken = (req: Request, res: Response, next: NextFunction): NextFunction | Response |  void => {
    const token = req.headers.authorization
  
    if (!token || token == "") {
      return res.status(StatusCodes.FORBIDDEN).json({
          message: ReasonPhrases.FORBIDDEN
      })
    }
  
    if (token) {
      let decoded;
  
      try {
        decoded = jwt.verify(token, secret)
        return next();

      } catch (error) {

        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: StatusCodes.UNAUTHORIZED
        })

      }
      
    };
  };