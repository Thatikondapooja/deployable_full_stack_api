import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Project } from './project/project.entity';
import { Lists } from './lists/lists.entity';
import { Cards } from './cards/cards.entity';
import { Role } from './roles/role.entity';
import { User } from './user/user.entity';
import { Otps } from './otp/otp.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Project, Lists, Cards, Role, User, Otps],
    migrations: ['src/migrations/*.ts'],
    synchronize: false, // IMPORTANT: must be false for migrations
});
