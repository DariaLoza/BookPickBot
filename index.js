const TelegramApi = require("node-telegram-bot-api");
const{filtersOptions, ColourOptions, WeatherOptions, SentimentOptions, CloudOptions, AnotherColorOption,
    AnotherWeatherOption, AnotherSentimentOption, SeeMoreOption, AnotherColorOptionBLack, AnotherColorOptionRed,
    AnotherColorOptionYellow, AnotherColorOptionBlue, AnotherColorOptionGrey, AnotherColorOptionPink,
    AnotherColorOptionBrown, AnotherColorOptionGreen, AnotherColorOptionWhite,AnotherWeatherOptionSunny,AnotherWeatherOptionCloudy,AnotherSentimentOptionPositive,AnotherSentimentOptionNegative,
    AnotherWeatherOptionCold,AnotherWeatherOptionSunny10,AnotherWeatherOptionSunny30,AnotherWeatherOptionSunny60,AnotherWeatherOptionSunny80,AnotherSentimentOptionNegative20,AnotherSentimentOptionNegative30,
    AnotherSentimentOptionNegative50, AnotherSentimentOptionNegative70, AnotherSentimentOptionNegative80,
} = require("./options");
const sequelize = require('./db');
const Models = require("./models/models");
const {where, json, STRING} = require("sequelize");
const {Book_Info} = require("./models/models");
const {verbose} = require("nodemon/lib/config/defaults");


const bot = new TelegramApi(token,{polling:true});


const start = async arrayLike => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log("Подключение к бд сломалось:(")
    }


    await bot.setMyCommands([
        {command: '/start', description: 'Привет!'},
        {command: '/info', description: 'О проекте'},
        {command: '/filters', description: 'Фильтры'},
        {command: '/info_filters', description: "О технологии"},
        {command: '/read', description: "Где почитать книги?"}
    ])

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/4a9/d2e/4a9d2ea3-b927-4caf-8998-b689ab3a59e8/2.webp")
                return bot.sendMessage(chatId, "Добро пожаловать в телеграм бот проекта BookPick")
            }
            if (text === '/info') {
                await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/4a9/d2e/4a9d2ea3-b927-4caf-8998-b689ab3a59e8/3.webp")
                return bot.sendMessage(chatId, "Наша команда занимается проектами в области цифровых гуманитарных исследований. Сейчас мы работаем над проектом BookPick. Мы считаем, что фильтры, которые используются сейчас для выбора книг однообразные и чаще всего основаны на анализе действий пользователя. Мы предлагаем анализировать не пользователя, а книги, дать возможность читателю по-новому посмотреть на знакомые произведения и сделать свой выбор.На нашем ресурсе можно фильтровать книги по самым часто встречающимся цветам и погоде в тексте, а также общему настроению книги. Для создания фильтров мы используем алгоритмы машинного обучения.")
            }
            if (text === '/info_filters') {
                return bot.sendMessage(chatId, "Фильтр настроение в книге разработан на основе анализа тональности текста. C помощью этого можно узнать насколько текст положительно или негативно окрашен. Стоит отметить, что этот фильтр не показывает смысловую нагрузку текста, это скорее оценка самим автором событий происходящих в повествовании. Остальные фильтры основаны на методах NLP, это цвета и погода, которые чаще всего попадаются в тексте.")
            }
            if (text === '/read') {
                await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/4a9/d2e/4a9d2ea3-b927-4caf-8998-b689ab3a59e8/1.webp")
                return bot.sendMessage(chatId, "Книги можно почитать здесь: https://pl.spb.ru")
            }
            if (text === '/filters') {
                await bot.sendMessage(chatId, "Выбери параметры", filtersOptions)
            } else return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй использовать команды")


        } catch (e) {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/4a9/d2e/4a9d2ea3-b927-4caf-8998-b689ab3a59e8/5.webp")
            return bot.sendMessage(chatId, "Произошла ошибка")
        }
    })


    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === 'colour') {
            return bot.sendMessage(chatId, "Выбери цвет", ColourOptions)
        }
        if (data === 'weather') {
            return bot.sendMessage(chatId, "Выбери погоду", WeatherOptions)
        }
        if (data === 'sentiment') {
            return bot.sendMessage(chatId, "Выбери настроение", SentimentOptions)
        }

    });


    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'черный') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 3
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, "
                + "где чаще всего встречается черный цвет. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что будем делать дальше?", AnotherColorOptionBLack)
        }


        if (data === 'красный') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 1
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается красный цвет. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Выбери цвет", AnotherColorOptionRed)
        }

        if (data === 'белый') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается белый цвет. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionWhite)
        }
        if (data === 'желтый') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                     colourId: 9
                 }
             });
             const obj_to_json = JSON.stringify(rows)
             const json_books = JSON.parse(obj_to_json)
             await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается желтый цвет. Вот первые 5 из них: ")
             for (let i = 0; i < count; i++) {
                 await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
             }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionYellow)
        }
        if (data === 'синий') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 6
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается синий цвет. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionBlue)
        }
        if (data === 'серый') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 4
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается серый цвет. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionGrey)
        }
        if (data === 'зеленый') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 5
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается зеленый цвет. Вот первые 5 из них: ")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionGreen)
        }
        if (data === 'коричневый') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 7
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается коричневый цвет. Вот первые 5 из них: ")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionBrown)
        }
        if (data === 'розовый') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 9
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается розовый цвет. Вот первые 5 из них: ")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Можешь выбрать другой цвет",AnotherColorOptionPink)
        }
     });

    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === 'anotherColor') {
            return bot.sendMessage(chatId, "Выбери цвет", ColourOptions)
        }
        if (data === 'allBlackBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 3
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот все книги из нашего списка,где чаще всего встречается черный цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allRedBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 1
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается красный цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId,"Что делаем дальше?", filtersOptions)
        }
        if (data === 'allYellowBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 9
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается желтый цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allBlueBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 6
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается синий цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allGreyBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 4
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается серый цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allGreenBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 5
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается зеленый цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allBrownBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 7
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается коричневый цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allPinkBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 9
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается розовый цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allWhiteBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    colourId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего встречается белый цвет")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }

    });







    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;


        if (data === 'солнце') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего солнечно. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что будем делать дальше?", AnotherWeatherOptionSunny10)
        }

        if (data === 'пасмурно') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 1
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего пасмурно или идет дождь. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?", AnotherWeatherOptionCloudy)
        }

        if (data === 'мороз') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 3
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где чаще всего морозная погода. Вот первые 5 из них: ")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?", AnotherWeatherOptionCold)
        }

    });

    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === 'anotherWeather') {
            return bot.sendMessage(chatId, "Выбери погоду", WeatherOptions)
        }
        if (data === 'allSunnyBooks10') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где чаще всего солнечная погода")
            for (let i = 5; i < 20; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",AnotherWeatherOptionSunny30)
        }
        if (data === 'allSunnyBooks30') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где чаще всего солнечная погода")
            for (let i = 20; i < 30; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",AnotherWeatherOptionSunny60)
        }
        if (data === 'allSunnyBooks60') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где чаще всего солнечная погода")
            for (let i = 30; i < 60; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",AnotherWeatherOptionSunny80)
        }
        if (data === 'allSunnyBooks80') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где чаще всего солнечная погода")
            for (let i = 60; i < 80; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allCloudyBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 1
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот все книги из нашего списка,где чаще всего пасмурная погода")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }

        if (data === 'allColdBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    weatherId: 3
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот все книги из нашего списка,где чаще всего морозная погода")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
    });


    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === 'позитив') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 1
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где автор ведет повествование в позитивном ключе. Да, их так мало :)" + " P.S. Это значит, что автор использует позитивные слова для описания событий, даже если эти события иногда печальны.")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?", filtersOptions)
        }

        if (data === 'негатив') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Я нашел " + count + " " + "книг, " + "где автор ведет повествование в позитивном ключе. Вот первые 5 из них: " + " P.S. Это значит, что для описания событий автор использует чаще грусные по смыслу слова")
            for (let i = 0; i < 5; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?", AnotherSentimentOptionNegative20)
        }

    });

    bot.on('callback_query', async msg => {
        console.log(msg)
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === 'anotherSentiment') {
            return bot.sendMessage(chatId, "Выбери настроение", SentimentOptions)

        }
        if (data === 'allPositiveBooks') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 1
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот все книги из нашего списка,где повествование идет в позитивном ключе")
            for (let i = 0; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",filtersOptions)
        }
        if (data === 'allNegativeBooks20') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где повествование идет в негативном ключе")
            for (let i = 5; i < 20; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",AnotherSentimentOptionNegative30)
        }
        if (data === 'allNegativeBooks30') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где повествование идет в негативном ключе")
            for (let i = 20; i < 50; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",AnotherSentimentOptionNegative50)
        }
        if (data === 'allNegativeBooks50') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где повествование идет в негативном ключе")
            for (let i = 50; i < 70; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Извините, но это все грустные книги, которые у нас есть.",AnotherSentimentOptionNegative80)
        }
        if (data === 'allNegativeBooks70') {
            const {count, rows} = await Models.Book.findAndCountAll({
                where: {
                    sentimentId: 2
                }
            });
            const obj_to_json = JSON.stringify(rows)
            const json_books = JSON.parse(obj_to_json)
            await bot.sendMessage(chatId, "Вот ещё книги из нашего списка,где повествование идет в негативном ключе")
            for (let i = 70; i < count; i++) {
                await bot.sendMessage(chatId, json_books[i].name + "(" + json_books[i].author + ")")
            }
            return bot.sendMessage(chatId, "Что делаем дальше?",AnotherSentimentOption)
        }
    });

}

start()
