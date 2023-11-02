--USERS
insert into users (id, email,first_name,last_name, password)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', 'admin@example.com', 'James','Bond', '$2a$10$udYPPCXr78OCs9RwZyW/VO5flVhwhkByVEN4U9gPRQSNdIQlR5qT6' ),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'user@example.com', 'Tyler','Durden', '$2a$10$udYPPCXr78OCs9RwZyW/VO5flVhwhkByVEN4U9gPRQSNdIQlR5qT6'),
       ('0d8fa44c-54cd-4cd0-1234-2a7da57992de', 'user@example1.com', 'Hans','Peter', '$2a$10$udYPPCXr78OCs9RwZyW/VO5flVhwhkByVEN4U9gPRQSNdIQlR5qT6')
 ON CONFLICT DO NOTHING;


--ROLES
INSERT INTO role(id, name)
VALUES ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'USER'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', 'ADMIN')
ON CONFLICT DO NOTHING;

--AUTHORITIES
INSERT INTO authority(id, name)
VALUES ('2ebf301e-6c61-4076-98e3-2a38b31daf86', 'USER_CREATE'),
       ('1ad1fccc-d279-46a0-8980-1d91afd6ba67', 'USER_READ'),
       ('5108babc-bf35-44d5-a9ba-de08badfa80a', 'USER_DELETE'),
       ('8304e5ff-6324-4863-ac51-8fcbc6812b13', 'USER_MODIFY'),
       ('7c01a5f0-41b3-4a15-adc5-b0b380bb90e2', 'MY_LIST_ENTRY_CREATE'),
       ('8f4647ee-2ef1-4500-8a28-a0d642665c81', 'MY_LIST_ENTRY_READ'),
       ('bcae4e4e-0e7a-41a2-bc24-560077557c0b', 'MY_LIST_ENTRY_DELETE'),
       ('d20d196b-c329-4a32-a76b-cf5802affcfc', 'MY_LIST_ENTRY_MODIFY')
ON CONFLICT DO NOTHING;

--assign roles to users
insert into users_role (users_id, role_id)
values ('ba804cb9-fa14-42a5-afaf-be488742fc54', '08c71152-c552-42e7-b094-f510ff44e9cb'),
       ('0d8fa44c-54fd-4cd0-ace9-2a7da57992de', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1'),
       ('0d8fa44c-54cd-4cd0-1234-2a7da57992de', 'd29e709c-0ff1-4f4c-a7ef-09f656c390f1')
ON CONFLICT DO NOTHING;

--assign authorities to roles
INSERT INTO role_authority(role_id, authority_id)
VALUES ('08c71152-c552-42e7-b094-f510ff44e9cb', '2ebf301e-6c61-4076-98e3-2a38b31daf86'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', '1ad1fccc-d279-46a0-8980-1d91afd6ba67'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', '5108babc-bf35-44d5-a9ba-de08badfa80a'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', '8304e5ff-6324-4863-ac51-8fcbc6812b13'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', '7c01a5f0-41b3-4a15-adc5-b0b380bb90e2'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', '8f4647ee-2ef1-4500-8a28-a0d642665c81'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', 'bcae4e4e-0e7a-41a2-bc24-560077557c0b'),
       ('08c71152-c552-42e7-b094-f510ff44e9cb', 'd20d196b-c329-4a32-a76b-cf5802affcfc'),
       ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '7c01a5f0-41b3-4a15-adc5-b0b380bb90e2'),
       ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', '8f4647ee-2ef1-4500-8a28-a0d642665c81'),
       ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'bcae4e4e-0e7a-41a2-bc24-560077557c0b'),
       ('d29e709c-0ff1-4f4c-a7ef-09f656c390f1', 'd20d196b-c329-4a32-a76b-cf5802affcfc')
ON CONFLICT DO NOTHING;

--MY_LIST_ENTRIES
INSERT INTO my_list_entry(id, entry_date, entry_priority, entry_text, entry_title, user_id)
VALUES ('af7c1fe6-d669-414e-b066-e9733f0de7a8', '1922-02-02', 'HIGH', 'The test list entry I made', 'Testing :)', '0d8fa44c-54fd-4cd0-ace9-2a7da57992de')
ON CONFLICT DO NOTHING;