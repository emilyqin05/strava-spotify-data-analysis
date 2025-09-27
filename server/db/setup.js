const Database = require("better-sqlite3");
const path = require("path");

// open DB connection (creates run_music.sqlite if it doesn’t exist)
const db = new Database(path.join(__dirname, "test_run_music.sqlite"));

// create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS spotify_tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    track_id TEXT,
    track_name TEXT,
    artist_name TEXT,
    played_at DATETIME,
    duration_ms INTEGER
  );

  CREATE TABLE IF NOT EXISTS strava_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activity_id TEXT,
    type TEXT,
    start_time DATETIME,
    end_time DATETIME,
    distance REAL,
    duration INTEGER
  );
`);

const insertSpotify = db.prepare(`
  INSERT INTO spotify_tracks (track_id, track_name, artist_name, played_at, duration_ms)
  VALUES (?, ?, ?, ?, ?)
`);

// TODO: comment this out, this is for testing
insertSpotify.run("abc123", "Lose Yourself", "Eminem", "2025-09-26T18:15:00Z", 326000);
insertSpotify.run("def456", "Blinding Lights", "The Weeknd", "2025-09-26T18:20:00Z", 200000);
insertSpotify.run("ghi789", "Stronger", "Kanye West", "2025-09-26T18:25:00Z", 312000);

// TODO: comment this out, this is for testing
const insertStrava = db.prepare(`
  INSERT INTO strava_activities (activity_id, type, start_time, end_time, distance, duration)
  VALUES (?, ?, ?, ?, ?, ?)
`);

insertStrava.run("run001", "Run", "2025-09-26T18:10:00Z", "2025-09-26T18:40:00Z", 5.2, 1800);

console.log("database created");
