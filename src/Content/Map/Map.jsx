import React, { useRef, useEffect } from "react";
import styles from "./Map.module.scss";
import mapboxgl from "mapbox-gl";

const Map = React.memo(() => {
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
        return () => map.current.remove();
    }, []);
    return (
        <div className={styles.map__container}>
            <div className={styles.map} ref={mapContainer}>
                <div className={styles.map__content}>Карта</div>
            </div>
        </div>
    );
});

export default Map;
