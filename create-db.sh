dropdb -p 5432 schedulewizard
createdb schedulewizard

psql -f schema.sql schedulewizard
psql -f seed.sql schedulewizard
