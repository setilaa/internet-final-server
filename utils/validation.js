const space = "\u0020\u200c"; // Spaces
const underscore = "\u005F"; // _
const dash = "\u002D"; // -

const symbol1 = "\u060C"; // ،
const symbol2 = "\u061B"; // ؛
const symbol3 = "\u061F"; // ؟
const symbol4 = "\u066A\u0025"; // %
const symbol5 = "\u066B\u002C"; // ,
const symbol6 = "\u066C"; // !
const symbol7 = "\u0022"; // "
const symbol8 = "\u0027"; // "
const symbol9 = "\u0028"; // (
const symbol10 = "\u0029"; // )
const symbol11 = "\u002E"; // .
const symbol12 = "\u003A"; // :
const symbol13 = "\u003F"; // ?

const symbols = `${dash}${underscore}${symbol1}${symbol2}${symbol3}${symbol4}${symbol5}${symbol6}${symbol7}${symbol8}${symbol9}${symbol10}${symbol11}${symbol12}${symbol13}`;

const motions = "\u064B-\u0651"; // ً  ٌ  ٍ  َ	  ُ	  ِ	  ّ
const motionsList = ["َ", "ُ", "ِ", "ّ", "ً", "ٌ", "ٍ"]

const persianNumbers = "\u06F0-\u06F9"; // ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
const arabicNumbers = "\u0660-\u0669"; // ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹
const persianNumbersList = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
const arabicNumbersList = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

const persian1 = "\u0621-\u0628"; // ء آ أ	ؤ	إ	ئ	ا ب
const persian2 = "\u062A-\u063A"; // ت  ث  ج  ح  خ  د  ذ  ر  ز  س  ش  ص  ض  ط  ظ  ع  غ
const persian3 = "\u0641-\u0642"; // ف  ق
const persian4 = "\u0644-\u0648"; // ل م ن ه و
const persian5 = "\u06CC\u064A\u0649"; // ی
const persian6 = "\u0655"; //  ٕ
const persian7 = "\u067E"; // پ
const persian8 = "\u0686"; // چ
const persian9 = "\u0698"; // ژ
const persian10 = "\u06A9\u0643"; // ک
const persian11 = "\u06AF"; // گ
const persian12 = "\u06BE\u06D5\u0629"; // ھ

const persianLetter = `${persian1}${persian2}${persian3}${persian4}${persian5}${persian6}${persian7}${persian8}${persian9}${persian10}${persian11}${persian12}`;

const isPersianWithoutNumber = (str) => {
  const reg = new RegExp(`^[${space}${persianLetter}${motions}]*$`);
  return reg.test(str);
};

const isPersianWithsymbol = (str) => {
  const reg = new RegExp(
    `^([${persianLetter}${space}${symbols}${persianNumbers}${arabicNumbers}${motions}]){2,}$`
  );
  return reg.test(str);
};

const isNumber = (str) => {
  const numberReg = new RegExp(`^([0-9${persianNumbers}${arabicNumbers}]){1,}$`);
  return numberReg.test(str);
};

const isEmail = (str) => {
  const emailReg = new RegExp('^[a-zA-Z0-9._]{2,}[@]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}$');
  return emailReg.test(str);
};

const correctCharacters = (str) => {
  str = str.replaceAll("‌", " ");

  for (let i = 0; i < motionsList.length; i += 1) {
    str = str.replaceAll(motionsList[i], "");
  }
  for (let i = 0; i < 10; i += 1) {
    str = str.replaceAll(persianNumbersList[i], i).replaceAll(arabicNumbersList[i], i);
  }

  return str.trim();
};

module.exports = {
  isPersianWithoutNumber,
  // isPersianWithsymbol,
  isNumber,
  isEmail,
  correctCharacters
};