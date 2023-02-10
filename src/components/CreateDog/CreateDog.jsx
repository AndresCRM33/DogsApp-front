import React, {useState, useEffect} from "react";
import styles from "./CreateDog.module.css"
import { Link } from "react-router-dom";
import swal from "sweetalert"

import { getTemperaments, postDog } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import image from "../../images/dog.jpg"
// import image2 from "../../images/dog2.jpg"

////////// VALIDACIONES DEL FORMULARIO //////////

    function validate (newDog){
        let errors = {}

        if(!newDog.name){
            errors.name = "name is required"
        }
        else if(!newDog.height_min){
            errors.height_min = "Height min is required"
        }
        else if(!newDog.height_max){
            errors.height_max = "Height max is required"
        }
        else if(!newDog.weight_min){
            errors.weight_min = "Weight min is required"
        }
        else if(!newDog.weight_max){
            errors.weight_max = "Weight max is required"
        }
        else if(!newDog.life_span){
            errors.life_span = "Life span is required"
        }
        

        else if(Number(newDog.height_max) < Number(newDog.height_min)){
            errors.height_min = "La altura minima debe ser menor a la altura mayor"
        }
        else if(Number(newDog.weight_max) < Number(newDog.weight_min)){
            errors.weight_min = "El peso minimo debe ser menor al peso mayor"
        }

        return errors;
    }


export default function CreateDog () {

    const [newDog, setNewDog] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperament: []

    })

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperaments())
        // dispatch(postDog(newDog))
    },[dispatch])

    const temps = useSelector((state) => state.temperaments)

    //HANDLES

    const handleChange = (e) => {
        e.preventDefault()
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...newDog,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if( newDog.name !== "" && newDog.height_max !== "" && 
            newDog.height_min !== "" && newDog.weight_max !== "" && 
            newDog.weight_min !== "" && newDog.temperament.length !== 0 &&
            newDog.life_span !== ""){
                dispatch(postDog(newDog))
                swal({
                    title: "Success",
                    text: "Dog created successfully",
                    icon: "success",
                    button: "Okay"
                })
                setNewDog({
                    name: "",
                    height_min: "",
                    height_max: "",
                    weight_min: "",
                    weight_max: "",
                    life_span: "",
                    image: "",
                    temperament: []
                })
            }else{
                swal({
                    title: "Error",
                    text: "Please complete all required fields",
                    icon: "error",
                    button: "Okay"
                })
            }
    }

    // TEMPERAMENTOS

    const addTemperament = (e) => {
        if(!newDog.temperament.includes(e.target.value)){
            setNewDog(
                {
                ...newDog,
                temperament: [...newDog.temperament, e.target.value]
            })
        }else if(newDog.temperament.includes(e.target.value)){
            setNewDog({
                ...newDog,
                temperament: [...newDog.temperament]
            })
        }
    }

    const deleteTemperament = (e) => {
        setNewDog({
            ...newDog,
            temperament: newDog.temperament.filter(t => t !== e)
        })
    }

    return(<div className={styles.container}>

        <h1 className={styles.tittle}>Create new breed of dog</h1>
        
        <form 
            className={styles.formulary}
            onSubmit={(e) => { handleSubmit(e) }}
            >

            <img className={styles.image} src={image} alt="create dog" />
            {/* <img className={styles.image2} src={image2} alt="create dog" /> */}

            <label className={styles.label}>Name</label>
            <input 
                className={styles.input}
                name="name"
                type="text" 
                placeholder="Name..."
                value={newDog.name}
                onChange={(e) => handleChange(e)}
            />
            {errors.name && (
                <p className={styles.error}>{errors.name}</p>
            )}
            <label className={styles.label}>Min height</label>
            <input 
                className={styles.input}
                name="height_min"
                type="number" 
                placeholder="Min height"
                value={newDog.height_min}
                onChange={(e) => handleChange(e)}
            />
            {errors.height_min && (
                <p className={styles.error}>{errors.height_min}</p>
            )}
            <label className={styles.label}>Max height</label>
            <input 
                className={styles.input}
                type="number" 
                name="height_max"
                placeholder="Max height"
                value={newDog.height_max}
                onChange={(e) => handleChange(e)}
            />
            {errors.height_max && (
                <p className={styles.error}>{errors.height_max}</p>
            )}
            <label className={styles.label}>Min weight</label>
            <input 
                className={styles.input}
                name="weight_min"
                type="number" 
                placeholder="Min weight"
                value={newDog.weight_min}
                onChange={(e) => handleChange(e)}
            />
            {errors.weight_min && (
                <p className={styles.error}>{errors.weight_min}</p>
            )}
            <label className={styles.label}>Max weight</label>
            <input 
                className={styles.input}
                name="weight_max"
                type="number" 
                placeholder="Max weight"
                value={newDog.weight_max}
                onChange={(e) => handleChange(e)}
            />
            {errors.weight_max && (
                <p className={styles.error}>{errors.weight_max}</p>
            )}
            <label className={styles.label}>Life Span (years)</label>
            <input 
                className={styles.input}
                name="life_span"
                type="number" 
                placeholder="Life Span"
                value={newDog.life_span}
                onChange={(e) => handleChange(e)}
            />
            {errors.life_span && (
                <p className={styles.error}>{errors.life_span}</p>
            )}
            <label className={styles.label}>Image</label>
            <input 
                className={styles.input}
                name="image"
                type="text" 
                placeholder="Link image"
                value={newDog.image}
                onChange={(e) => handleChange(e)}
            />
            <label className={styles.label}>Temperaments</label>
            <select className={styles.selectTemps} name="temperaments" key="temperaments" onChange={(e) => addTemperament(e)}>
                <option>-</option>
                {temps.length > 0 ? temps.map(t => (<option key={t.id} value={t.name}>{t.name}</option>)): (<option>Searching temperaments...</option>)}
            </select>
            <div className={styles.temperamentList}>
            {newDog.temperament.map(temp => <div className={styles.tempsSelect} key={temp}>
                <p>{temp}</p>
                <button onClick={() => deleteTemperament(temp)}>x</button>
            </div>)}
            </div>
            <button className={styles.submitButton} type="sumbit" disabled={
                errors.name || errors.height_min || errors.height_max || errors.weight_min ||
                errors.weight_max || errors.life_span
                }>Create</button>
        </form>
        <Link to="/Home" className={styles.homeButton}>
            Home
        </Link>
    </div>)
}