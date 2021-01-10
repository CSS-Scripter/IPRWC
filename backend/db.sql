CREATE DATABASE mooiewebshop;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(20) NOT NULL,
    user_street VARCHAR(100) NOT NULL,
    user_postal VARCHAR(10) NOT NULL,
    user_city VARCHAR(100) NOT NULL,
    user_housenumber INT NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE products(
    product_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    product_name VARCHAR(100) NOT NULL,
    product_description VARCHAR(100) NOT NULL,
    product_image VARCHAR(100) NOT NULL,
    product_price FLOAT NOT NULL,
    product_visibility BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(product_id)
);

CREATE TABLE orders(
    user_id UUID NOT NULL,
    order_id UUID UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
    order_date DATE NOT NULL DEFAULT NOW(),
    PRIMARY KEY(order_id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE order_products(
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    amount INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(product_id)
);