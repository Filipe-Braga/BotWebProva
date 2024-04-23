import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import { Prisma, PrismaClient } from '@prisma/client';


config();

const prisma = new PrismaClient();
const bot = new TelegramBot(process.env.Token, { polling: true });

bot.on('message', async (msg) => {
    const qChat = msg.chat.id;
    const chatId = msg.chat.id.toString();
    const messageDate = new Date(msg.date * 1000);
    const horario = messageDate.getHours();

    if (horario >= 9 && horario < 18) {
      const email = await getEmail(qChat);
      await save(chatId, email);
    }

    else{
        bot.sendMessage(chatId, "Infelizmente não estamos atendendo no momento. Nos envie o sei email para que possamos entrar em contato no futuro");
    }});
  

  async function getEmail(chatId: number): Promise<string> {
      await bot.sendMessage(chatId, 'Por favor, nos informe seu email para que possamos entrar em contato');
      return new Promise<string>((resolve, reject) => {
        bot.once('message', (msg) => {
          if(msg.chat.id == chatId) {
            const email = msg.text;
            if(!email) {
              reject(new Error('Erro ao salvar Email'));
            } 
            else {resolve(email);}
          }
        });
      });
  }
  
  async function save(chatId: string, email: string) {

      await prisma.chat.create({
        data: {
          chatid: chatId,
          email: email
        } as Prisma.chatCreateInput
      });
      bot.sendMessage(chatId, "Seu email foi salvo, entraremos em contato");
  }