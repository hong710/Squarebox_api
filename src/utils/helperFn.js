const CryptoJS = require('crypto-js');


const encryptStr = (str, encryptKey)=>{
    const encryptStr = CryptoJS.AES.encrypt(str,encryptKey).toString()
    return encryptStr
}

const decryptStr = (str, decryptKey)=>{
    const encryptStr = CryptoJS.AES.decrypt(str,decryptKey).toString(CryptoJS.enc.Utf8)
    return encryptStr
}

module.exports = {
    encryptStr,
    decryptStr
}