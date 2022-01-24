/**
 * @author ANPH
 * @created 23/02/2022
*/

const aredis = require('aredis-xyz')

exports.build = (hash, prefix = 'ANPH-XYZ-') => {
    const opt = { port: 6379, host: '168.138.185.16', password: 'anphxyz' }
    // expired after 3 days (auto remove)
    return aredis.build({ ...opt, prefix, hashName: hash, expire: 3 * 24 * 60 * 60 });
}

