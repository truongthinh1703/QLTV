import re
import os

files = [
    'js/database.js',
    'js/storage.js',
    'js/auth.js',
    'js/modules/circulation.js',
    'js/modules/catalog.js',
    'js/modules/admin.js',
    'js/modules/student.js',
    'js/app.js'
]

combined = []
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    # Strip import statements (single-line and multi-line)
    content = re.sub(r'import\s+[\s\S]*?from\s+[\'"][^\'"]+[\'"];?', '', content)
    # Strip export declarations
    content = re.sub(r'\bexport\s+(const|let|var|function|class)\b', r'\1', content)
    # Strip standalone export blocks
    content = re.sub(r'export\s*\{[\s\S]*?\};?', '', content)
    combined.append(f'// ==========================================\n// SECTION: {fpath}\n// ==========================================\n' + content)

bundle_code = '(function() {\n  "use strict";\n\n' + '\n\n'.join(combined) + '\n})();\n'

with open('js/app.bundle.js', 'w', encoding='utf-8') as out:
    out.write(bundle_code)

print('app.bundle.js written successfully. Size:', len(bundle_code), 'bytes')

