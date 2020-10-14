# formsControlSRbot
Telegram bot for managing access of each of Google Forms, which creating by @srkpi. Bot hosts at Google Apps Script platform.

## Steps for deploying
• Create the project at [Google Apps Script](https://script.google.com/home/my);

• Copy code from [bot.js](https://github.com/srkpi/formsControlSRbot/blob/main/bot.js) and paste them to the file in your GAS project;

• Create bot in Telegram by using [@BotFather](t.me/BotFather);

• After choosing the name and nickname, BotFather send you **message with HTTP token** — paste them in [```const token```]
(https://github.com/srkpi/formsControlSRbot/blob/main/bot.js#L1);

• Publish script as web app for **anyone, even anonymous**![](https://ctrlv.cz/shots/2020/10/14/1eKh.png);

• Select and run ```setWebHook()``` function to set webhook for bot, instead using the polling.

## Using
• By using [@BotFather](t.me/BotFather), select bot and create commands for bot.
