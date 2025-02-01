import 'dotenv/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
});

async function truncateDatabase() {
  try {
    await dataSource.initialize();
    const connection = dataSource.createQueryRunner();
    await connection.connect();

    /*
    // List all tables in the DB
    const tables = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
    );
    console.log(tables);
    */

    // Truncate each table without foreign key error order
    await connection.startTransaction();

    console.log('Truncating table "token"');
    await connection.query('TRUNCATE TABLE token CASCADE');

    console.log('Truncating table "token_entity"');
    await connection.query('TRUNCATE TABLE token_entity CASCADE');

    console.log('Truncating table "token_price"');
    await connection.query('TRUNCATE TABLE token_price CASCADE');

    // console.log('Truncating table "token_price_entity"');
    // await connection.query('TRUNCATE TABLE token_price_entity CASCADE');

    console.log('Truncating table "transaction"');
    await connection.query('TRUNCATE TABLE transaction CASCADE');

    console.log('Truncating table "user"');
    await connection.query('TRUNCATE TABLE "user" CASCADE');

    console.log('Truncating table "user_balance"');
    await connection.query('TRUNCATE TABLE "user_balance" CASCADE');

    await connection.commitTransaction();
    await connection.release();
    console.log('Database truncated successfully!');
  } catch (error) {
    console.error(error);
  } finally {
    await dataSource.destroy();
  }
}

truncateDatabase();
