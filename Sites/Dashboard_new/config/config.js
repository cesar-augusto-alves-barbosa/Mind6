module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'mindone',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: false
      }
    },
    pool: {
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:"
  },
  production: {
    username: 'adm',
    password: '#Gfgrupo4',
    database: 'bddotControlTec',
    host: 'mind6.database.windows.net',
    dialect: 'mssql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: {
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  }
};