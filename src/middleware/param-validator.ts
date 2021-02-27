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
    check('password', 'Your password must be at least 5 characters').isLength({ min: 5 }),
    check('firstName', 'Should contain firstName').notEmpty()
  ],

  retieveUser: [
    param('userId', "User id id missen in url path").notEmpty(),
    param('userId', "User id must be a number").isNumeric()
  ],

  retieveProduct: [
    param('productId', "Product id id missen in url path").notEmpty(),
    param('productId', "Product id must be a number").isNumeric()
  ],

  retieveCategory: [
    param('categoryId', "Product id id missen in url path").notEmpty(),
    param('categoryId', "Product id must be a number").isNumeric()
  ],


  retieveOrder: [
    param('orderId', "Order id id missen in url path").notEmpty(),
    param('orderId', "Order id must be a number").isNumeric()
  ],

  createCategory: [
    check('name', "A category must have a name").notEmpty()
  ],

  createProduct: [
    check('name', "A product must have a name").notEmpty(),
    check('categoryId', "Product must belong to a category").notEmpty(),
    check('categoryId', "Product must belong to a category").isNumeric(),
    check('price', "Product must have a price").notEmpty(),
    check('price', "Price Must me a number").isNumeric()
  ],

  createOrder: [
    check('status', "Order Mist have a status").notEmpty(),
    check('productId', "Order Mist have a prodcut Id and be an integer").notEmpty().isNumeric(),
    check('productQty', "Order must have a quantity and be an integer").notEmpty().isNumeric(),
    param('userId', "Order id missen in url path").exists().notEmpty()
  ],

  retieveUserOrders: [
    param('userId', "User id id missen in url path").notEmpty(),
    param('userId', "UserId must be a number").isNumeric(),
    query('status').custom( value => {
      if(!value || value == "") return  Promise.reject('Please provide status to retrive orders for');
      if(['complete', 'pending'].indexOf(value) < 0) return  Promise.reject('Please provide status a valid status [complete, pending]');
      return Promise.resolve()
    })
  ]
}