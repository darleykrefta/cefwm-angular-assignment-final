import { NextFunction, Request, Response, Router } from 'express';

import { Vehicle } from '@cefwm-angular/common';
import { collections } from '../services/db';
import { uuid } from 'uuidv4';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const user_id = req.query.user_id;
  const vehicles: Array<Vehicle> = await collections.vehicles
    .aggregate<Vehicle>([
      {
        $match: {
          user_id,
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
        },
      },
    ])
    .toArray();
  res.json(vehicles);
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
        $project: {
          _id: 1,
          brand: 1,
          model: 1,
          plate: 1,
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
  const result = await collections.vehicles.insertOne({ _id: uuid(), ...body });
  res.json(result);
});

export default router;
