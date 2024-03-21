function getBaseUrl(isMail=false) {
     return isMail ? "mailto:simple@mail.com" : "https://licsideris.ru/api/";

}

export default getBaseUrl;