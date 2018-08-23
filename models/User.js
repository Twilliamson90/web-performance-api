const db = require('./db');
const Base = require('./Base');
const bcrypt = require('bcrypt');

hashPassword = password => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function(err, hash) {
      if(err) throw err;
      resolve(hash);
    });
  });
};

class User extends Base {

  constructor() {
    super();
    this.tableName = 'users';
  }

  async create(userData) {
    userData.password = await hashPassword(userData.password);

    const sql = 'INSERT INTO ?? SET ?';
    console.log(this.tableName);
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, userData], (err, result) => {
        if(err) throw err;
        resolve(result);
      });
    });
  }

  async signIn(user) {
    const guess = user.password;
    const foundUser = await this.findByEmail(user.email);
    const storedHash = foundUser[0].password;

    return new Promise((resolve, reject) => {
      bcrypt.compare(guess, storedHash, (err, res) => {
        if(res) {
          delete foundUser[0].password;
          resolve(foundUser[0])
        } else {
          resolve(null);
        }
      });
    });
  }

  findByEmail(email) {
    const sql = 'SELECT * FROM ?? WHERE email = ? LIMIT 1';
    return new Promise((resolve, reject) => {
      db.query(sql, [this.tableName, email], (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

}

module.exports = new User();