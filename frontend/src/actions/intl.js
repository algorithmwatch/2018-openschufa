import {
  SWITCH_LANGUAGE
} from "./actionTypes";
import * as localeData from "../translations/locales";


export function switchLanguage(language) {
  return {
    type: SWITCH_LANGUAGE,
    language: language,
    messages: localeData[language]
  }
}
