import os
import re

app_dir = r"d:\Web Abtrip\abtrip-web\src\app"
print("Scanning app directory for ServiceLandingPage...")

results = []

for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file == "page.tsx":
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                if "ServiceLandingPage" in content:
                    # extract id, category, title, subtitle
                    id_match = re.search(r'id=["\'`](.*?)["\'`]', content)
                    category_match = re.search(r'category=["\'`](.*?)["\'`]', content)
                    title_match = re.search(r'title=["\'`](.*?)["\'`]', content)
                    
                    page_id = id_match.group(1) if id_match else "N/A"
                    category = category_match.group(1) if category_match else "N/A"
                    title = title_match.group(1) if title_match else "N/A"
                    
                    relpath = os.path.relpath(filepath, app_dir)
                    results.append({
                        "file": relpath,
                        "id": page_id,
                        "category": category,
                        "title": title
                    })
            except Exception as e:
                print(f"Error reading {filepath}: {e}")

print(f"Found {len(results)} pages using ServiceLandingPage:")
for r in results:
    print(f"- File: {r['file']}")
    print(f"  ID: {r['id']}")
    print(f"  Category: {r['category']}")
    print(f"  Title: {r['title']}")
    print("-" * 40)
