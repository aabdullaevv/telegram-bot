
const TelegramBot = require('node-telegram-bot-api');

const { gameOptions, againOptions } = require("./options");

const token = '5873583049:AAFzSc1NA6KaAVah8rE7ITPJvKM4awsNcGw';

const bot = new TelegramBot(token, { polling: true });

const obj = {};



const startGame = async chatId => {
    await bot.sendMessage(
        chatId,
        "Azizbek 0 dan 9 gacha son o'ylaydi, siz o'sha sonni topishga harakat qiling."
    );
    const randomNumber = Math.floor(Math.random() * 10);
    obj[chatId] = randomNumber;
    await bot.sendMessage(
        chatId,
        "Tog'ri sonni toping",
        gameOptions
    );
}

const bootstrap = () => {

    bot.setMyCommands([
        {
            command: "/start",
            description: "Bot haqida ma'lumot"
        },
        {
            command: "/info",
            description: "O'zingiz haqingizda ma'lumot"
        },
        {
            command: "/game",
            description: "O'yin oynash"
        },
    ])

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text == "/start")
        {
            return bot.sendMessage(
                chatId,
                `Assalomu Alaykum xurmatli ${msg.from?.first_name} sizni o'quv botimizda ko'rib turganimizdan juda xursandmiz!`
            )
        }

        if (text == '/info')
        {
            await bot.sendSticker(chatId,
                'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/192/1.webp'
            );

            await bot.sendPhoto(
                chatId,
                'https://media.istockphoto.com/id/1401980646/ru/%D1%84%D0%BE%D1%82%D0%BE/3d-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80%D0%B8%D0%BD%D0%B3-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B9-%D1%81%D0%BA%D1%83%D0%BB%D1%8C%D0%BF%D1%82%D1%83%D1%80%D1%8B-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80-%D0%BC%D0%B5%D1%82%D0%B0%D0%B2%D1%81%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B9-%D1%81-%D1%81%D0%B5%D1%82%D1%8C%D1%8E-%D0%BD%D0%B8%D0%B7%D0%BA%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D0%B3%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85.webp?b=1&s=170667a&w=0&k=20&c=qaw5cwf7dU6ZOUpqFScW2ANpJSzZLuAH3Ci4Q7pnOLw='
            );

            return bot.sendMessage(
                chatId,
                `Sizning telegram username bu ${msg.from?.username}, sizning ismingiz esa ${msg.from?.
                    first_name} ${msg.from?.last_name}`
            )
        }

        if (text == "/game")
        {
            return startGame(chatId)
        }

        bot.sendMessage(chatId, "Uzur men sizning gapingizga tushunmayapman!")

    });

    bot.on("callback_query", async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data == "/again")
        {
            return startGame(chatId)
        }

        if (data == obj[chatId])
        {

            await bot.sendPhoto(chatId,
                "https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2021-12/13.32.31%201.jpg?itok=FMGKqpRs")
            return await bot.sendMessage(chatId, `Tabriklayman siz tog'ri javob berdingiz, Azizbek ${obj[chatId]} sonni tanlagan edi`, againOptions);


        } else
        {
            await bot.sendPhoto(chatId,
                "https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fn-66EiTJSaQ%2Fhqdefault.jpg"
            );
            return bot.sendMessage(chatId, `Siz notog'ri son tanladingiz tanlagan soningiz ${data}, Azizbek ${obj[chatId]}
            sonni tanlagan edi, siz undan kora borip kitopizi oqing men bilan oynagandan kora`,
                againOptions)
        }
    });
};

bootstrap();
