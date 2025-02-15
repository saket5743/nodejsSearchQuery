import { Request, Response } from "express";

const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route does not exist' });
};

export default notFoundMiddleware;