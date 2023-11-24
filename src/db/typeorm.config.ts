import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.NODE_ENV === 'development' ? 'db.sqlite' : 'test.sqlite',
    entities: process.env.NODE_ENV === 'development' ? ['dist/**/*.entity.js'] : ['./src/**/*.entity.ts'],
    synchronize: false,
    migrations: ['./src/db/migrations/*.ts'],
    migrationsTableName: 'migrations',
    migrationsRun: process.env.NODE_ENV == 'test'
};


   
const dataSource = new DataSource(dataSourceOptions);
   
export default dataSource;