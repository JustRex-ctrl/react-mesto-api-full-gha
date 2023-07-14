module.exports.setSecretKey = () => {
  const secretKey = process.env.NODE_ENV === 'production' ? 'secret-key' : 'jwt-secret-dev';
  return secretKey;
};
