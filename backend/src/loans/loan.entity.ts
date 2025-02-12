import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  status: string; // Por ejemplo: 'pending', 'approved', 'rejected'

  @ManyToOne(() => User, (user) => user.loans)
  user: User;
}