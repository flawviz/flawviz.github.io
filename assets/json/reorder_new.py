import json

fields = [
    "Mathematical error",
    "Pop-out effect on data marks",
    "Wrong label placement",
    "Legend-vis inconsistency",
    "Visualization-text disjunction",
    "Typo / grammatical error",
    "Continuous encoding for categorical data",
    "Misuse of periodicity",
    "Failure to display infinite/null values",
    "Misuse of logical relationship",
    "Misuse of sequence",
    "Misuse of hierarchy",
    "Invasion of figurative semantics",
    "Unclear symbols",
    "Unclear proxy for comparison",
    "Illusion of inclusion/intersection/union",
    "Ghost element",
    "Highlighting that resembles data elements",
    "Multiple scales",
    "Text rotation",
    "Stylized effect on data marks",
    "Low foreground-background contrast",
    "Obscuring data with embellishment",
    "Irregular segmentation/shaping",
    "Inconsistent visual encodings",
    "Unstructured layout",
    "Violating the gestalt laws",
    "Multiple channels for the same data type",
    "Large number of units",
    "Label that lacks callout",
    "Stretched imagery",
    "Semantically mismatch",
    "Cut-off imagery",
    "Unconventional analogy of data scales",
    "Informal visualization for humor",
    "Disturbing pattern/imagery",
    "Strong rhetoric",
    "Arrogant wording"
]

with open('anicard_dataset.json', 'r', encoding='gbk', errors='ignore') as file:
    cards = json.load(file)

sorted_cards = sorted(cards, key=lambda x: x["card_id"])

# 遍历JSON数组中的每个元素
for item in sorted_cards:
    if item["title"] in fields:
        # 如果是，则设置new字段的值为1
        item["new"] = 1
        print(item["card_id"], item["title"])
    else:
        # 否则，设置new字段的值为0
        item["new"] = 0

with open('output.json', 'w', encoding='utf-8') as f:
    json.dump(sorted_cards, f, ensure_ascii=False, indent=4)