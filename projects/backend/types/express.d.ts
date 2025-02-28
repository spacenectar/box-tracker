import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with a proper User type if possible
}
