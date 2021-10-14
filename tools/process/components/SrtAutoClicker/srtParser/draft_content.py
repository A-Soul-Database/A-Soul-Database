import json


def draft_content_to_tracks(draft_content):
    texts = {t['id']: t['content']
             for t in draft_content['materials']['texts']
             if t['type'] == 'subtitle'}

    """[
        'start': (μs),
        'end': (μs),
        'content': (...)
    }]"""
    tracks = []
    for t in draft_content['tracks']:
        for s in t['segments']:
            if s['material_id'] in texts.keys():
                timerange = s['target_timerange']
                tracks.append({
                    'start': timerange['start'],
                    'end': timerange['start'] + timerange['duration'],
                    'content': texts[s['material_id']]
                })

    return tracks


def read_draft_content_src(directory):
    with open(directory, 'r', encoding='utf-8') as f:
        draft_content = json.loads(f.read())
    
    return draft_content_to_tracks(draft_content)
