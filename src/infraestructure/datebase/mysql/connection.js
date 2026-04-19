import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
    }
);

export const connectMysql = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Unable to connect to MySQL database:', error);
        process.exit(1);
    }
};

export default sequelize;
