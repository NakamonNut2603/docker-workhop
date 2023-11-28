import { ParseBoolPipe } from "@nestjs/common";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: process.env.NODE_ENV === 'development' ? ['dist/**/*.entity.js'] : ['./src/**/*.entity.ts'],
    synchronize: true
};


   
const dataSource = new DataSource(dataSourceOptions);
   
export default dataSource;