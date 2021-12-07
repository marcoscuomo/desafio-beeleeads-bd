import { Connection, createConnection, getConnectionOptions } from 'typeorm';


export default async(host = '67.23.238.8'): Promise<Connection> => {

  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? "beeleeds_teste" : defaultOptions.database,
    })
  );
}