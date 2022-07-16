import { Request, Response, Router } from 'express';

import * as jsonWebToken from 'jsonwebtoken';

import { collections } from '../services/db';
const router = Router();

export const JWT_SECRET_KEY = 'abc';

router.post('/', async (req: Request, res: Response) => {
  const body: { email: string; password: string } = req.body;
  const results = await collections.users.findOne({
    email: body.email,
    password: body.password,
  });

  if (results) {
    delete results.password;
    res.json({
      ...results,
      token: jsonWebToken.sign(results, JWT_SECRET_KEY, {
        expiresIn: '10m',
      }),
    });
  } else {
    res.status(400).send();
  }
});

export default router;
