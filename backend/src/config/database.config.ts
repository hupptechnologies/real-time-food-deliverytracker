import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const config: DataSourceOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '5432', 10),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	logging: false,
	entities: [path.join(__dirname, '../modules/**/*.entity{.ts,.js}')],
	migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
	subscribers: [],
};

export const AppDataSource = new DataSource(config);
