function getBaseUrl(isMail=false) {
     return isMail ? "mailto:simple@mail.com" : "http://195.58.50.137/api/";

}

export default getBaseUrl;