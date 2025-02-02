import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  FindOptionsRelations,
  FindOptionsSelect,
  In,
  Repository,
} from 'typeorm';
import { TweetEntity } from './tweet.entity';
import { ConfigService } from '@nestjs/config';
import { getTweetData } from 'src/common/helpers/twitter/utils';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly tweetRepository: Repository<TweetEntity>,
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
    where: FindOptionsWhere<TweetEntity> | FindOptionsWhere<TweetEntity>[],
    relations?: FindOptionsRelations<TweetEntity>,
    select?: FindOptionsSelect<TweetEntity>,
  ): Promise<TweetEntity> {
    return this.tweetRepository.findOne({
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
    where: FindOptionsWhere<TweetEntity> | FindOptionsWhere<TweetEntity>[],
    relations?: FindOptionsRelations<TweetEntity>,
    select?: FindOptionsSelect<TweetEntity>,
  ): Promise<TweetEntity[]> {
    return this.tweetRepository.find({
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
    return this.tweetRepository.findBy({
      id: In(ids),
    });
  }

  async getAllTweets() {
    return this.tweetRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Create a transaction
   * @param transaction
   * @returns UserEntity
   * @throws QueryFailedError if transaction creation fails
   */
  create(transaction: Partial<TweetEntity>): TweetEntity {
    return this.tweetRepository.create(transaction);
  }

  /**
   * Save/Update a transaction
   * @param transaction
   * @returns Promise<UserEntity>
   * @throws QueryFailedError if transaction update fails
   */
  async save(transaction: TweetEntity): Promise<TweetEntity> {
    return this.tweetRepository.save(transaction);
  }

  /**
   * Delete a transaction
   * @param id
   * @returns Promise<DeleteResult>
   * @throws QueryFailedError if transaction not found
   */
  async delete(id: string) {
    return this.tweetRepository.delete({ id });
  }

  async verifyTweet(tweetId: string, requiredBountyScore: number) {
    const tweetData = await getTweetData(tweetId);
    const bountyScore =
      tweetData.likes +
      tweetData.retweets +
      tweetData.comments +
      tweetData.bookmarks;

    return {
      isVerified: requiredBountyScore <= bountyScore,
      tweetData,
    };
  }
}
