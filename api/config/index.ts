// EXPRESS
export const PORT = process.env.PORT || 3000;
export const SERVER_URL = `http://localhost:${PORT}/`;

// MONGODB
export const MONGODB_URI = 'mongodb://localhost:27017/bookAPI';
export const MONGODB_URI_TEST = `${MONGODB_URI}-test`;