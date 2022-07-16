import { Collection, Db, MongoClient } from 'mongodb';

import { ShortTermParking, User, Vehicle } from '@cefwm-angular/common';

import configs from '../configs';

const collections: {
  users?: Collection<User>;
  shortTermParkings?: Collection<ShortTermParking>;
  vehicles?: Collection<Vehicle>;
} = {};

async function connectToDatabase() {
  const client: MongoClient = await MongoClient.connect(configs.db.host);
  const db: Db = client.db(configs.db.database);

  collections.users = db.collection<User>('user');
  collections.shortTermParkings =
    db.collection<ShortTermParking>('short_term_parking');
  collections.vehicles = db.collection<Vehicle>('vehicle');

  console.log('Connected at MongoDB');
}

export { collections, connectToDatabase };
