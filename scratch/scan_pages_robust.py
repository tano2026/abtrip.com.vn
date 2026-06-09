import os
import re

app_dir = r"d:\Web Abtrip\abtrip-web\src\app"
output_file = r"d:\Web Abtrip\abtrip-web\scratch\scan_results.txt"

results = []

for root, dirs, files in os.walk(app_dir):
    for file in files:
        if file == "page.tsx":
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                if "ServiceLandingPage" in content:
                    id_match = re.search(r'id:\s*["\'`](.*?)["\'`]', content)
                    category_match = re.search(r'category:\s*["\'`](.*?)["\'`]', content)
                    title_match = re.search(r'title:\s*["\'`](.*?)["\'`]', content)
                    
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

with open(output_file, "w", encoding="utf-8") as f:
    f.write(f"Found {len(results)} pages using ServiceLandingPage:\n")
    for r in results:
        f.write(f"- File: {r['file']}\n")
        f.write(f"  ID: {r['id']}\n")
        f.write(f"  Category: {r['category']}\n")
        f.write(f"  Title: {r['title']}\n")
        f.write("-" * 40 + "\n")

print(f"Scan complete. Results written to {output_file}")
