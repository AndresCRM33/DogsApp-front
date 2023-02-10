import React, {useEffect, useState} from "react";
import styles from "./Home.module.css"
// import fondo from "../../images/fondo.webp"
import Nav from "../Nav/Nav";
import Paginado from "../Paginado/Paginado";
import Loader from "../Loader/Loader.jsx";
import {getAllDogs, getTemperaments, filterByTemperament, filterByDb, orderByName, orderByWeight} from "../../redux/actions/actions.js"
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";

function Home (){

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDogs())
        dispatch(getTemperaments())
    },[dispatch])

    let allDogs = useSelector((state) => state.dogs)


    /////PAGINADO//////

    const [currentPage, setCurrentPage] = useState(1); // Pagina actual
    const [dogsInPage, setDogsInPage] = useState(8); // Perros por pagina
    const indexLastDog = currentPage * dogsInPage; // Ultimo perro por página
    const indexFirstDog = indexLastDog - dogsInPage; // Primer perro de cada página
    const currentDogs = allDogs.slice(indexFirstDog, indexLastDog); // el slice selecciona solo los perros
                                                                //entre el primer y ultimo perro de cada pagina
    // console.log(setDogsInPage)

    const paginado = (page) =>{
        setCurrentPage(page)  // funcion para modificar el estado de la pagina actual (cambia de página)
    }


    /////TEMPERAMENTOS////

    let allTemperaments = useSelector((state) => state.temperaments);

    const filterTemperament = (e) => {
        e.preventDefault(e);
        setCurrentPage(1);
        dispatch(filterByTemperament(e.target.value))
    }

    const filterCreated = (e) => {
        setCurrentPage(1);
        dispatch(filterByDb(e.target.value))
    }


    //////ORDENAMIENTOS/////////

    const [order, setOrder] = useState("")

    // console.log(order)
    
    const orderName = (e) => {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }


    const orderWeight = (e) => {
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    ////////////////////////////

    return(<div className={styles.container}>
        {/* <img src={fondo} alt={fondo}/> */}
        <Nav/>
        {/* filtrados */}
        <div className={styles.filtersAndOrders} key="filtersAndOrders">
            <div className={styles.filters} key="filters">
                <h4>Filter</h4>
                <div>
                <p>By temperament</p>
                <select onChange={(e) => filterTemperament(e)}>
                    <option key="All" value="All">All</option>
                    {allTemperaments.map(t => (<option key={t.id} value={t.name}>{t.name}</option>))}
                </select>
                </div>
                <div>
                <p>Existent or created</p>
                <select onChange={(e) => filterCreated(e)} key="createds">
                    <option key="alls" value="alls">All</option>
                    <option key="existent" value="existent">Existent</option>
                    <option key="created" value="created">Created</option>
                </select>
                </div>
            </div>
            <div className={styles.filters}>
                <h4>Order</h4>
                <div>
                    <p>By name</p>
                    <select onChange={(e) => orderName(e)}>
                        <option key="asc" value="asc">A - Z</option>
                        <option key="dsc" value="dsc">Z - A</option>
                    </select>
                </div>
                <div>
                    <p>By weight</p>
                    <select onChange={(e) => orderWeight(e)}>
                        <option key="mayor" value="mayor">Ascendent</option>
                        <option key="menor" value="menor">Descendent</option>
                    </select>
                </div>
            </div>
        </div>
        <h2>Page {currentPage}</h2>
        <div className={styles.cards}>
        {currentDogs.length > 0 ? currentDogs.map(d => (
            <div>
                <Card
                key={d.name}
                id= {d.id}
                name= {d.name} 
                image= {d.image} 
                temperament= {d.temperament}
                temperaments = {d.temperaments} 
                weight_min= {d.weight_min}
                weight_max= {d.weight_max}
                />
            </div>
        )):
        (<div className={styles.loader}>
            <Loader/>
        </div>)
        }
        </div>
        <Paginado
            className={styles.paginado}
            dogsInPage= {dogsInPage}
            allDogs= {allDogs}
            paginado= {paginado}
            currentPage= {currentPage}
        />
    </div>)
}

export default Home