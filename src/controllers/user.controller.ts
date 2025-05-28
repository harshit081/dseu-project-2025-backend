import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'Alice' }]);
};
