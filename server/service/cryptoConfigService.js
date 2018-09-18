var crypto = require('crypto');
var password = ';L3.-n3N\\"9';
var salt = 'Avaya123';
const key = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1');

function encryptConfig(data){
    var cipher = crypto.createCipher('des-ede', key);
    var result = cipher.update(data, 'utf8', 'hex');
    result += cipher.final('hex');
    return result;
}

function decryptConfig(encryptedData){
    var decipher = crypto.createDecipher('des-ede',key)
    var dec = decipher.update(encryptedData,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}


module.exports = {
    encryptConfig : encryptConfig,
    decryptConfig : decryptConfig
};
