import first from 'lodash/first';
import isEmpty from 'lodash/isEmpty';

import { DB, QueryConfig, APIResponse } from '../../../types';
import { Member, Team } from '../../../models';
import { getDbClient } from '../../../db/connect';

export const team = async (db: DB, args: any) => {
  console.log('Got request!!');
  const { memberId } = args;
  const memberQuery: QueryConfig = {
    text: 'select * from member where id = $1',
    values: [memberId],
  };

  const dbClient = getDbClient();
  console.log('got dbClient: ', dbClient);

  const memberResult = await dbClient.any(memberQuery);

  console.log('memberResult: ', memberResult);

  const member: Member = first(memberResult);
  console.log('member:', member);

  const response: APIResponse<Team> = {
    status: 'fetching',
  };

  if (isEmpty(member)) {
    console.log('Found no member with that ID in the DB!');
    return null;
  }

  const { team_id } = member;

  const teamQuery: QueryConfig = {
    text: 'select * from team where id = $1',
    values: [team_id],
  };
  const teamResult = await dbClient.any(teamQuery);
  const team: Team = first(teamResult);
  console.log('team:', team);

  try {
    if (!isEmpty(team)) {
      return team;
    }
  } catch (e) {
    console.log('Error when fetching team');
    return null;
  }
}
