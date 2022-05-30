import first from 'lodash/first';
import map from 'lodash/map';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { DB, QueryConfig, APIResponse } from '../../../types';
import { Member, Team, HiveMind, formatHiveMindForGraphql, UntypedObject } from '../../../models';
import { getDbClient } from '../../../db/connect';

export const hiveminds = async (db: DB, args: any) => {
  console.log('Gonna fetch hiveminds');
  const dbClient = getDbClient();

  const { memberId } = args;
  const memberQuery: QueryConfig = {
    text: 'select * from member where id = $1 and deleted_at is null',
    values: [memberId],
  };

  console.log('got dbClient: ', dbClient);

  const memberResult = await dbClient.any(memberQuery);

  console.log('memberResult: ', memberResult);

  const member: Member = first(memberResult);
  console.log('member:', member);

  if (isEmpty(member)) {
    console.log('Found no member with that ID in the DB!');
    return null;
  }

  const { team_id } = member;

  const teamQuery: QueryConfig = {
    text: 'select * from team where id = $1 and deleted_at is null',
    values: [team_id],
  };
  const teamResult = await dbClient.any(teamQuery);
  const team: Team = first(teamResult);
  console.log('team:', team);

  const hiveMindQuery: QueryConfig = {
    text: 'select * from hivemind where team_id = $1 and deleted_at is null',
    values: [team_id],
  };

  const hiveMindsResult = await dbClient.any(hiveMindQuery);
  console.log('hiveMindsResult:', hiveMindsResult);
  if (isEmpty(hiveMindsResult)) {
    console.log('Found no hiveminds in the DB!');
    return [];
  }

  // Grabbing member names from the created_by IDs
  const membersNameMap: UntypedObject = {};
  await Promise.all(map(hiveMindsResult, async (res) => {
    const createdByUserId = res.created_by;
    const memberQuery: QueryConfig = {
      text: 'select * from member where id = $1 and deleted_at is null',
      values: [createdByUserId],
    };
    const membersResult = await dbClient.any(memberQuery);
    const memberRes = first(membersResult);
    const memberId = get(memberRes, 'id');
    const memberName = get(memberRes, 'name');
    const memberAvatarUrl = get(memberRes, 'avatar_url');
    membersNameMap[memberId] = {
      name: memberName,
      avatarUrl: memberAvatarUrl,
    };
  }));
  console.log('membersNameMap: ', membersNameMap);

  try {
    if (!isEmpty(hiveMindsResult)) {
      const hiveminds: HiveMind[] = map(hiveMindsResult, res => {
        const { name, avatarUrl } = membersNameMap[res.created_by];
        const resolvedObj = {
          ...res,
          created_by: name,
          created_by_avatar_url: avatarUrl,
          teamId: team_id,
          teamName: team.name,
        };
        return formatHiveMindForGraphql(resolvedObj);
      });
      console.log('formatted hiveminds: ', hiveminds);
      return hiveminds;
    }
  } catch (e) {
    console.log('Error when fetching team');
    return null;
  }
}
