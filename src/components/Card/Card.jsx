import React from "react";
import styles from "./Card.module.css"
import { Link } from "react-router-dom";

export default function Card ({id, name, image, weight_min, weight_max, temperament, temperaments}){
    if(!temperaments){
    return(<div className={styles.container}>
        <Link to={`/dogs/${id}`} className={styles.link}>
        <img className={styles.image} src={image} alt={name}/>
        <h4 className={styles.name}>{name}</h4>
        <div className={styles.info}>
            <div>
                <strong><p>Temperament</p></strong>
                <p>{temperament}</p>
            </div>
            <div>
                <strong><p>Weigth</p></strong>
                <p>{weight_min} - {weight_max}</p>
            </div>
        </div>
        </Link>
    </div>)}
    else{
        return(<div className={styles.container}>
            <Link to={`/dogs/${id}`} className={styles.link}>
            <img className={styles.image} src={image} alt={name}/>
            <h4 className={styles.name}>{name}</h4>
            <div className={styles.info}>
                <div>
                    <strong><p>Temperament</p></strong>
                    <p>{temperaments?.map(t => t.name).join(", ")}</p>
                </div>
                <div>
                    <strong><p>Weight</p></strong>
                    <p>{weight_min} - {weight_max}</p>
                </div>
            </div>
            </Link>
        </div>)
    }
}