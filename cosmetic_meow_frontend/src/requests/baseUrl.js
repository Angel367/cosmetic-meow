function getBaseUrl(isMail=false, isPhone=false) {
     return isMail ? "info@licsideris.ru" : "http://localhost/api/";

}

export default getBaseUrl;