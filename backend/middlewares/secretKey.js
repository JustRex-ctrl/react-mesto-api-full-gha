module.exports.setSecretKey = () => {
  const secretKey = process.env.NODE_ENV === 'production' ? 'secret-key' : 'secret-key';
  return secretKey;
};
