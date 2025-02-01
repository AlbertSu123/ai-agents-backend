import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  FindOptionsRelations,
  FindOptionsSelect,
  In,
  Repository,
} from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { BountyEntity } from './bounty.entity';

@Injectable()
export class BountyService {
  constructor(
    @InjectRepository(BountyEntity)
    private readonly bountyRepository: Repository<BountyEntity>,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  /**
   * Get transaction by id, load relations.
   * @param id
   * @param relations
   * @param select
   * @returns Promise<UserEntity>
   * @throws EntityNotFoundError if user not found
   * @throws FindRelationsNotFoundError if relations are invalid
   */
  async get(
    where: FindOptionsWhere<BountyEntity> | FindOptionsWhere<BountyEntity>[],
    relations?: FindOptionsRelations<BountyEntity>,
    select?: FindOptionsSelect<BountyEntity>,
  ): Promise<BountyEntity> {
    return this.bountyRepository.findOne({
      where,
      relations,
      select,
    });
  }

  /**
   * Get transactions by ids, load relations.
   * @param id
   * @param relations
   * @param select
   * @returns Promise<UserEntity>
   * @throws EntityNotFoundError if transaction not found
   * @throws FindRelationsNotFoundError if relations are invalid
   */
  async getMany(
    where: FindOptionsWhere<BountyEntity> | FindOptionsWhere<BountyEntity>[],
    relations?: FindOptionsRelations<BountyEntity>,
    select?: FindOptionsSelect<BountyEntity>,
  ): Promise<BountyEntity[]> {
    return this.bountyRepository.find({
      where,
      relations,
      select,
    });
  }

  /**
   * Get all users.
   * @param ids
   * @returns Promise<UserEntity[]>
   */
  async getManyByIds(ids: string[]) {
    return this.bountyRepository.findBy({
      id: In(ids),
    });
  }

  /**
   * Create a transaction
   * @param transaction
   * @returns UserEntity
   * @throws QueryFailedError if transaction creation fails
   */
  create(transaction: Partial<BountyEntity>): BountyEntity {
    return this.bountyRepository.create(transaction);
  }

  /**
   * Save/Update a transaction
   * @param transaction
   * @returns Promise<UserEntity>
   * @throws QueryFailedError if transaction update fails
   */
  async save(transaction: BountyEntity): Promise<BountyEntity> {
    return this.bountyRepository.save(transaction);
  }

  /**
   * Delete a transaction
   * @param id
   * @returns Promise<DeleteResult>
   * @throws QueryFailedError if transaction not found
   */
  async delete(id: number) {
    return this.bountyRepository.delete(id);
  }
}
