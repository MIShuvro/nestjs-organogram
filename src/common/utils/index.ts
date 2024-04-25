import { Request } from 'express';

export function concatObject(obj: Object, separator: string = ', ') {
  return Object.keys(obj)
    .map(function(key, index) {
      return obj[key];
    })
    .join(separator);
}

import { hashSync, compare } from 'bcryptjs';

export function hashPassword(text: string): string {
  return hashSync(text, 12);
}

export function comparePassword(hashPassword: string, plainPassword: string): Promise<boolean> {
  return compare(plainPassword, hashPassword);
}

export interface jwtPayload {
  iss: string;
  subscriber: number;
}

export interface SessionRequest extends Request {
  user: jwtPayload;

}
