// export const GET_ALL_DOGS = "GET_ALL_DOGS";
// export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
// export const CREATE_DOG = "CREATE_DOG";

import axios from "axios"

// const host = "http://localhost:3001"
const host = "https://back-pi-production-3ad5.up.railway.app"

export const getAllDogs = () => dispatch => {
    return(
    fetch(host + "/dogs")
        .then(data => data.json())
        .then(json => dispatch({type: "GET_ALL_DOGS", payload: json}))
        // .catch(() => {console.log("Error al cargar los datos")})
    )
} 

// export function getAllDogs(){
//     return function(dispatch){
//         axios.get("http://localhost:3001/dogs")
//         .then((response) =>{
//             dispatch({type: "GET_ALL_DOGS", payload: response.data})
//         })
//     }
// }

export const getByName = (name) => dispatch => {
    return(
        fetch(host + `/dogs?name=${name}`)
        .then(data => data.json())
        .then(json => dispatch({type: "GET_BY_NAME", payload: json}))
    )
}

export const getDogDetail = (id) => dispatch => {
    return(
        fetch(host + `/dogs/${id}`)
        .then(data => data.json())
        .then(json => dispatch({type: "GET_DOG_DETAIL", payload: json}))
    )
}

export const getTemperaments = () => dispatch => {
    return(
        fetch(host + "/temperaments")
        .then(data => data.json())
        .then(json => dispatch({type: "GET_TEMPERAMENTS", payload: json}))
    )
}

export const postDog = (dog) => {
    return function(){
        axios.post(host + "/dogs", dog)
        .then((response) => {
            return response.data
        })
    }
}


////////FILTRADOS////////////////

export const filterByTemperament = (temperament) => {
    return(
        {type: "GET_BY_TEMPERAMENTS", payload: temperament}
    )
}

export const filterByDb = (CreatedInDB) => {
    return(
        {type: "GET_BY_DB", payload: CreatedInDB}
    )
}

/////////ORDENAMIENTOS///////////

export const orderByName = (order) => {
    return(
        {type: "ORDER_BY_NAME", payload: order}
    )
}

export const orderByWeight = (weight) =>{
    return(
        {type: "ORDER_BY_WEIGHT", payload: weight}
    )
}

