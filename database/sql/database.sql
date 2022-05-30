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
  team_id     uuid,
  name        text,
  email       text,
  title       text,
  avatar_url  text,
  created_by  text,
  created_at  text,
  updated_at  text,
  deleted_at  text
);

create table hivemind (
  id             uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id        uuid,
  created_by     uuid,
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
  hivemind_id        uuid,
  hivemind_number    integer,
  created_by         uuid,
  assigned_to        uuid,
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
  brainwave_id      uuid,
  created_by        uuid,
  last_edited_by    uuid,
  content           text,
  created_at        text,
  updated_at        text,
  deleted_at        text
);

insert into team (id, name, created_at, updated_at, deleted_at) VALUES ('05ee7384-993c-4399-8a06-a97aeceb5737', 'EF', '2022-05-29T16:35:24.346Z', null, null);

insert into member (id, team_id, name, email, title, avatar_url, created_by, created_at, updated_at, deleted_at) VALUES ('ca37f617-d307-46b3-90ff-29e0f60df321', '05ee7384-993c-4399-8a06-a97aeceb5737', 'Yusuf Khaled', 'yusufkhaled@live.ca', 'Software Engineer', 'https://media-exp1.licdn.com/dms/image/C4E03AQEBEOjXGs6RIA/profile-displayphoto-shrink_400_400/0/1517007799273?e=1659571200&v=beta&t=xtwKcekblH9RqkcL1FRPO57kTdZyShVqbosWCnad4So', null,'2022-05-29T16:35:24.346Z', null, null);
insert into member (id, team_id, name, email, title, avatar_url, created_by, created_at, updated_at, deleted_at) VALUES ('f84a87b5-c92f-43e4-82bc-9b0c049a66c9', '05ee7384-993c-4399-8a06-a97aeceb5737', 'Maja Vujic', 'maja@joinef.com', 'Talent Manager', 'https://media-exp1.licdn.com/dms/image/C5603AQFoua-1Cs-d7A/profile-displayphoto-shrink_800_800/0/1600446837485?e=1659571200&v=beta&t=QpZ4vyWbKqdLrAKoIeG7ELTpZC0D78ybkR7c_k3v_LQ', 'ca37f617-d307-46b3-90ff-29e0f60df321', '2022-05-29T16:35:24.346Z', null, null);
insert into member (id, team_id, name, email, title, avatar_url, created_by, created_at, updated_at, deleted_at) VALUES ('1925c26a-bead-421c-b18a-7778392ba638', '05ee7384-993c-4399-8a06-a97aeceb5737', 'Derek Jouppi', 'derek@entrepreneurfirst.org.uk', 'Special Projects', 'https://media-exp1.licdn.com/dms/image/C4E03AQFZ4j5AgVsqKw/profile-displayphoto-shrink_800_800/0/1634848737582?e=1659571200&v=beta&t=e8KYP3e1xB8xFMtN3lbKkZoI9SHkn_xuGgovjUAuhCE', 'ca37f617-d307-46b3-90ff-29e0f60df321', '2022-05-29T16:35:24.346Z', null, null);

insert into hivemind (id, team_id, created_by, name, code, goal, created_at, updated_at, deleted_at) VALUES ('889477cf-3b23-4271-a1f9-7fe0f210ff5a', '05ee7384-993c-4399-8a06-a97aeceb5737', 'f84a87b5-c92f-43e4-82bc-9b0c049a66c9', 'Exploration into Grit', 'GRT', 'Understand why some founders are able to persevere no matter the circumstances.', '2022-05-29T16:35:24.346Z', null, null);

insert into brainwave (id, hivemind_id, hivemind_number, created_by, assigned_to, due_at, title, description, type, status, created_at, updated_at, deleted_at) VALUES ('beb6faf7-8dd4-46e9-98ff-34d2ea942117', '889477cf-3b23-4271-a1f9-7fe0f210ff5a', 1, 'f84a87b5-c92f-43e4-82bc-9b0c049a66c9', '1925c26a-bead-421c-b18a-7778392ba638', '2022-06-01T11:59:00.000Z', 'Read up on some work by Carol Dweck', 'She is an expert on the topic of Grit, and her work can serve as a guide!', 'spike', 'todo', '2022-05-29T16:35:24.346Z', null, null);
