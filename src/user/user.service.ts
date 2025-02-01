import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  FindOptionsRelations,
  FindOptionsSelect,
  In,
  Repository,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
    relations?: FindOptionsRelations<UserEntity>,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity> {
    return this.userRepository.findOne({
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
    where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
    relations?: FindOptionsRelations<UserEntity>,
    select?: FindOptionsSelect<UserEntity>,
  ): Promise<UserEntity[]> {
    return this.userRepository.find({
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
    return this.userRepository.findBy({
      id: In(ids),
    });
  }

  /**
   * Create a transaction
   * @param transaction
   * @returns UserEntity
   * @throws QueryFailedError if transaction creation fails
   */
  create(transaction: Partial<UserEntity>): UserEntity {
    return this.userRepository.create(transaction);
  }

  /**
   * Save/Update a transaction
   * @param transaction
   * @returns Promise<UserEntity>
   * @throws QueryFailedError if transaction update fails
   */
  async save(transaction: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(transaction);
  }

  /**
   * Delete a transaction
   * @param id
   * @returns Promise<DeleteResult>
   * @throws QueryFailedError if transaction not found
   */
  async delete(id: string) {
    return this.userRepository.delete({ id });
  }
}
