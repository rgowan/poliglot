module.exports = {
  port: process.env.PORT || 4000,
  secret: 'fojr49f0aDHW5ufsod',
  env: process.env.NODE_ENV || 'development',
  db: {
    production: process.env.MONGODB_URI,
    development: 'mongodb://localhost/flip-chat-development',
    test: 'mongodb://localhost/flip-chat-test'
  }
}