// import { GET_ALL_DOGS } from "../actions/actions";

const initialState = {
    dogs: [],
    allDogs: [],
    dogDetail: [],
    temperaments: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_BY_NAME":
            return {
                ...state,
                dogs: action.payload
            }

        case "GET_ALL_DOGS": 
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                dogDetail: []
            }
        case "GET_DOG_DETAIL":
            return {
                ...state,
                dogDetail: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "POST_DOG":
            return {
                ...state
            }
        case "GET_BY_TEMPERAMENTS":
            const allDogs = state.allDogs
            const filterDogs = action.payload === "All" ? 
                                allDogs :
                                allDogs.filter(d => 
                                     d.temperament?.split(", ").includes(action.payload)
                                )
            return {
                ...state,
                dogs: filterDogs
            }
        
        case "GET_BY_DB":
            const getAllDogs = state.allDogs
            const filtedCreated = action.payload === "created" ?
                                    getAllDogs.filter(d =>
                                        d.createInDB === true     
                                    ):
                                    getAllDogs.filter(d => 
                                        d.createInDB !== true    
                                    );
            return{
                ...state,
                dogs: action.payload === "alls" ? getAllDogs : filtedCreated
            }
        
        case "ORDER_BY_NAME":
            const getDogs = state.dogs
            const orderName =  action.payload === "asc" ?
                                getDogs.sort((a, b) => {
                                    if(a.name > b.name) return 1
                                    if(a.name < b.name) return -1
                                    return 0
                                }):
                                getDogs.sort((a, b) => {
                                    if(a.name > b.name) return -1
                                    if(a.name < b.name) return 1
                                    return 0
                                })
            return {
                ...state,
                dogs: orderName
            }

        case "ORDER_BY_WEIGHT":
            const getDogsWeight = state.dogs;
            const allDogsFilter = getDogsWeight.filter(d => d.weight_min !== null)
            const orderWeight = action.payload === "mayor"?
                                allDogsFilter.sort((a, b) => {
                                    // return b.weight_min - a.weight_min;
                                    if(a.weight_min > b.weight_min) return 1
                                    if(a.weight_min < b.weight_min) return -1
                                    return 0
                                }):
                                allDogsFilter.sort((a, b) => {
                                    // return a.weight_min - b.weight_min;
                                    if(a.weight_min > b.weight_min) return -1
                                    if(a.weight_min < b.weight_min) return 1
                                    return 0
                                })
            return{
                ...state,
                dogs: orderWeight
            }
        


        default: 
        return {...state}
    }

}

export default rootReducer;