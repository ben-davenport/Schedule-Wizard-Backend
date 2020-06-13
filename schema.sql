create table business(
    id serial primary key,
    business_address varchar not null,
    business_name varchar not null,
    business_email varchar
);

create table users( 
    id serial primary key,
    firstname varchar not null,
    lastname varchar not null,
    email varchar(50) not null,
    pw varchar(50) not null,
    business_id integer references business(id),
    is_admin boolean default false,
    token varchar(50) DEFAULT null,
);

create table shift(
    id serial primary key, 
    user_id integer references users(id),
    business_id integer references business(id),
    start_time timestamptz,
    end_time timestamptz
);

create table timeoff(
    id serial primary key,
    user_id integer references users(id),
    business_id integer references business(id),
    start_time timestamptz,
    end_time timestamptz,
    approved boolean DEFAULT false
);

create type DOW as ENUM(
    'Monday', 'Tuesday', 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday' 
);

create table is_available(
    id serial primary key,
    user_id integer references users(id),
    business_id integer references business(id),
    day_of_week dow not null,
    start_time time,
    end_time time,
    approved boolean DEFAULT false
);
