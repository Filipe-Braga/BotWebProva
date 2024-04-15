const TelegramBot = require('node-telegram-bot-api');
const token = '7013291092:AAGeDayfDnUJO-_nOVkeM0zcZBPBGAVAnlA';
const bot = new TelegramBot(token, {polling: true});



bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1]; 
  bot.sendMessage(chatId, resp);
});



bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var conv = 0

  let data = msg.date;
  var base = new Date(data * 1000);
  var horario = base.getHours();

    while (conv =! 1){
        if(horario >= 9 && horario < 18){
            bot.sendMessage(chatId, "Você pode nos encontrar em https://uvv.br/");
            conv == 1;      
        }

        else{
            bot.sendMessage(chatId, "Infelizmente não estamos atendendo no momento. Nos envie o sei email para que possamos entrar em contato no futuro");

        }
    }

   
});
