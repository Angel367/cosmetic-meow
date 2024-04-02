const host = process.env.REACT_HOST;

function getBaseUrl(isMail = false, isPhone = false) {
    const baseUrl = host ? host : "http://localhost";

    return isMail ? "info@licsideris.ru" : `${baseUrl}/api/`;
}