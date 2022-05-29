import { DB, QueryConfig, APIResponse } from '../../../types';
import { Team, CreateTeamInput } from '../../../models';

export async function createTeam(db: DB, args: CreateTeamInput) {
  const { name, created_by } = args;

  const createdAtTimestamp = new Date().toISOString();

  const query: QueryConfig = {
    text: `INSERT INTO teams(name, created_by, created_at) VALUES($1, $2, $3) RETURNING *`,
    values: [name, created_by, createdAtTimestamp],
  };

  const result = await db.query(query);
  const response: APIResponse<Team> = {
    status: 'fetching',
  };

  try {
    if (result.rowCount > 0) {
      const data = result.rows.map((item: Team) => {
        return {
          id: item.id,
          name: item.name,
          created_by: item.created_by,
          created_at: item.created_at,
        };
      });
      response.status = 'success';
      response.data = data;
    }
  } catch (e) {
    response.status = 'error';
  }

  return response;
}
