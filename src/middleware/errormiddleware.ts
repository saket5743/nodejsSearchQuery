import { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(500).json({ msg: "Internal Server Error, Please Try Again" })
};

export default errorHandlerMiddleware;