import re


class TimelineFormatError(Exception):
    def __init__(self, message: str = "", line: int = None, content: str = None):
        self.line = line
        self.content = content
        self.message = message

        # left the part empty if not provided
        content = ", content '" + content + "'" if content is not None else ""
        line = ", line " + str(line) if line is not None else ""

        super().__init__(message + line + content)


def strong_test(s: str, expected_part: int = None):
    lines = s.split('\n')
    output = []
    prev_time = -1
    # If multiple part, first line must be 'P1'. (part=0)
    # Otherwise, no part mark should be presented. (part=None)
    part = 0 if lines[0] == 'P1' else None

    # line-by-line check
    for i, line in enumerate(lines, 1):
        if line != line.strip():
            raise TimelineFormatError('leading/trailing whitespaces', i, line)
        # match part mark, format: P1, P2, ...
        m = re.fullmatch(r'P(\d)', line)
        if m:
            # current part should be new part - 1
            if part != int(m.group(1)) - 1:
                raise TimelineFormatError('part mark number does not increase sequentially', i, line)
            else:
                # increase part counter to current part, set previous time to -1, add empty container
                part += 1
                prev_time = -1
                output.append([])
                continue
        # match timeline, format: (mm:ss or mmm:ss) + one space + text
        m = re.fullmatch(r'(\d{2,3}):(\d\d)(.+)', line)
        if m:
            # time: seconds < 60, minute can be any 2~3 digit number (00, 01, ..., 999)
            if int(m.group(2)) > 59:
                raise TimelineFormatError('invalid time format', i, line)
            time = int(m.group(1)) * 60 + int(m.group(2))
            if time <= prev_time:
                raise TimelineFormatError('time not increases', i, line)
            else:
                prev_time = time

            # text: length limitation, 1 space between time & text
            text = m.group(3)[1:]
            if m.group(3)[0] != ' ' or text != m.group(3).strip():
                raise TimelineFormatError('should use 1 space between time & text', i, line)
            if len(text) > 40:
                raise TimelineFormatError('text too long (maximum 40 chars)', i, line)
            if re.search(r'\d[:：]\d', text) is not None:
                raise TimelineFormatError('multiple timestamps are found', i, line)

            formatted = (time, text)
            # If part is None, directly append to output.
            # Otherwise, part must be a positive integer and output[-1] must be a list
            if part:
                output[-1].append(formatted)
            else:
                output.append(formatted)
            continue
        raise TimelineFormatError('unknown line', i, line)

    # post line-by-line check
    if not output:
        raise TimelineFormatError('timeline is empty')
    if part:
        if len(output) == 1:
            raise TimelineFormatError('redundant part mark')
        for p_i, p in enumerate(output, 1):
            if not p:
                raise TimelineFormatError(f'part {p_i} is empty')
    if part is None:
        part = 1
    if expected_part is not None and expected_part != part:
        raise TimelineFormatError(f'Expect {expected_part} parts but get {part}')

    return output


def weak_test(s: str, expected_part: int = None):
    lines = s.split('\n')
    output = [[]]
    for i, line in enumerate(lines, 1):
        line = line.strip()
        # skip empty line
        if not line:
            continue
        # match timeline
        m = re.fullmatch(r'(\d*[:：])?(\d+)[:：](\d+)(.+)', line)
        if m:
            time = int(m.group(1)[:-1]) * 3600 if m.group(1) else 0
            formatted = (time + int(m.group(2)) * 60 + int(m.group(3)), m.group(4).strip())
            output[-1].append(formatted)
            continue
        # match part
        m = re.search(r"[pP](\d*)|(\d*)[pP]", line)
        if m:
            output.append([])
            continue
        raise TimelineFormatError('unknown line', i, line)
    return output


if __name__ == '__main__':
    import os
    TIMELINE_DIR = './db/2021/06/timeline'
    for i in os.listdir(TIMELINE_DIR):
        with open(os.path.join(TIMELINE_DIR, i), encoding='utf8') as f:
            try:
                strong_test(f.read())
            except TimelineFormatError as e:
                print(i, e)
