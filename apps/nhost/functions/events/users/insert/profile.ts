import { Request, Response } from 'express';
import { sdk } from '../../../_lib/graphql-client';

/**
 *
 * @param req - Express request
 * @param res - Express response
 * @returns void
 */
export default async function handler(req: Request, res: Response): Promise<void> {
  const { body } = req;

  const { user } = await sdk.GetUser({
    id: body.event.data.new.id,
  });

  // check if the user exists
  if (!user) {
    return res.status(400).send('User not found');
  }

  // insert profile into database
  await sdk.InsertProfile({
    profile: {
      id: user.id,
    },
  });

  res.sendStatus(204);
}
