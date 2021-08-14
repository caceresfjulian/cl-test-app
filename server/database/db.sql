CREATE DATABASE database_images; 

USE database_images; 

-- USUARIOS
CREATE TABLE users (
    email VARCHAR(45) NOT NULL, 
    nombre VARCHAR(45) NOT NULL, 
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (email); 

-- IMAGENES
CREATE TABLE images (
    id INT(11) NOT NULL,
    email VARCHAR(45) NOT NULL, 
    imagen MEDIUMTEXT NOT NULL,
    creacion timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_email FOREIGN KEY (email) REFERENCES users(email)
);

ALTER TABLE images
    ADD PRIMARY KEY (id);

ALTER TABLE images
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1; 