const CryptoJS = require('crypto-js');


const encryptStr = (str, encryptKey)=>{
    const encryptStr = CryptoJS.AES.encrypt(str,encryptKey).toString()
    return encryptStr
}

const decryptStr = (str, decryptKey)=>{
    const encryptStr = CryptoJS.AES.decrypt(str,decryptKey).toString(CryptoJS.enc.Utf8)
    return encryptStr
}


//not display any data in the arr
const limitData = (obj, arr)=>{
    const newObj = {...obj}

    arr.forEach(element => {
        delete newObj[element]
    });

    return newObj;
}





module.exports = {
    encryptStr,
    decryptStr,
    limitData
}