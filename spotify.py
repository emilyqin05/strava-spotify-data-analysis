import requests
import time
import datetime
import json

ACCESS_TOKEN = ""

def get_current_track():
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 204:
        # No track currently playing
        return None
    elif response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code, response.text)
        return None

def main():
    while True:
        data = get_current_track()
        if data:
            timestamp = datetime.datetime.now().isoformat()
            track_name = data['item']['name']
            artist = data['item']['artists'][0]['name']
            progress_ms = data['progress_ms']
            duration_ms = data['item']['duration_ms']
            
            log = {
                "time": timestamp,
                "track": track_name,
                "artist": artist,
                "progress_ms": progress_ms,
                "duration_ms": duration_ms
            }
            
            print(log)
            with open("spotify_log.json", "a") as f:
                f.write(json.dumps(log) + "\n")
        
        time.sleep(10)  # wait 10s before polling again

if __name__ == "__main__":
    main()
