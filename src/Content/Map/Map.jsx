import React, { useRef, useEffect } from "react";
import styles from "./Map.module.scss";
import mapboxgl from "mapbox-gl";
import MapOrderForm from "./MapOrderForm";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export const drawRoute = (map, coordinates) => {
    map.flyTo({
        center: coordinates[0],
        zoom: 15,
    });

    map.addLayer({
        id: "route",
        type: "line",
        source: {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates,
                },
            },
        },
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "#ffc617",
            "line-width": 8,
        },
    });
};

const Map = React.memo(({ route, card }) => {
    const map = useRef(null);
    const mapContainer = useRef();
    useEffect(() => {
        mapboxgl.accessToken =
            "pk.eyJ1IjoiZGV2aWxyIiwiYSI6ImNrc243OHFyMTFtNXoyd294dTZjeXQ5MzMifQ.jFf_gORFunWWscb-iDuK4A";
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v9",
            center: [30.3056504, 59.9429126],
            zoom: 10,
            attributionControl: false,
        });
        map.current?.on("load", async () => {
            if (route.length > 0) {
                await drawRoute(map.current, route);
            }
        });

        return () => map.current.remove();
    }, [route]);

    return (
        <div className={styles.map__container}>
            <div className={styles.map} ref={mapContainer}>
                <div className={styles.map__content}>
                    {card.cardName ? <MapOrderForm /> : null}
                </div>
            </div>
        </div>
    );
});

Map.propTypes = {
    route: PropTypes.array,
    card: PropTypes.object,
};

export default connect(
    (state) => ({ route: state.addresses.route, card: state.card }),
    undefined
)(Map);
