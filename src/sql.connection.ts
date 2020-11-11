import {createPool} from 'mysql2/promise';
export async function connect() {
  const connection = await createPool({
    host: 'b4pwvwnfdofw0u1rtcfj-mysql.services.clever-cloud.com',
    user: 'ux4hn0b78joaw1pq',
    database: 'b4pwvwnfdofw0u1rtcfj',
    password:"BtRnX0HMtLopnfjadQ3Z",
    port: 3306
  });
  return connection
}