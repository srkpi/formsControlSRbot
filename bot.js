const token = '';
const tgBotUrl = 'https://api.telegram.org/bot' + token;
const hookUrl = '';
const allowedIds = []

var form = FormApp.openById('');

function setWebHook() {
  let response = UrlFetchApp.fetch(tgBotUrl + "/setWebhook?url=" + hookUrl);
  Logger.log('telegram response status is ' + response.getResponseCode());
}

function getWebHook() {
  let response = UrlFetchApp.fetch(tgBotUrl + "/getWebhookInfo");
  if (response.getResponseCode() == 200) {
    let data = JSON.parse(response.getContentText())
    Logger.log('current webhook url is ' + data.result.url);
  } else {
    Logger.log('telegram response status is ' + response.getResponseCode());
  }
}

function checkFormStatus() {
  var form_status = "";
  if (form.isAcceptingResponses() = true) {
    form_status = 'открыта';
    return form_status;
  }
  else {
    form_status = 'закрыта';
    return form_status;
  }
}

function changeFormStatus(){
  form.setAcceptingResponses(true)
}

function doPost(e) {
  let content = JSON.parse(e.postData.contents);
  
  if (content.message.text == '/status') {
    if ((content.message.chat.id == allowedIds[0]) || (content.message.chat.id == allowedIds[1])) {
      // If Google Forms accepting responses.
      if (form.isAcceptingResponses()) {
        var now_status = 'Форма на момент️ ' + Utilities.formatDate(new Date(), "GMT+3:00", "HH:mm dd.MM.yyyy") + ' открыта для ответов.';
      
        // send response 
        let payload = {
          chat_id: content.message.chat.id,
          text: now_status
        }
        sendMessage(payload);
        return HtmlService.createHtmlOutput();
      }
      
      // If Google Form didn't accepting responses.
      else {
        var now_status = 'Форма на момент️ ' + Utilities.formatDate(new Date(), "GMT+3:00", "HH:mm dd.MM.yyyy") + ' закрыта для ответов.';
      
        // send response 
        let payload = {
          chat_id: content.message.chat.id,
          text: now_status
        }
        sendMessage(payload);
        return HtmlService.createHtmlOutput();
      }
    }
    else {
      let payload = {
        chat_id: content.message.chat.id,
        text: 'Ви не авторизованы для взаимодействия с ботом.️'
      }
      sendMessage(payload);
      return HtmlService.createHtmlOutput();
    }
  }
  
  if (content.message.text == '/close') {
    if ((content.message.chat.id == allowedIds[0]) || (content.message.chat.id == allowedIds[1])) {
      // If Google Forms accepting responses.
      if (form.isAcceptingResponses()) {
        var now_status = content.message.chat.username + ', вы закрыли форму для ответов пользователей с момента ' + 
          Utilities.formatDate(new Date(), "GMT+3:00", "HH:mm dd.MM.yyyy"); 
          
        form.setAcceptingResponses(false);
        
        // send response 
        let payload = {
          chat_id: content.message.chat.id,
          text: now_status
        }
        sendMessage(payload);
        return HtmlService.createHtmlOutput();
      }
      
      // If Google Form didn't accepting responses.
      else {
        var now_status = 'Форма закрыта для ответов.';
      
        // send response 
        let payload = {
          chat_id: content.message.chat.id,
          text: now_status
        }
        sendMessage(payload);
        return HtmlService.createHtmlOutput();
      }
    }
    else {
      let payload = {
        chat_id: content.message.chat.id,
        text: 'Ви не авторизованы для взаимодействия с ботом.️'
      }
      sendMessage(payload);
      return HtmlService.createHtmlOutput();
    }
  }
  
  if (content.message.text == '/open') {
    if ((content.message.chat.id == allowedIds[0]) || (content.message.chat.id == allowedIds[1])) {
      // If Google Forms didn't accepting responses.
      if (!form.isAcceptingResponses()) {
        var now_status = content.message.chat.username + ' вы открыли форму для ответов пользователей с момента ' + 
          Utilities.formatDate(new Date(), "GMT+3:00", "HH:mm dd.MM.yyyy");
        form.setAcceptingResponses(true);
        
        // send response 
        let payload = {
          chat_id: content.message.chat.id,
          text: now_status
        }
        sendMessage(payload);
        return HtmlService.createHtmlOutput();
      }
      
      // If Google Form accepting responses.
      else {
        var now_status = 'Форма открыта для ответов.';
      
        // send response 
        let payload = {
          chat_id: content.message.chat.id,
          text: now_status
        }
        sendMessage(payload);
        return HtmlService.createHtmlOutput();
      }
    }
    else {
      let payload = {
        chat_id: content.message.chat.id,
        text: 'Ви не авторизованы для взаимодействия с ботом.️'
      }
      sendMessage(payload);
      return HtmlService.createHtmlOutput();
    }
  }
}

function sendMessage(payload){
  let options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  }
  return UrlFetchApp.fetch(tgBotUrl + "/sendMessage", options);
}
