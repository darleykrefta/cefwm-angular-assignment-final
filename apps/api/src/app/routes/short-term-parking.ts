import { NextFunction, Request, Response, Router } from 'express';

import { ShortTermParking } from '@cefwm-angular/common';
import { collections } from '../services/db';
const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const vehicle_id = req.query.vehicle_id;
  const artigos: Array<ShortTermParking> = await collections.shortTermParkings
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
  res.json(artigos);
  next();
});

router.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params._id;
  const [parker]: Array<ShortTermParking> = await collections.shortTermParkings
    .aggregate<ShortTermParking>([
      {
        $match: {
          _id,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: 'vehicle',
          localField: 'vehicle_id',
          foreignField: '_id',
          as: 'vehicle',
        },
      },
      { $unwind: '$vehicle' },
      {
        $project: {
          _id: 1,
          valid_from: 1,
          valid_until: 1,
          vehicle: {
            _id: 1,
            brand: 1,
            model: 1,
            plate: 1,
          },
        },
      },
    ])
    .toArray();

  res.json(parker);

  next();
});

router.put('/:_id', async (req: Request, res: Response) => {
  const _id = req.params._id;
  const body: ShortTermParking = req.body;

  const result = await collections.shortTermParkings.findOneAndReplace(
    {
      _id,
    },
    body
  );
  res.json(result);
});

router.post('/', async (req: Request, res: Response) => {
  const body: ShortTermParking = req.body;
  const result = await collections.shortTermParkings.insertOne(body);
  res.json(result);
});

export default router;
