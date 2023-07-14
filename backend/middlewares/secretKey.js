module.exports.setSecretKey = () => {
  const secretKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'jwt-secret-dev';
  return secretKey;
};
