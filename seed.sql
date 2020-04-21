insert into business
    (business_address, business_name, business_email)
VALUES
    ('3432 Piedmont Rd NE','Octane', 'atv@octane.com'),
    ('1168 Howell Mill Rd', 'Brash', 'thebox@brash.com')
;

insert into users
    (firstname, lastname, email, business_id, is_admin)
VALUES
    ('Joe', 'Noto', 'atv@octane.com', 1, FALSE),
    ('Andrew', 'Mickney', 'westside@octane.com', 1, TRUE),
    ('Chris', 'Wallace','thebox@brash.com', 2, TRUE),
    ('Hannah', 'Banana', 'hannah@brash.com', 2, FALSE)
;

INSERT into shift
    (user_id, business_id, start_time, end_time)
VALUES
    (1, 1, '2020-05-02 08:00:00 -6:00', '2020-05-02 12:00:00 -6:00'),
    (1, 1, '2020-05-03 08:00:00 -6:00', '2020-05-03 12:00:00 -6:00'),
    (2, 1, '2020-05-02 08:00:00 -6:00', '2020-05-02 12:00:00 -6:00'),
    (2, 1, '2020-05-03 08:00:00 -6:00', '2020-05-03 12:00:00 -6:00'),
    (3, 2, '2020-05-02 08:00:00 -6:00', '2020-05-02 12:00:00 -6:00'),
    (3, 2, '2020-05-03 08:00:00 -6:00', '2020-05-03 12:00:00 -6:00'),
    (4, 2, '2020-05-02 08:00:00 -6:00', '2020-05-02 12:00:00 -6:00'),
    (4, 2, '2020-05-04 08:00:00 -6:00', '2020-05-04 12:00:00 -6:00')
;

INSERT into timeoff
    (user_id, business_id, start_time, end_time)
VALUES
    (1,1,'2021-01-08 04:00:06 -6:00 ', '2021-01-15 23:05:06 -6:00'),
    (2,1,'2021-01-08 04:00:06 -6:00 ', '2021-01-15 23:05:06 -6:00'),
    (3,2,'2021-01-08 04:00:06 -6:00 ', '2021-01-15 23:05:06 -6:00'),
    (1,1,'2021-02-04 04:00:06 -6:00 ', '2021-02-05 23:05:06 -6:00'),
    (4,2,'2021-01-08 04:00:06 -6:00 ', '2021-01-15 23:05:06 -6:00')
;

INSERT into is_available
    (user_id, business_id, day_of_week, start_time, end_time)
VALUES
    (1,1,'Monday', '08:00 AM','12:00 PM'),
    (1,1,'Friday', '08:00 AM','12:00 PM'),
    (2,1,'Saturday', '08:00 AM','12:00 PM'),
    (3,2,'Sunday', '08:00 AM','12:00 PM'),
    (4,2,'Tuesday', '08:00 AM','12:00 PM')
    ;