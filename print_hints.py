import json
with open('parsed_30_books.json', 'r', encoding='utf-8') as f:
    books = json.load(f)

for b in books:
    print(f"#{b['stt']} [{b['title'][:35]}]: {b['copies_hint']}")