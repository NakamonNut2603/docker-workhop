const dbConfig = {
    host: 'localhost',
    username: 'root',
    password: '12345',
    database: 'sirisoft',
    synchronize: true
}

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'mysql',
            entities: ['**/*entity.js'],
            port: 3306
        } )
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'mysql',
            entities: ['**/*entity.ts'],
            port: 3307
        })
        break;
    case 'production':
        break;
    default:
        throw new Error('Unknow environment')
}

module.exports = dbConfig;