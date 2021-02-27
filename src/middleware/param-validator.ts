import { Request, Response, NextFunction} from 'express';
import {
  StatusCodes,
} from 'http-status-codes';
import {check, validationResult, ValidationChain, param, query} from 'express-validator';


export const validateRequestParams = (validations: Array<ValidationChain>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

      try {
        await Promise.all(validations.map((err) => err.run(req)))

        const result = validationResult(req);
        if (!result.isEmpty()) {
           return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() });
         } else {
           next()
         }
      } catch(e) {
        console.log(e)
        next(e)
      }

      
    }
  }

export const  ParamValidation =  {
  createUser: [
    check('password', 'Your password must be at least 5 characters').isLength({ min: 6 }),
    check('firstName', 'Should contain firstName').notEmpty()
  ],

  createCategory: [
    check('name', "A category must have a name").notEmpty()
  ],

  createProduct: [
    check('name', "A product must have a name").notEmpty(),
    check('categoryId', "Product must belong to a category").notEmpty(),
    check('price', "Product must have a price").notEmpty(),
    check('price', "Price Must me a number").isNumeric()
  ],

  createOrder: [
    check('status', "Order Mist have a status").notEmpty(),
    check('productId', "Order Mist have a prodcut Id").notEmpty().isNumeric(),
    check('productQty', "Order must have a quantity").notEmpty().isNumeric(),
    param('userId', "Order id missen in url path").exists().notEmpty()
  ],

  retieveUserOrders: [
    param('userId', "Order id missen in url path").notEmpty(),
    query('status').custom( value => {
      if(!value || value == "") return  Promise.reject('Please provide status to retrive orders for');
      if(['complete', 'pending'].indexOf(value) < 0) return  Promise.reject('Please provide status a valid status [complete, pending]');
      return Promise.resolve()
    })
  ]
}