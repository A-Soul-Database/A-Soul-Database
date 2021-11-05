from datetime import timedelta
from datetime import datetime


def us_to_string(microseconds):
    return (datetime(1, 1, 1) + timedelta(microseconds=microseconds)).strftime('%H:%M:%S') + ',' + str((microseconds % 10**6) // 10**3).zfill(3)


def tracks_to_srt_list(tracks):
    tracks.sort(key=lambda t: t['start'])

    tracks_in_string = []
    for i, t in enumerate(tracks):
        tracks_in_string.append(
            '\n'.join([str(i),
                       us_to_string(t['start']) + ' --> ' +
                       us_to_string(t['end']),
                       t['content']])
        )

    return tracks_in_string


def tracks_to_srt_string(tracks):
    return '\n\n'.join(tracks_to_srt_list(tracks))
