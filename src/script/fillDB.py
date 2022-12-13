from email import header
import os, requests

directory = 'C:/Users/Adrianos/projects/pweb-back-dev/files/audio'
for filename in os.listdir(directory):
    song = os.path.join(directory, filename)
    print(song)
    files = {'track': open(song,'rb')}
    r = requests.post("https://kset.home.asidiras.dev/track/", files=files)
    print(r)
     