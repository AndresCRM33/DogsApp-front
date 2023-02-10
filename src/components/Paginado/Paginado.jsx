import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado({currentPage, dogsInPage, allDogs, paginado}){

    let pageLength = []

    for(let i = 1; i <= Math.ceil(allDogs.length/dogsInPage); i++){ 
        pageLength.push(i)  // me pushea en pageLength 
    }

    return (<div className={styles.container}>
        <ul className={styles.containerList}>
            <li className={styles.list}>
                <a onClick={(e) => {currentPage > 1 ? paginado(currentPage-1): paginado(currentPage)}}>←</a></li>
            {pageLength.length > 0 ?
                pageLength.map(p => (
                <li className={styles.list} key={p}>
                    <a onClick={() => paginado(p)}>{p}</a>
                </li>)):
                <p>...</p>   
            }
            <li className={styles.list}>
                <a onClick={() => {currentPage < pageLength.length ? paginado(currentPage+1): paginado(currentPage)}}>→</a>
            </li>
        </ul>
    </div>)
}