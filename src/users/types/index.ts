import { Exclude, Expose } from 'class-transformer';

export class SerializedUser {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  email: string;

  @Exclude() // excludes password
  password: string;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
