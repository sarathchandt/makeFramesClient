import Dotenv from 'dotenv-webpack';

module.exports = {
  plugins: [
    new Dotenv({
      path: '.env', // Path to .env file
      safe: true, // Load .env.example (defaults to "false" which does not use dotenv-safe)
    }),
  ],
};