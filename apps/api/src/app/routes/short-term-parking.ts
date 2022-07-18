import { NextFunction, Request, Response, Router } from 'express';

import { ShortTermParking } from '@cefwm-angular/common';
import { collections } from '../services/db';
import { uuid } from 'uuidv4';
const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const vehicle_id = req.query.vehicle_id;
  const parkings: Array<ShortTermParking> = await collections.shortTermParkings
    .aggregate<ShortTermParking>([
      {
        $match: {
          vehicle_id,
        },
      },
      {
        $project: {
          _id: 1,
          valid_from: 1,
          valid_until: 1,
        },
      },
    ])
    .toArray();
  res.json(parkings);
  next();
});

router.post('/', async (req: Request, res: Response) => {
  const body: ShortTermParking = req.body;
  const result = await collections.shortTermParkings.insertOne({
    _id: uuid(),
    ...body,
  });

  res.json(result);
});

export default router;
