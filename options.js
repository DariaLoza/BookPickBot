
module.exports = {
    filtersOptions: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Цвет в книге', callback_data:"colour"}],
                    [{text: 'Погода в книге', callback_data:"weather"}],
                    [{text: 'Настроение в книге', callback_data:"sentiment"}]

                ]
            }
        )
    },

    ColourOptions: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Черный', callback_data:"черный"}],
                    [{text: 'Красный', callback_data:"красный"}],
                    [{text: 'Белый', callback_data:"белый"}],
                    [{text: 'Желтый', callback_data:"желтый"}],
                    [{text: 'Синий', callback_data:"синий"}],
                    [{text: 'Коричневый', callback_data:"коричневый"}],
                    [{text: 'Серый', callback_data:"серый"}],
                    [{text: 'Зеленый', callback_data:"зеленый"}],
                    [{text: 'Розовый', callback_data:"розовый"}]

                ]
            }
        )
    },

    WeatherOptions: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Солнечно', callback_data:"солнце"}],
                    [{text: 'Дождь', callback_data:"пасмурно"}],
                    [{text: 'Морозно', callback_data:"мороз"}],


                ]
            }
        )
    },
    SentimentOptions: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Позитивно', callback_data:"позитив"}],
                    [{text: 'Грустно', callback_data:"негатив"}]


                ]
            }
        )
    },
    CloudOptions: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: '1', callback_data:"1"}],
                    [{text: '2', callback_data:"2"}],
                    [{text: '3', callback_data:"3"}],
                    [{text: '4', callback_data:"4"}],
                    [{text: '5', callback_data:"5"}],
                    [{text: '6', callback_data:"6"}]


                ]
            }
        )
    },
    AnotherColorOptionBLack: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allBlackBooks"}],
                    [{text: 'Другой цвет', callback_data:"anotherColor"}]
                ]
            }
        )
    },
    AnotherColorOptionRed: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allRedBooks"}],
                    [{text: 'Другой цвет', callback_data:"anotherColor"}]
                ]
            }
        )
    },
    AnotherColorOptionYellow: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другой цвет', callback_data:"anotherColor"}],
                ]
            }
        )
    },
    AnotherColorOptionBlue: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allBlueBooks"}],
                    [{text: 'Другой цвет', callback_data:"anotherColor"}]
                ]
            }
        )
    },
    AnotherColorOptionGrey: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allGreyBooks"}],
                    [{text: 'Другой цвет', callback_data:"anotherColor"}]
                ]
            }
        )
    },
    AnotherColorOptionGreen: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другой цвет', callback_data:"anotherColor"}],
                ]
            }
        )
    },
    AnotherColorOptionBrown: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другой цвет', callback_data:"anotherColor"}],
                ]
            }
        )
    },
    AnotherColorOptionPink: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другой цвет', callback_data:"anotherColor"}],
                ]
            }
        )
    },
    AnotherColorOptionWhite: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allWhiteBooks"}],
                    [{text: 'Другой цвет', callback_data:"anotherColor"}]
                ]
            }
        )
    },
    AnotherWeatherOption: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherWeatherOptionSunny: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allSunnyBooks"}],
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherWeatherOptionSunny10: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать ещё книги', callback_data:"allSunnyBooks10"}],
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherWeatherOptionSunny30: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать ещё книги', callback_data:"allSunnyBooks30"}],
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherWeatherOptionSunny60: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Больше солнечных книг', callback_data:"allSunnyBooks60"}],
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherWeatherOptionSunny80: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другая погода', callback_data:"anotherWeather"}],
                ]
            }
        )
    },
    AnotherWeatherOptionCloudy: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allCloudyBooks"}],
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherWeatherOptionCold: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allColdBooks"}],
                    [{text: 'Другая погода', callback_data:"anotherWeather"}]
                ]
            }
        )
    },
    AnotherSentimentOption: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}]
                ]
            }
        )
    },
    AnotherSentimentOptionPositive: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать все книги', callback_data:"allPositiveBooks"}],
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}]
                ]
            }
        )
    },
    AnotherSentimentOptionNegative20: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Показать ещё книги', callback_data:"allNegativeBooks20"}],
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}]
                ]
            }
        )
    },
    AnotherSentimentOptionNegative30: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Больше "грустных" книг', callback_data:"allNegativeBooks30"}],
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}]
                ]
            }
        )
    },
    AnotherSentimentOptionNegative50: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Ещё больше "грустных" книг', callback_data:"allNegativeBooks50"}],
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}]
                ]
            }
        )
    },
    AnotherSentimentOptionNegative70: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Повысить концентрацию "грустных" книг', callback_data:"allNegativeBooks70"}],
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}]
                ]
            }
        )
    },
    AnotherSentimentOptionNegative80: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Другое настроение', callback_data:"anotherSentiment"}],
                ]
            }
        )
    },
    SeeMoreOption: {
        reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Посмотреть все книги', callback_data:"seeMore"}]
                ]
            }
        )
    },

}


