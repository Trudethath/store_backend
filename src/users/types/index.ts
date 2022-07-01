import { Exclude, Expose } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export class SerializedUser {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  email: string;

  @Exclude() // excludes password
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
