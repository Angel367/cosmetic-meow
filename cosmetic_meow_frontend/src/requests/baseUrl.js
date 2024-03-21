function getBaseUrl(isMail=false) {
     return isMail ? "mailto:simple@mail.com" : "https://195.58.50.137/api/";

}

export default getBaseUrl;