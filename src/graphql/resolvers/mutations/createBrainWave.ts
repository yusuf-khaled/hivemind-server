import first from 'lodash/first';
import get from 'lodash/get';
import { DB, QueryConfig } from '../../../types';
import { CreateBrainWaveInput } from '../../../models';
import { getDbClient } from '../../../db/connect';

export async function createBrainWave(db: DB, args: CreateBrainWaveInput): Promise<any> {
  console.log('Gonna create brainwave');

  const dbClient = getDbClient();
  const { creator, assignee, description, dueAt, title, hiveMindId, status, type } = args.input;
  console.log('input: ', args.input);

  const createdAtTimestamp = new Date().toISOString();

  const getMaxHiveMindNumberQuery: QueryConfig = {
    text: 'select max (hivemind_number) from brainwave',
  };
  const getMaxHiveMindNumberResult = await dbClient.any(getMaxHiveMindNumberQuery);
  console.log('getMaxHiveMindNumberResult: ', getMaxHiveMindNumberResult);
  const newBrainWaveHiveMindNumber = get(first(getMaxHiveMindNumberResult), 'max', 0) + 1;

  const query: QueryConfig = {
    text: 'INSERT INTO brainwave(hivemind_id, hivemind_number, created_by, assigned_to, due_at, title, description, status, type, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
    values: [hiveMindId, newBrainWaveHiveMindNumber, creator, assignee, dueAt, title, description, status, type, createdAtTimestamp],
  };
  console.log('query:', query);

  const insertResult = await dbClient.any(query);

  console.log('insertResult:', insertResult);

  return first(insertResult);
}
