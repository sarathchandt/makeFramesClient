import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import './viewProgram.css'




function mapComp() {
    const [searchParams] = useSearchParams()

    const [lat, setLat] = useState(searchParams.get('lat'))
    const [long,setLong] = useState(searchParams.get('long'))
    const [props, setProps] = useState()
    const [viewport, setViewport] = useState({});
    const [start, setStart] = useState([viewport?.longitude, viewport?.latitude]);
    const [end, setEnd] = useState([long, lat]);
    const [route, setRoute] = useState(null);
   

    


    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_mapApi;
        new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition((pos) => {

                setViewport({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    zoom: 3.5,
                })
                resolve({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    zoom: 3.5,
                })
            })
        }).then(async (result) => {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [result.longitude, result.latitude], 
                zoom: 12
            });
             new mapboxgl.Marker({
                color: '#FF8C00',
                draggable: true
              })
              .setLngLat([result.longitude, result.latitude])
              .addTo(map);



            async function getRoute() {

                const query = await axios.get(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${result.longitude},${result.latitude};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
            
                );
            
                const data = query.data.routes[0];
                const route = data.geometry.coordinates;
                const geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route
                    }
                };
                if (map.getSource('route')) {
                    map.getSource('route').setData(geojson);
                } else {
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                            type: 'geojson',
                            data: geojson
                        },
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': 5,
                            'line-opacity': 0.75
                        }
                    });
                }
            
            
            }
            

            map.on('load', () => {
                getRoute();

                map.addLayer({
                    id: 'point',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'Point',
                                        coordinates: start
                                    }
                                }
                            ]
                        }
                    },
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#1338f0'
                    }
                });
            });
            map.on('load', () => {
                const coords = [long, lat];

                const end = {
                  type: 'FeatureCollection',
                  features: [
                    {
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: coords
                      }
                    }
                  ]
                };
                if (map.getLayer('end')) {
                  map.getSource('end').setData(end);
                } else {
                  map.addLayer({
                    id: 'end',
                    type: 'circle',
                    source: {
                      type: 'geojson',
                      data: {
                        type: 'FeatureCollection',
                        features: [
                          {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                              type: 'Point',
                              coordinates: coords
                            }
                          }
                        ]
                      }
                    },
                    paint: {
                      'circle-radius': 10,
                      'circle-color': '#f30'
                    }
                  });
                }
                getRoute(coords);
              });

        })

    }, [])

   

    return (
        <>
            <div id='map'></div>
        </>
    )
}

export default mapComp