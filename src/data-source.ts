import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

function dataSourceConfig (): DataSourceOptions {
	const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}');
	const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}');
	const databasePath: string = path.join(__dirname, '../database.db');

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
