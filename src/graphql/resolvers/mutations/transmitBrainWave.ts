import first from 'lodash/first';
import { DB, QueryConfig } from '../../../types';
import { getDbClient } from '../../../db/connect';
import { TransmitBrainWaveInput } from '../../../models';

export async function transmitBrainWave(db: DB, args: TransmitBrainWaveInput): Promise<any> {
  console.log('Gonna transmit brainwave');

  const dbClient = getDbClient();
  const { brainWaveId, content, creator } = args;

  const createdAtTimestamp = new Date().toISOString();

  const query: QueryConfig = {
    text: 'INSERT INTO content(brainwave_id, created_by, last_edited_by, content, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: [brainWaveId, creator, creator, content, createdAtTimestamp],
  };

  const insertResult = await dbClient.any(query);

  console.log('insertResult:', insertResult);

  return first(insertResult);
}
