const config = require('config');
const argon = require('argon2');

const ARGON_SALT_LENGTH = config.get('auth.argon.saltLength');
const ARGON_HASH_LENGTH = config.get('auth.argon.hashLength');
const ARGON_TIME_COST = config.get('auth.argon.timeCost');
const ARGON_MEMORY_COST = config.get('auth.argon.memoryCost');

module.exports.hashPassword = async (password) => {
    const passwordHash = await argon.hash(password, {
      saltLength: ARGON_SALT_LENGTH,
      hashLength: ARGON_HASH_LENGTH,
      timeCost: ARGON_TIME_COST,
      memoryCost: ARGON_MEMORY_COST,
      type: argon.argon2id,
    });
    return passwordHash;
  };

module.exports.verifyPassword = async (password, passwordHash) => {
    const valid = await argon.verify(passwordHash, password, {
      saltLength: ARGON_SALT_LENGTH,
      hashLength: ARGON_HASH_LENGTH,
      timeCost: ARGON_TIME_COST,
      memoryCost: ARGON_MEMORY_COST,
      type: argon.argon2id,
    });
    return valid;
  };