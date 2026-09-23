import re

BASE = '/home/claude/techbait'

with open(f'{BASE}/parts/header.html') as f:
    HEADER = f.read()
with open(f'{BASE}/parts/footer.html') as f:
    FOOTER = f.read()

PAGES = [
    {
        'file': 'index.html',
        'active': None,
        'title': 'TechBait — Software Studio for Web, Mobile & Cloud',
        'desc': 'TechBait is a full-stack software studio designing and building web platforms, mobile apps and cloud infrastructure for startups and enterprises.',
    },
    {
        'file': 'about.html',
        'active': 'ABOUT',
        'title': 'About Us — TechBait',
        'desc': 'Meet the team behind TechBait and the principles that shape how we design and build software.',
    },
    {
        'file': 'services.html',
        'active': 'SERVICES',
        'title': 'Services — TechBait',
        'desc': 'Web development, mobile apps, cloud & DevOps, UI/UX design and product strategy — everything your product needs.',
    },
    {
        'file': 'process.html',
        'active': 'PROCESS',
        'title': 'Our Process — TechBait',
        'desc': 'A predictable six-stage process from discovery to launch and ongoing support.',
    },
    {
        'file': 'work.html',
        'active': 'WORK',
        'title': 'Our Work — TechBait',
        'desc': 'Selected products TechBait has designed, built and scaled across fintech, healthtech, logistics and retail.',
    },
    {
        'file': 'faq.html',
        'active': 'FAQ',
        'title': 'FAQ — TechBait',
        'desc': 'Answers to the questions we hear most about timelines, pricing, IP ownership and support.',
    },
    {
        'file': 'contact.html',
        'active': 'CONTACT',
        'title': 'Contact Us — TechBait',
        'desc': 'Get in touch with TechBait to start your next web, mobile or cloud project.',
    },
    {
        'file': 'careers.html',
        'active': 'CAREERS',
        'title': 'Careers — TechBait',
        'desc': 'Open engineering and design roles at TechBait, a remote-friendly software studio.',
    },
]

ACTIVE_KEYS = ['ABOUT', 'SERVICES', 'PROCESS', 'WORK', 'FAQ', 'CONTACT', 'CAREERS']

HEAD_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%233a185b%22/><text x=%2250%22 y=%2265%22 font-size=%2244%22 fill=%22%23e66608%22 text-anchor=%22middle%22 font-family=%22sans-serif%22>T</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/main.css">
</head>
<body>
"""

for page in PAGES:
    header = HEADER
    for key in ACTIVE_KEYS:
        cls = 'is-active' if key == page['active'] else ''
        header = header.replace(f'__ACTIVE_{key}__', cls)

    with open(f'{BASE}/parts/content-{page["file"]}') as f:
        content = f.read()

    html = HEAD_TEMPLATE.format(title=page['title'], desc=page['desc'])
    html += header + '\n' + content + '\n' + FOOTER + '\n</body>\n</html>\n'

    with open(f'{BASE}/{page["file"]}', 'w') as f:
        f.write(html)

    print('wrote', page['file'])
