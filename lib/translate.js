const translate = require('google-translate-api');

async function translateMessage(text, from, to) {
  const translatedMessage = await translate(text, {from, to});
  return translatedMessage.text;
}

module.exports = translateMessage;