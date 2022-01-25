/**
 * @author ANPH
 * @created 23/02/2022
*/

const aredis = require('aredis-xyz')

exports.build = (hash) => {
    const opt = { port: 6379, host: '168.138.185.16', password: 'anphxyz' }
    // expired after 3 days (auto remove)
    const instance = aredis.build({ ...opt, prefix: 'ANPH-XYZ-', hashName: hash, expire: 3 * 24 * 60 * 60 });

    log.warning('>>build', instance.hashName);
    return instance;
}

