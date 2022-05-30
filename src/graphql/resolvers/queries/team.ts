import first from 'lodash/first';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

import { DB, QueryConfig, APIResponse } from '../../../types';
import { Member, Team, TeamMember, formatTeamForGraphql } from '../../../models';
import { getDbClient } from '../../../db/connect';

export const team = async (db: DB, args: any) => {
  console.log('Got request!!');
  const { memberId } = args;
  const memberQuery: QueryConfig = {
    text: 'select * from member where id = $1 and deleted_at is null',
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
    text: 'select * from team where id = $1 and deleted_at is null',
    values: [team_id],
  };
  const teamResult = await dbClient.any(teamQuery);
  const team: any = first(teamResult);
  console.log('team:', team);

  const allTeamMembersQuery: QueryConfig = {
    text: 'select * from member where team_id = $1 and deleted_at is null',
    values: [team_id],
  };
  const allTeamMembersResult = await dbClient.any(allTeamMembersQuery);
  console.log('allTeamMembersResult: ', allTeamMembersResult);
  const formattedMembers: TeamMember[] = map(allTeamMembersResult, (teamMember) => {
    return {
      id: teamMember.id,
      name: teamMember.name,
      email: teamMember.email,
      title: teamMember.title,
      avatarUrl: teamMember.avatar_url,
    }
  });
  team.members = formattedMembers;

  try {
    if (!isEmpty(team)) {
      const formattedTeam: Team = formatTeamForGraphql(team);
      return formattedTeam;
    }
  } catch (e) {
    console.log('Error when fetching team');
    return null;
  }
}
