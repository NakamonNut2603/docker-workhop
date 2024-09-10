import { ParseBoolPipe } from "@nestjs/common";
import { Report } from "src/reports/report.entity";
import { User } from "src/users/user.entity";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [User, Report],
  synchronize: true,
};


   
const dataSource = new DataSource(dataSourceOptions);
   
export default dataSource;