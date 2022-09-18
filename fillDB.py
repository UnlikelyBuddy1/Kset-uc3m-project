from email import header
import os, requests

directory = 'C:/Users/Adrianos/Desktop/PlaylistAdri'
for filename in os.listdir(directory):
    song = os.path.join(directory, filename)
    print(song)
    files = {'track': open(song,'rb')}
    r = requests.post("http://localhost:6969/track/", files=files)
    print(r)
     