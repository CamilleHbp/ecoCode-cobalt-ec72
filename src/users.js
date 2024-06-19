import db from '../db/db.js';

/**
 * Retrieves an array of user objects.
 *
 * @param {number} size - The number of users to generate.
 * @returns {Array} An array of user objects.
 */
export function getUsers(size) {
      return ([...Array(size).keys()].map((i) => ({
            firstname: `User ${i + 1}`,
            lastname: `Lastname ${i + 1}`
      })));
}

/**
 * Initializes the users table in the database.
 * Drops the existing users table if it exists and creates a new one with the specified columns.
 */
export async function initUsersTable(){
      await db.query('DROP TABLE IF EXISTS users');
      await db.query('CREATE TABLE users (firstname varchar(100) not null,lastname varchar(100) not null)');
  };
