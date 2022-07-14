import { Request, Response, Router } from 'express';

import { collections } from '../services/db';
const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const body: { email: string; password: string } = req.body;
  const results = await collections.users.findOne({
    email: body.email,
    password: body.password,
  });

  if (results) {
    delete results.password;
    res.json(results);
  } else {
    res.status(400).send();
  }
});

export default router;
