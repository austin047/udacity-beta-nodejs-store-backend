import express from "express";
import userRouter from "./users";
import categoryRouter from "./categories";
import productRouter from "./product";
import orderRouter from "./order";

const apiRouter = express.Router();



apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", orderRouter);

export default apiRouter;
