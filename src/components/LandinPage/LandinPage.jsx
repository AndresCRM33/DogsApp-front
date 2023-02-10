import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandinPage.module.css";
import image from "../../images/dogsWelcome.png"
import swal from "sweetalert"

export default function LandinPage (){

    function About(e){
        e.preventDefault()
        swal({
            title: "What is DogsApp?",
            text: "Is an SPA (Single Page Aplication), in wich you can search and create breed of dogs, you can sort and filter them, either by weight or alphabetically... This app was created with React.js, Redux, Express and Sequielize",
            icon: "info"
        })
    }

    return(<div className={styles.container}>
        <div className={styles.containerWelcome}>
            <h1>¡Welcome to DogsAPP!</h1>
            <Link to="/Home" className={styles.buttonStart}>Start</Link>
            <button className={styles.buttonStart} onClick={(e) => About(e)}>About</button>
        </div>
        <div className={styles.containerImg}>
            <img src={image} alt="Dogs"/>
        </div>
        </div>)
}