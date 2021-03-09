import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import {
    ReasonPhrases,
    StatusCodes,
} from 'http-status-codes';

const secret: Secret = process.env.SECRET_KEY as string;

/**
 * 
 * @param payload - User object to decode for token
 * @description - use user object to decode user and return token
 */
export const createAuthToken = ((payload: Object): string => jwt.sign(payload, secret, { expiresIn: '7d' }));

/**
 * 
 * @param req - RequestBody
 * @param res - ResponseBody
 * @param next - NextMiddlwareFunction@param
 * @description - Verify if user token is valid
 */
export const validateToken = (req: Request, res: Response, next: NextFunction): NextFunction | Response |  void => {
  const authorizationHeader = req.headers.authorization 
  

  if (!authorizationHeader) return res.status(StatusCodes.FORBIDDEN).json({message: ReasonPhrases.FORBIDDEN})
  
  const token = authorizationHeader.split(' ')[1]
  
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

