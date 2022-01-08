INSERT INTO departments (name)
VALUES
    ('broadcasting'),
    ('recording'),
    ('marketing'),
    ('events'),
    ('foh');

INSERT INTO roles (title, dept_id, salary)
VALUES
    ('Radio Host', 1, 700000),
    ('Network Engineer', 1, 700000),
    ('Music Producer', 2, 11000000),
    ('Music Publisher', 2, 700000),
    ('Artist Manager', 3, 700000),
    ('Social Media Strategist', 3, 700000),
    ('Concert Stage Engineer', 4, 700000),
    ('Bartender', 5, 700000),
    ('Ticket Attendant', 5, 700000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Luke', 'Clevenger', 1, NULL),
    ('Bright', 'King', 3, NULL),
    ('DJ', 'Synfinity', 3, NULL),
    ('Dr.', 'Dre', 3, 4),
    ('Rihanna', 'Fenty', 2, 4),
    ('Tor E.', 'Hermansen', 4, 4),
    ('Mikkel S.', 'Eriksen', 5, 4),
    ('Katy', 'Perry', 7, 4);

