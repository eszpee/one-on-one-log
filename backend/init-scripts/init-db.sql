-- Create user if not exists
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'dev_user') THEN

      CREATE ROLE dev_user LOGIN PASSWORD 'dev_password';
   END IF;
END
$do$;

-- Create database if not exists
CREATE DATABASE one_on_one_log_dev
    WITH 
    OWNER = dev_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TEMPLATE = template0;

GRANT ALL PRIVILEGES ON DATABASE one_on_one_log_dev TO dev_user;
