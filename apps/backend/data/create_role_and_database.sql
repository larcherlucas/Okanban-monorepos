DROP DATABASE okanban;
DROP ROLE okanban; 

CREATE ROLE okanban WITH LOGIN PASSWORD 'okanban';
CREATE DATABASE okanban OWNER okanban;
 