import first from 'lodash/first';
import map from 'lodash/map';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { DB, QueryConfig, APIResponse } from '../../../types';
import { Member, Team, HiveMind, formatBrainwaveForGraphql, UntypedObject, BrainWave } from '../../../models';
import { getDbClient } from '../../../db/connect';

const brainWaveTypeIconUrls = {
  'spike': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/spike.png',
  'learning': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/learning.png',
  'practice': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/practice.png',
  'reflection': 'https://storage.googleapis.com/artifacts.entrepreneurfirsttakehome.appspot.com/icons/reflection.png',
};

export const brainwaves = async (db: DB, args: any) => {
  console.log('Gonna fetch brainwaves');
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

  const hiveMindIds: string[] = [];
  const hiveMindCodeMap: UntypedObject = {};
  map(hiveMindsResult, (res) => {
    hiveMindIds.push(res.id);
    hiveMindCodeMap[res.id] = res.code;
  });

  const brainwaves: any[] = [];
  await Promise.all(map(hiveMindIds, async (hiveMindId) => {
    const brainwaveQuery: QueryConfig = {
      text: 'select * from brainwave where hivemind_id = $1 and deleted_at is null',
      values: [hiveMindId],
    };
    const brainwaveResult = await dbClient.any(brainwaveQuery);
    if (!isEmpty(brainwaveResult)) {
      brainwaves.push(...brainwaveResult);
    }
  }));

  if (brainwaves.length === 0) {
    console.log('Found no brainwaves in the DB!');
    return [];
  }

  // Grabbing member names from the created_by/assigned_to IDs
  const membersNameMap: UntypedObject = {};
  await Promise.all(map(brainwaves, async (wave) => {
    const createdByUserId = wave.created_by;
    const assignedToUserId = wave.assigned_to;

    const memberQuery: QueryConfig = {
      text: 'select * from member where (id = $1 or id = $2) and deleted_at is null',
      values: [createdByUserId, assignedToUserId],
    };
    const membersResult = await dbClient.any(memberQuery);
    console.log('membersResult: ', membersResult);
    if (!isEmpty(membersResult)) {
      membersResult.map((member: any) => {
        const memberId = get(member, 'id');
        const memberName = get(member, 'name');
        const memberAvatarUrl = get(member, 'avatar_url');
        if (!(memberId in membersNameMap)) {
          membersNameMap[memberId] = {
            name: memberName,
            avatarUrl: memberAvatarUrl,
          };
        }
      });
    }
  }));
  console.log('membersNameMap: ', membersNameMap);

  try {
    const formattedBrainWaves: BrainWave[] = map(brainwaves, res => {
      const { name: creatorName, avatarUrl: creatorAvatarUrl } = membersNameMap[res.created_by];
      const { name: assignedToName, avatarUrl: assignedToAvatarUrl } = membersNameMap[res.assigned_to];
      const hiveMindCode = hiveMindCodeMap[res.hivemind_id];
      const brainWaveCode = `${hiveMindCode}-${res.hivemind_number}`;

      const resolvedObj = {
        ...res,
        brainWaveCode,
        created_by: creatorName,
        created_by_avatar_url: creatorAvatarUrl,
        assigned_to: assignedToName,
        assigned_to_avatar_url: assignedToAvatarUrl,
        teamId: team_id,
        teamName: team.name,
      };
      console.log('resolvedObj: ', resolvedObj);
      return formatBrainwaveForGraphql(resolvedObj);
    });
    console.log('formattedBrainWaves: ', formattedBrainWaves);
    return formattedBrainWaves;
  } catch (e) {
    console.log('Error when fetching team');
    return null;
  }
}
