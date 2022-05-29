import { DB } from '../types/db';
// const clientGetter = new ClientGetter();
// const client = clientGetter.getDbClient();

export const db: DB = {
  query: (text: string, params: any, callback: void) => {
    // console.log('client in query: ', client);
    // console.log('pool.options.client in query: ', pool.options.client);
    console.log('params: ', params);
    console.log('text: ', text);
    // return client.one(text, params);
  },
};
