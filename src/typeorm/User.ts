import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: true,
    default: '',
  })
  address1!: string;

  @Column({
    nullable: true,
    default: '',
  })
  address2!: string;

  @Column({
    nullable: true,
    default: '',
  })
  city!: string;

  @Column({
    nullable: true,
    default: '',
  })
  stateOrProvince!: string;

  @Column({
    nullable: true,
    default: '',
  })
  zipOrPostalCode!: string;

  @Column({
    nullable: true,
    default: '',
  })
  country!: string;

  @Column({ nullable: true })
  created_at: string;
  @Column({ nullable: true })
  updated_at: string;
}
