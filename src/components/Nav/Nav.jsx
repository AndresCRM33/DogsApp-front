import React from "react";
import styles from "./Nav.module.css"
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function Nav () {
    return(<div className={styles.container}>
        <Link to="/" className={styles.link}>
            <h3 className={styles.logo}>Dogs App</h3>
        </Link>
        <div className={styles.searchBar}>
            <SearchBar/>
        </div>
        <Link to="dog/create" className={styles.link}>
            <button>Create New Dog</button>
        </Link>
        
    </div>)
}