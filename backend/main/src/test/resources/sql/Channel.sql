insert into channel (id, created_at, name, deleted_at, thumbnail_id)
values ('00000000-0000-0000-0000-000000000001', '2025-01-01 00:00:00', 'Channel 1', null, null),
       ('00000000-0000-0000-0000-000000000002', '2025-01-01 00:00:00', 'Channel 6', '2025-01-01 00:00:00', null);

insert into channel_member(member_id, channel_id, created_at, deleted_at, rights)
values ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '2025-01-01 00:00:00',
        null, '["MANAGE", "INVITE", "KICK", "TALK", "WRITE", "READ"]'::jsonb),
       ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '2025-01-01 00:00:00',
        null, '["MANAGE", "INVITE", "KICK", "TALK", "READ"]'::jsonb),
       ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '2025-01-01 00:00:00',
        null, '["MANAGE", "INVITE", "KICK", "TALK", "WRITE", "READ"]'::jsonb),
       ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '2025-01-01 00:00:00',
        '2025-01-01 00:00:00', '["MANAGE", "INVITE", "KICK", "TALK", "WRITE", "READ"]'::jsonb);

insert into storage_file (id, created_at, folder, name)
values ('00000000-0000-0000-0001-000000000001', '2025-01-01 00:00:00', 'channel/00000000-0000-0000-0000-000000000001',
        'image.jpeg'),
       ('00000000-0000-0000-0001-000000000002', '2025-01-01 00:00:00', 'channel/00000000-0000-0000-0000-000000000002',
        'image.jpeg');

insert into channel_file(id, created_at, type, author_id, channel_id, file_id)
values ('00000000-0000-0000-0000-000000000001', '2025-01-01 00:00:00', 'IMAGE', '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0001-000000000001'),
       ('00000000-0000-0000-0000-000000000002', '2025-01-01 00:00:00', 'IMAGE', '00000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0001-000000000002');