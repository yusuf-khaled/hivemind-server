CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table team (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        text,
  created_at  text,
  updated_at  text,
  deleted_at  text
);

create table member (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id     uuid REFERENCES team(id),
  name        text,
  email       text,
  title       text,
  created_by  text,
  created_at  text,
  updated_at  text,
  deleted_at  text
);

create table hivemind (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id        uuid REFERENCES team(id),
  created_by     uuid REFERENCES member(id),
  name           text,
  code           text,
  goal           text,
  created_at     text,
  updated_at     text,
  deleted_at     text
);

create type brainwave_type as enum ('reflection', 'spike', 'teaching', 'practice');
create type brainwave_status as enum ('todo', 'wip', 'review', 'done');

create table brainwave (
  id                 uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  hivemind_id        uuid REFERENCES hivemind(id),
  hivemind_number    integer,
  created_by         uuid REFERENCES member(id),
  assigned_to        uuid REFERENCES member(id),
  due_at             text,
  title              text,
  description        text,
  type               brainwave_type,
  status             brainwave_status,
  created_at         text,
  updated_at         text,
  deleted_at         text
);

create table content (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  brainwave_id      uuid REFERENCES brainwave(id),
  created_by        uuid REFERENCES member(id),
  last_edited_by         uuid REFERENCES member(id),
  content           text,
  created_at        text,
  updated_at        text,
  deleted_at        text
);
