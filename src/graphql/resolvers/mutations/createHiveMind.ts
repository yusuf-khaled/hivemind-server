import first from 'lodash/first';
import isEmpty from 'lodash/isEmpty';
import { DB, QueryConfig, APIResponse } from '../../../types';
import { CreateHiveMindInput, HiveMind, formatHiveMindForGraphql, Team, Member } from '../../../models';
import { getDbClient } from '../../../db/connect';

export async function createHiveMind(db: DB, args: CreateHiveMindInput) {
  console.log('Gonna create hivemind');
  const dbClient = getDbClient();
  const { name, code, goal, teamId, createdBy } = args.input;
  console.log('input: ', args.input);

  const createdAtTimestamp = new Date().toISOString();

  const query: QueryConfig = {
    text: 'INSERT INTO hivemind(team_id, created_by, name, code, goal, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    values: [teamId, createdBy, name, code, goal, createdAtTimestamp],
  };
  console.log('query:', query);

  const insertResult = await dbClient.any(query);

  const response: APIResponse<HiveMind> = {
    status: 'fetching',
  };

  console.log('response: ', response);

  const createdHiveMind: Object = first(insertResult);

  const teamQuery: QueryConfig = {
    text: 'select * from team where id = $1 and deleted_at is null',
    values: [teamId],
  };
  const teamResult = await dbClient.any(teamQuery);
  const team: Team = first(teamResult);
  console.log('team:', team);

  const creatorQuery: QueryConfig = {
    text: 'select * from member where id = $1 and deleted_at is null',
    values: [createdBy],
  };
  const creatorResult = await dbClient.any(creatorQuery);
  const creator: Member = first(creatorResult);
  console.log('creator:', creator);

  try {
    if (!isEmpty(createdHiveMind)) {
      const hivemind: HiveMind = formatHiveMindForGraphql({
        ...createdHiveMind,
        created_by: creator.name,
        created_by_avatar_url: creator.avatar_url,
        teamId: teamId,
        teamName: team.name,
      });
      console.log('hivemind: ', hivemind);
      return hivemind;
    }
  } catch (e) {
    console.log('Error when fetching team');
    return null;
  }
}
