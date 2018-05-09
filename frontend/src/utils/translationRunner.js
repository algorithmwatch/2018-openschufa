const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'src/translations/extractedMessages',
  translationsDirectory: 'src/translations/locales/',
  singleMessagesFile: true,
  languages: ['de'], // any language you need
});
