import { Request, Response } from 'express';

/**
 * Hello world function
 * @param req - Express request
 * @param res - Express response
 * @returns Express response
 */
export default async function handler(req: Request, res: Response): Promise<void> {
  res.status(200).json({ hello: 'world' });
}
