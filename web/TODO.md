TODO
- loading....
- make timeline functionality
- make tagging of data functionality, each tag must have its own geojson. tags should follow the following scheme keyword1:keyword2 where keyword1 is chosen as a start based on aplphaptical order. This should handle the information architecture.
- make a functionality for showing differnt map tiles. so the basic tile is blackandwhite tile but there should be a photogallery overlay on top of the blackandwhite map showing different tiles in a photogallery autoplay manner. slickslider.js
- use geoid to build server-side and client side databases.
- show different info layers https://github.com/jieter/leaflet.layerscontrol-minimap
- after searchbox selection, map gets the focus so user can use arrows to navigate it.
- implement geolocation on serverside or clientside.
- favicon of a rectangle black

##DATA
https://pkgstore.datahub.io/core/world-cities/world-cities_csv/data/6cc66692f0e82b18216a48443b6b95da/world-cities_csv.csv
https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json

##Design
timeline idea for infromation architecture, overlay 2 timelinejs with their controls on top of the map to control 1) tags to plot, 2)timeline of activity, months, years, etc. both controled by up,down,left,right arrow keys making viewing all the info easy while also discoverable. on each timeline stop, the map will bound to a specific view of the city. timelines are zoomable and can be signified by fontawesome icons as a visual identification of the cateogry of data instead of words.


jquery toggle cool design simple of toggle for each dataset and a description
display bounds for each toggle and intersecting toggle bounds.

native-land.ca design
searchbox list should be aligned-left not center
divvy.datasco.pe design
turf.js for geospcial calculations
stuck in each city when selected.
london.webatvantage.be timeline to show from datasets based on updated and history, so if a dataset is public in 2017 and it wad updated in 2018, the map could show backintime info and current info. maybe also future info based on statistical projections!

can I do a gridfate based on the boundries of the city so that when a search is done, only that city is shown and can't be changed unless the user search another city! i.e. hieb-dom.ru

A Matrix/grid of icons and a topbar or providers. icons contain red/green/dimmed(not avialable from any of the providers), hackathon developers tag datasets according to fontawesome icons. so by default include all fontawesome icons and wait for developers to turn it form dimmed to green/red.

with opacity then it is not chosen, without then it is chosen. all photos greyscaled and edited to work with whitebackground.
<img src="img/datasources/worldbank.png" alt="worldbank" style="width: 250px">
