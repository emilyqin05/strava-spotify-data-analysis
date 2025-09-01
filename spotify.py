# i'm going to set up the sqlite database
# and then set up spotify api for authorization
# and i'll set up the job to poll the current track every 5 seconds
# and log it to the sqlite database
# and then I'll test it, going for a run & seeing if it will log the tracks
# post-run, I'll work on the strava analysis & see if there is any way to compare
# TODO: find a database of songs & their details (BPM, upbeatness, etc...)
# lowkey the above idea might be a good project in itself
# match the segments to runnning pace

import sqlite3
import requests
import json
import time

from datetime import datetime

database_file = "spotify_log_final.db"

conn = sqlite3.connect(database_file)

cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS playback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        current_time INTEGER,
        timestamp INTEGER,
        is_playing BOOLEAN,
        progress_ms INTEGER,
        track_id TEXT,
        name TEXT,
        uri TEXT
    )
''')

headers = {
    "Authorization": "Bearer BQAwQQcylErsQCeUC-lGn7lGOQ96b_cSit4mC7U60Kb5gjm96OBxTbjfccyDvJdw3FPkj3vhq96VTyf0WDWQ4PzsYfBbGOoSQD_ZZx9uxH6CV8nBBc1uunIzMr7BOaNSPCm_6mRpDLlw4rdXzUpMUrLnVtiyaRGrl5DcEVZh03zIXkllXM1a8ZzdVD64--cgzhfa1yi2bhx89FwXrRMNpGB4zYPO3bCDzGa4aiFD6tGi7rEyri6CKA"
}

while True:
    response = requests.get('https://api.spotify.com/v1/me/player/currently-playing', headers=headers)
    current_time = int(time.time())  # Unix time in seconds

    if response.status_code != 200:
        print(f"At {current_time}, Error: Received status code {response.status_code}")
    else:
        data = response.json()


        timestamp = data['timestamp']
        is_playing = data['is_playing']
        progress_ms = data['progress_ms']
        item = data['item']
        track_id = item['id']
        name = item['name']
        uri = item['uri']

        cursor.execute('''
            INSERT INTO playback (current_time, timestamp, is_playing, progress_ms, track_id, name, uri)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (current_time, timestamp, is_playing, progress_ms, track_id, name, uri))

        #print(f"timestamp: {timestamp} ({datetime.fromtimestamp(timestamp / 1000)}), is_playing: {is_playing}, progress_ms: {progress_ms}, id: {track_id}, name: {name}, uri: {uri}")

    conn.commit()
    time.sleep(5)

    cursor.execute('SELECT * FROM playback')
    rows = cursor.fetchall()

    # Print each row
    print("\nContents of the playback table:")
    for row in rows:
        print(row)

conn.close()
