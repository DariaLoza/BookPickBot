const{Sequelize} = require('sequelize')

module.exports = new Sequelize(
    "BookPick", // название базы данных
    "postgres", // имя пользователя
    "databaseloza",// пароль
    {
        dialect: "postgres",
        host: "localhost",
        port: 5432,
    }
)
//First press win key+R Search for services.msc A window will open in that find postgresql-x64-13 and open that, in that tab click start option For me its works perfectly