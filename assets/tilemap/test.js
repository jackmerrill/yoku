(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("test",
{ "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":10,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"staggered",
 "renderorder":"right-down",
 "staggeraxis":"y",
 "staggerindex":"odd",
 "tiledversion":"1.2.4",
 "tileheight":32,
 "tilesets":[
        {
         "columns":0,
         "firstgid":1,
         "grid":
            {
             "height":1,
             "orientation":"isometric",
             "width":1
            },
         "margin":0,
         "name":"Tileset 1",
         "spacing":0,
         "tilecount":3,
         "tileheight":900,
         "tiles":[
                {
                 "id":0,
                 "image":"grassj1.jpg",
                 "imageheight":900,
                 "imagewidth":900
                }, 
                {
                 "id":1,
                 "image":"grassj2.jpg",
                 "imageheight":900,
                 "imagewidth":900
                }, 
                {
                 "id":2,
                 "image":"grassj3.jpg",
                 "imageheight":900,
                 "imagewidth":900
                }],
         "tilewidth":900
        }],
 "tilewidth":32,
 "type":"map",
 "version":1.2,
 "width":10
});