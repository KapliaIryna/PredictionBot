const { Telegraf } = require('telegraf');
const predictions = require('./predictions');
//require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Define a command handler
// bot.command('start', (ctx) => {
//     console.log('Received /start command');
//     try {
//         const randomIndex = Math.floor(Math.random() * predictions.length);
//         const randomMessage = predictions[randomIndex];
//         ctx.reply(randomMessage);
//     } catch (error) {
//         console.error('Error sending message:', error);
//         ctx.reply('An error occurred while sending the message.');
//     }
// });

// Define an inline query handler
bot.on('inline_query', query => {
    try {
        const randomIndex = Math.floor(Math.random() * predictions.length);
        const randomMessage = predictions[randomIndex];
        
        const result = [{
            type: 'article',
            id: '1',
            title: 'Подивись своє передбачення',
            input_message_content: {
                message_text: randomMessage
            }
        }];
        
        query.answerInlineQuery(result, { cache_time: 1 });

    } catch (error) {
        console.error('Error handling inline query:', error);
        query.answerInlineQuery([]);
    }
});

// bot.command('stop', (ctx) => {
//     bot.stop();
// });

// Start the bot
try {
    console.log('Launching bot...');
    bot.launch();
    console.log('Bot launched successfully');
} catch (error) {
    console.error('Error during bot initialization:', error);
}