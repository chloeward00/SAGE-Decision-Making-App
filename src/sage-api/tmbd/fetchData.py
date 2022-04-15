from urllib.request import urlopen
import json

url = "https://api.themoviedb.org/3/genre/movie/list?api_key=637ebc34a12fc235b39c60d6e3889d59"
  
# store the response of URL
response = urlopen(url)

# storing the JSON response 
# from url in data
genre_list = json.loads(response.read())

# print the json response
print(genre_list)

with open('./allGenresList.json', 'w') as t:
    json.dump(genre_list, t, indent=4)
