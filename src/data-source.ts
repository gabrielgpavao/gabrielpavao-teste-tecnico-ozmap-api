import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';
import 'dotenv/config';

function dataSourceConfig (): DataSourceOptions {
	const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
	const databasePath: string = path.join(__dirname, '../database.db');

	const nodeEnv: string | undefined = process.env.NODE_ENV;


	if(nodeEnv === 'test'){
		return {
			type: 'sqlite',
			database: ':memory:',
			synchronize: true,
			entities: [entitiesPath]
		};
	}

	const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}');

	return {
		type: 'sqlite',
		database: databasePath,
		synchronize: false,
		logging: true,
		entities: [entitiesPath],
		migrations: [migrationsPath]
	};
}

export const AppDataSource: DataSource = new DataSource(dataSourceConfig());
