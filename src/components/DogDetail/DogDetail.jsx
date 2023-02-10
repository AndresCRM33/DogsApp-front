import React, {useEffect} from "react";
import styles from "./DogDetail.module.css"
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../../redux/actions/actions";
import Loader from "../Loader/Loader";

export default function DogDetail ({img, name}){

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDogDetail(params.id))
    }, [dispatch, params])

    const dog = useSelector((state) => state.dogDetail)
    // console.log(dog)
    // console.log(params)

    return(<div className={styles.container}>
        <div>
        {dog.length > 0 ? dog.map(d => (
            <div className={styles.container_info}>
                <img src={d.image} alt={d.name} className={styles.image}/>
                <div className={styles.info}>
                    <h1>{d.name}</h1>
                    <h3>Temperaments</h3>
                    <p className={styles.temperaments}>{d.temperaments ? d.temperaments.map(t => t.name).join(", "): d.temperament}</p>
                    <div className={styles.weightHeight}>
                        <div>
                        <h3>weight</h3>
                        <p>{d.weight_min} - {d.weight_max}</p>
                        </div>
                        <div>
                        <h3>height</h3>
                        <p>{d.height_min} - {d.height_max}</p>
                        </div>
                    </div>
                    <h3>Life Span</h3>
                    <p>{d.life_span}</p>
                    <Link to="/Home" className={styles.button}>Home</Link>
                </div>

            </div>
        )):
        (<div>
            <Loader/>
        </div>)
        }
        </div>
    </div>)
}