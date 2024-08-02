import * as crypto from 'crypto';
import * as util from 'util';
import { comparePasswordType, HashPasswordType } from './types';

const pbkdf2 = util.promisify(crypto.pbkdf2);
const randomBytes = util.promisify(crypto.randomBytes);

/**
 * Generates a random salt.
 * @param {number} length - The length of the salt. Default is 16.
 * @returns {Promise<string>} - A promise that resolves to the generated salt.
 */
const generateSalt = async (length: number = 16): Promise<string> => {
    return (await randomBytes(length)).toString('hex');
};

/**
 *
 *  a password with a given salt.
 * @param {string} password - The password to hash.
 * @param {string} salt - The salt to use for hashing.
 * @param {number} iterations - The number of iterations for the hashing algorithm. Default is 100000.
 * @param {number} keylen - The length of the key. Default is 64.
 * @param {string} digest - The digest algorithm. Default is 'sha512'.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const hashPassword = async ({
    password,
    salt,
    iterations = 100000,
    keylen = 64,
    digest = 'sha512',
}: HashPasswordType) => {
    const hash = await pbkdf2(password, salt, iterations, keylen, digest);
    return hash.toString('hex');
};

/**
 * Compares a password with a hash and salt.
 * @param {string} password - The password to compare.
 * @param {string} hash - The hashed password to compare against.
 * @param {string} salt - The salt used for hashing.
 * @param {number} iterations - The number of iterations for the hashing algorithm. Default is 100000.
 * @param {number} keylen - The length of the key. Default is 64.
 * @param {string} digest - The digest algorithm. Default is 'sha512'.
 * @returns {Promise<boolean>} - A promise that resolves to true if the password matches the hash, otherwise false.
 */
const comparePassword = async ({
    password,
    hash,
    salt,
    iterations = 100000,
    keylen = 64,
    digest = 'sha512',
}: comparePasswordType) => {
    const passwordHash = await hashPassword({
        password,
        salt,
        iterations,
        keylen,
        digest,
    } as HashPasswordType);
    return hash === passwordHash;
};

export { generateSalt, hashPassword, comparePassword };
