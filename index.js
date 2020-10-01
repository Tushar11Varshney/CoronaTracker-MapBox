function getData(){
    let url="https://www.trackcorona.live/api/countries";
    fetch(url).then(response=>response.text())
            .then(record=>{
                countriesInfo=JSON.parse(record);
                data=countriesInfo["data"];
                // console.log(data);
                data.forEach(element => {
                    latitude=element.latitude;
                    longitude=element.longitude;
                    cases=element.confirmed;
                    if(cases>500000)
                    {
                        color="rgb(255,0,0)"         //red
                    }
                    else if(cases>10000 && cases<100000)
                    {
                        color="rgb(0,102,255)"          //blue
                    }
                    else
                    {
                        color="rgb(0,204,0)"        //green
                    }
                    new mapboxgl.Marker({
                        color:color
                    })
                    .setLngLat([longitude,latitude])
                    .addTo(map);
                });
            })
}

getData();

mapboxgl.accessToken = 'pk.eyJ1IjoidHVzaGFyMTE3MCIsImEiOiJja2V2b3BrMjgxMXN1MnJwN2U3d2R6azkyIn0.57RVY6HwtjzR80SUNlO9ww';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center:[0,40],
  zoom:4
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
 
function switchLayer(layer) {
var layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
}
 
for (var i = 0; i < inputs.length; i++) {
inputs[i].onclick = switchLayer;
}


// https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/
