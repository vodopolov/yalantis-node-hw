create table concerts (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    age_limit INT,
    price DECIMAL(10, 2) NOT NULL
);

create table visitors (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INT
);

create table categories (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
);

create table concert_catogories (
    concert_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (concert_id, category_id),
    FOREIGN KEY (concert_id) REFERENCES concerts(id) ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE
)