import mysql from 'mysql2/promise';
import { config2 } from './config';

const connect2 = async () => {
  const conn = await mysql.createConnection(config2);
  return conn;
};

export default connect2;
