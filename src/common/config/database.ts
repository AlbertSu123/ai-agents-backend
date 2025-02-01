import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DatabaseConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get('databaseUrl'),
    autoLoadEntities: true,
    cache: {
      type: 'database',
      tableName: 'query_result_cache',
    },
    synchronize: false, // configService.get('env') !== 'main',
  }),
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

export const DatabaseModule = () => {
  return DatabaseConfig;
};
