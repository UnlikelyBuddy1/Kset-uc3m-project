#!/usr/bin/env python3
""" Pull the header of each mp3 and grab the meta """
import json
import os
from pprint import pprint

import requests
from mutagen.easyid3 import EasyID3
from mutagen.mp3 import MP3


def main():
    """MAIN"""
    kset = KseT("https://kset.home.asidiras.dev")
    kset.track_list_update()
    pprint(kset.tracks[0])
    with open("tracks.json", "w", encoding="utf8") as outfile:
        outfile.write(json.dumps(kset.tracks))


class KseT:

    def __init__(self, root):
        self.root = root
        self.sess = requests.Session()
        self.tracks = self.track_list()

    def track_list_update(self):
        """Add mp3 metadata to JSON"""
        for track in self.tracks:
            print(track)
            meta = self.mp3_meta(track["path"])
            for key, val in meta.items():
                if key not in track:
                    track[key] = val

    def track_list(self):
        """Pull back existing track JSON"""
        return self.sess.get(f"{self.root}/track/?search&index=0&size=999").json()

    def mp3_meta(self, track_path):
        """Get just the header of an mp3"""
        mp3_file = f"mp3/{track_path}"
        if not os.path.exists(mp3_file):
            mp3 = self.sess.get(f"{self.root}/stream/download/{track_path}").content
            with open(mp3_file, "wb") as mp3fh:
                mp3fh.write(mp3)
        meta = MP3(mp3_file, ID3=EasyID3)
        return meta


if __name__ == "__main__":
    main()
