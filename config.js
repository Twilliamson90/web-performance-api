if(process.env.NODE_ENV.trim() === 'development') {
  module.exports = {
    db: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'web_perf_index'
    },
    JWT_SECRET: 'supersecretpassword',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      }
    }
  }
} else {
  module.exports = {
    db: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'web_perf_index'
    },
    JWT_SECRET: 'supersecretpassword',
    oauth: {
      google: {
        clientID: 'number',
        clientSecret: 'string',
      },
      facebook: {
        clientID: 'number',
        clientSecret: 'string',
      }
    }
  }
}