# NodeJS Password Encryption Library

=====================================

pwd-crypt is a lightweight Node.js library designed for seamless encryption and decryption of passwords.

## Installation

```bash
npm install pwd-crypt


```

### import

```javascript
const { hashPassword, comparePassword, generateSalt } = require('pwd-crypt');
```

```javascript
import { hashPassword, comparePassword, generateSalt } from 'pwd-crypt';
```

### Usage

```javascript
(async () => {
    const salt = await generateSalt(); // Generate a salt for hashing the password
    const hash = await hashPassword('mypassword', salt); // Hash the password using the generated salt

    const isValid = await comparePassword('mypassword', hash, salt); // Compare the plaintext password with the hashed password
    console.log(isValid); // true
})();
```

### Examples

```javascript
const { generateSalt, hashPassword, comparePassword } = require('pwd-crypt');

(async () => {
    try {
        // Generate a salt
        const salt = await generateSalt(16);

        // Hash a password
        const password = 'mysecretpassword';
        const hash = await hashPassword({ password, salt });

        // Compare the password
        const isValid = await comparePassword({ password, hash, salt });
        console.log(`Password is valid: ${isValid}`); // Password is valid: true

        // Compare with an incorrect password
        const invalidPassword = await comparePassword({
            password: 'wrongpassword',
            hash,
            salt,
        });
        console.log(`Password is valid: ${invalidPassword}`); // Password is valid: false
    } catch (error) {
        console.error('Error:', error);
    }
})();
```

### `API`

### `generateSalt(length)`

Generates a random salt.

-   **`Parameters`**: - length (optional): The length of the salt. Default is 16.
-   **`Returns`**: -`Promise<string>: A promise that resolves to the generated salt.`

### `hashPassword(password, salt, iterations, keylen, digest)`

Hashes a password with a given salt.

**Parameters:**

-   **`password`**: The password to hash.
-   **`salt`**: The salt to use for hashing.
-   **`iterations`** _(optional)_: The number of iterations for the hashing algorithm. Default is 100000.
-   **`keylen`** _(optional)_: The length of the key. Default is 64.
-   **`digest`** _(optional)_: The digest algorithm. Default is 'sha512'.

**Returns:**

-   **`Promise<string>`**: A promise that resolves to the hashed password.

### `comparePassword(password, hash, salt, iterations, keylen, digest)`

Compares a password with a hash and salt.

**Parameters:**

-   **`password`**:The password to compare.
-   **`hash`**: The hashed password to compare against.
-   **`salt`**: The salt used for hashing..
-   **`iterations`** _(optional)_: The number of iterations for the hashing algorithm. Default is 100000.
-   **`keylen`** _(optional)_: The length of the key. Default is 64.
-   **`digest`** _(optional)_: The digest algorithm. Default is 'sha512'.

**Returns:**

-   **`Promise<string>`**: A promise that resolves to true if the password matches the hash, otherwise false.
