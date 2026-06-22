CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,

    tmdb_id INTEGER UNIQUE NOT NULL,

    title VARCHAR(255) NOT NULL,

    release_year INTEGER,

    poster_url TEXT,

    genre VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE watchlists (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    movie_id INTEGER NOT NULL,

    status VARCHAR(20) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_watchlist_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_watchlist_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(id)
        ON DELETE CASCADE
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    movie_id INTEGER NOT NULL,

    rating INTEGER NOT NULL,

    review_text TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_review_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(id)
        ON DELETE CASCADE,

    CONSTRAINT rating_check
        CHECK (
            rating >= 1
            AND
            rating <= 10
        )
);

ALTER TABLE watchlists
ADD CONSTRAINT unique_watchlist_entry
UNIQUE (user_id, movie_id);

ALTER TABLE reviews
ADD CONSTRAINT unique_review
UNIQUE (user_id, movie_id);

CREATE INDEX idx_movies_tmdb
ON movies(tmdb_id);

CREATE INDEX idx_watchlists_user
ON watchlists(user_id);

CREATE INDEX idx_reviews_movie
ON reviews(movie_id);

ALTER TABLE movies
ALTER COLUMN tmdb_id TYPE VARCHAR(50);
