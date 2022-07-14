import { Collection, Db, MongoClient } from 'mongodb';

import { User } from '@cefwm-angular/common';

import configs from '../configs';

const collections: { users?: Collection<User> } = {};

async function connectToDatabase() {
  const client: MongoClient = await MongoClient.connect(configs.db.host);
  const db: Db = client.db(configs.db.database);

  collections.users = db.collection<User>('user');

  console.log('Connected at MongoDB');
}

export { collections, connectToDatabase };
