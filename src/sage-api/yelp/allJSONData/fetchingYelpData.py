import json

with open('../allYelpCategories/categories.json') as f:
    data = json.load(f)

sports = [  "airsoft",
            "amateursportsteams",
            "archery",
            "badminton",
            "baseballfields",
            "basketballcourts",
            "beachvolleyball",
            "fencing",
            "football",
            "golf",
            "gymnastics",
            "handball",
            "horsebackriding",
            "horseracing",
            "mountainbiking",
            "paddleboarding",
            "races",
            "racingexperience",
            "rafting",
            "sport_equipment_hire",
            "sports_clubs",
            "squash",
            "tennis",
            "volleyball"
        ]

chill = ["beautysvc", "shopping", "museums", "arts", "wineries", "movietheaters"]

active = ["sports", "nightlife", "fitness", "active", "festivals", "zoos"]


# ACTIVE CATEGORY
only_active = []
for cat in data['categories']:
    if cat['alias'] in active:
        only_active.append(cat)

with open('./allActiveCategories.json', 'w') as t:
    json.dump(only_active, t, indent=4)

# CHILL CATEGORY
only_chill = []
for cat in data['categories']:
    if cat['alias'] in chill:
        only_chill.append(cat)

with open('./allChillCategories.json', 'w') as t:
    json.dump(only_chill, t, indent=4)

# SPORTS CATEGORY
only_sports = []
for cat in data['categories']:
    if cat['alias'] in sports:
        only_sports.append(cat)

with open('./allSportsCategories.json', 'w') as t:
    json.dump(only_sports, t, indent=4)

# RESTAURANTS CATEGORY
only_resto = []
for cat in data['categories']:
    if 'restaurants' in cat['parents']:
        only_resto.append(cat)

with open('./allRestoCategories.json', 'w') as t:
    json.dump(only_resto, t, indent=4)

# FOOD CATEGORY 
only_food = []
for cat in data['categories']:
    if 'food' in cat['parents']:
        only_food.append(cat)
    
with open('./allFoodCategories.json', 'w') as t:
    json.dump(only_food, t, indent=4)

# -------------------------------------------------------------- # 

# with open('allParents.txt', 'w') as t:
#     li = []
#     for i in data:
#         for j in i['parents']:
#             if j not in li:
#                 li.append(j)
    
#     for i in li:
#         t.write(i)
#         t.write('\n')


# THIS WRITES THE ACTIVE CATEGORIES ON ALLACTIVE TXT FILE
# with open('./Activities/allActive.txt', 'w') as t:
#     li = []
#     for i in data:
#         for j in i['parents']:
#             if j not in li and j == 'active':
#                 li.append(i['alias'])
#     for i in li:
#         t.write(i)
#         t.write('\n')

# li = []
# for i in data:
#     for j in i['parents']:
#         if j not in li and j == 'active':
#             li.append(i['title'])
            
    # if i['parents'] not in li:
    #     li.append(i['parents'])
    # print(i['parents'])


# Closing file
f.close()