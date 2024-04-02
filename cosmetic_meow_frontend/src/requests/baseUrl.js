function getBaseUrl(isMail = false, isPhone = false) {
    const host = process.env.REACT_HOST;
    const baseUrl = host ? host : "http://localhost";

    return isMail ? "info@licsideris.ru" : `${baseUrl}/api/`;
}

export default getBaseUrl;