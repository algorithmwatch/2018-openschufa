import { addLocaleData } from 'react-intl';
import de from 'react-intl/locale-data/de';

// Our translated strings
import * as localeData from './translations/locales';

addLocaleData([...de]);
// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
let language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
export const languageWithoutRegionCode = language
  .toLowerCase()
  .split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
export const messages =
  localeData[languageWithoutRegionCode] || localeData[language] || {};
