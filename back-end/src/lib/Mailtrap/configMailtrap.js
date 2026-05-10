import { config } from "dotenv";
import { MailtrapClient } from 'mailtrap';

config();




const TOKEN = process.env.MAILTRAP_KEY;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mwaka Lukombo",
};

