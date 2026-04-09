
import re
import os

file_path = r'c:\Users\abdra\Desktop\Projects\dastur_frontend\src\data\mockTraditions.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the array content
# It start with "export const traditions = [" and ends with "];"
start_marker = "export const traditions = ["
end_marker = "];"
start_idx = content.find(start_marker)
end_idx = content.rfind(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find start or end marker")
    exit(1)

array_content = content[start_idx + len(start_marker):end_idx]

# We need to split into objects. 
# Since it's JS, we can't just json.loads. 
# But we can split by "  {\n    id:" which seems consistent.
# Or better, use regex to find each object block { ... } inside the array.
# The objects are separated by commas.

# Let's try to parse manually.
# Each object starts with '{' and ends with '}' at the top level.
# We will iterate and count braces.

objects = []
current_obj = ""
brace_count = 0
in_obj = False
buffer = ""

for char in array_content:
    if char == '{':
        if brace_count == 0:
            in_obj = True
        brace_count += 1
    
    if in_obj:
        buffer += char
    
    if char == '}':
        brace_count -= 1
        if brace_count == 0:
            in_obj = False
            objects.append(buffer)
            buffer = ""

# Now we have list of strings, each is a JS object.
# We need to parse ID and modify Category.

parsed_objects = []

for obj_str in objects:
    # Extract ID
    id_match = re.search(r'id:\s*(\d+)', obj_str)
    if not id_match:
        continue
    obj_id = int(id_match.group(1))
    
    # Fix Category IDs
    new_obj_str = obj_str
    if obj_id in [101, 102, 100]:
        new_obj_str = re.sub(r"categoryId:\s*'wedding'", "categoryId: 'childhood'", new_obj_str)
        # Also fix title if needed? No, title "Семья и Свадьба" -> "Детство"
        new_obj_str = re.sub(r'category:\s*"Семья и Свадьба"', 'category: "Детство"', new_obj_str)
        
    parsed_objects.append({'id': obj_id, 'content': new_obj_str})

# Define Order
order_map = [
    # Family & Wedding (Chronological: Matchmaking -> Wedding)
    13, 14, 2, 1, 103,

    # Childhood (Chronological: Birth -> Circumcision)
    101, 15, 100, 3, 102, 16, 
    
    # Hospitality & Farewell (Logical: Main Hospitality -> Help -> Farewell)
    4, 17, 6, 18, 19, 104,
    
    # Holidays (Chronological in year)
    8, 7, 5, 108, 20, 21,
    
    # Games (Importance/Popularity: Kokpar first)
    9, 22, 25, 23, 24, 10,
    
    # Crafts (Importance: Yurt first)
    11, 12, 26, 27, 28,
    
    # Funeral (Regional overview + specific traditions)
    109, 105, 106, 107
]

# Sort
def get_order(obj):
    try:
        return order_map.index(obj['id'])
    except ValueError:
        return 9999 # Push unknown to end

parsed_objects.sort(key=get_order)

# Reconstruct File
new_content = "export const traditions = [\n"
for i, obj in enumerate(parsed_objects):
    # Add comment headers for sections
    if obj['id'] == 13: new_content += "\n  /* --- Семья и Свадьба (Family & Wedding) --- */\n"
    if obj['id'] == 101: new_content += "\n  /* --- Детство (Childhood) --- */\n"
    if obj['id'] == 4: new_content += "\n  /* --- Гостеприимство (Hospitality) --- */\n"
    if obj['id'] == 8: new_content += "\n  /* --- Праздники (Holidays) --- */\n"
    if obj['id'] == 9: new_content += "\n  /* --- Национальные Игры (Games) --- */\n"
    if obj['id'] == 11: new_content += "\n  /* --- Ремесла (Crafts) --- */\n"
    if obj['id'] == 109: new_content += "\n  /* --- Похороны (Funeral) --- */\n"

    # Add comma if not last
    suffix = ",\n" if i < len(parsed_objects) - 1 else "\n"
    
    # Indentation and cleaning
    clean_content = obj['content'].strip()
    # Ensure it starts with { and ends with }
    # indent content
    indented = "  " + clean_content.replace("\n", "\n  ")
    new_content += indented + suffix

new_content += "];\n"

# Add header comments from original file
header = content[:start_idx]
final_output = header + new_content

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(final_output)

print("Successfully reordered mockedTraditions.js")
