import json
 
# Opening JSON file
f = open('../json_files/categories.json')

data = json.load(f)

# print(data)

# with open('./Restaurants/restoCategory.txt', 'w') as t:
#     for i in data:
#         if 'restaurants' in i['parents']:
#             # print(i['title'])
#             t.write(i['alias'])
#             t.write('\n')


with open('./Restaurants/foodCategory.txt', 'w') as t:
    for i in data:
        if 'food' in i['parents']:
            # print(i['title'])
            t.write(i['alias'])
            t.write('\n')


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

# 