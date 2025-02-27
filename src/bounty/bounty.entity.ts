import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('bounty')
export class BountyEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  chainId: number;

  @Column()
  title: string;

  @Column()
  value: number;

  @Column()
  bountyScore: number;

  @Column()
  creatingUsername: string;

  @Column({ nullable: true })
  fillingUserId: string;

  @ManyToOne(() => UserEntity, (user) => user.bounties)
  fillingUser: UserEntity;

  @Column({ nullable: true })
  filled: Date;

  @Column({ nullable: true })
  tweetId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
