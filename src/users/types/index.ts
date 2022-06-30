import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export class SerializedUser {
  id: number;
  username: string;
  email: string;

  @Exclude() // excludes password
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
