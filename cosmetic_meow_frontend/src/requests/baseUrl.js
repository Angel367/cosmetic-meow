function getBaseUrl(isMail=false) {
     return isMail ? "mailto:simple@mail.com" : "http://localhost/api/";

}

export default getBaseUrl;