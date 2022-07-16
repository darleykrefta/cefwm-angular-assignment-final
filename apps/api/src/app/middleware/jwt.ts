import { expressjwt } from 'express-jwt';

import { JWT_SECRET_KEY } from '../routes/auth';

export const requireJwtToken = expressjwt({
  secret: JWT_SECRET_KEY,
  algorithms: ['HS256'],
});
