import { NextFunction, Request, Response, Router } from 'express';

import { Vehicle } from '@cefwm-angular/common';
import { collections } from '../services/db';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.query.user_id;
  const artigos: Array<Vehicle> = await collections.vehicles
    .aggregate<Vehicle>([
      {
        $match: {
          user_id,
        },
      },
      {
        $unwind: {
          path: '$parkers',
        },
      },
      {
        $lookup: {
          from: 'short_term_parking',
          localField: 'parkers._id',
          foreignField: '_id',
          as: 'parkers',
        },
      },
      {
        $lookup: {
          from: 'user',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          brand: 1,
          model: 1,
          plate: 1,
          parkers: {
            $map: {
              input: '$parkers',
              as: 'parker',
              in: {
                _id: '$$parker._id',
                valid_from: '$$parker.valid_from',
                valid_until: '$$parker.valid_until',
              },
            },
          },
        },
      },
    ])
    .toArray();
  res.json(artigos);
  next();
});

router.get('/:_id', async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params._id;
  const user_id = req.query.user_id;
  const [vehicle]: Array<Vehicle> = await collections.vehicles
    .aggregate<Vehicle>([
      {
        $match: {
          _id,
          user_id,
        },
      },
      {
        $limit: 1,
      },
      {
        $unwind: {
          path: '$parkers',
        },
      },
      {
        $lookup: {
          from: 'short_term_parking',
          localField: 'parkers._id',
          foreignField: '_id',
          as: 'parkers',
        },
      },
      {
        $project: {
          _id: 1,
          brand: 1,
          model: 1,
          plate: 1,
          parkers: {
            $map: {
              input: '$parkers',
              as: 'parker',
              in: {
                _id: '$$parker._id',
                valid_from: '$$parker.valid_from',
                valid_until: '$$parker.valid_until',
              },
            },
          },
        },
      },
    ])
    .toArray();

  res.json(vehicle);

  next();
});

router.put('/:_id', async (req: Request, res: Response) => {
  const _id = req.params._id;
  const body: Vehicle = req.body;

  const result = await collections.vehicles.findOneAndReplace(
    {
      _id,
    },
    body
  );
  res.json(result);
});

router.post('/', async (req: Request, res: Response) => {
  const body: Vehicle = req.body;
  const result = await collections.vehicles.insertOne(body);
  res.json(result);
});

export default router;
