import React, {useState} from "react";
import styles from "./SearchBar.module.css"
import { useDispatch } from "react-redux";
import { getByName, getAllDogs } from "../../redux/actions/actions";
import swal from "sweetalert"

export default function SearchBar (){

    const [input, setInput] = useState("")
    const dispatch = useDispatch()
    // const dogSearch = useSelector((state) => state.dogs)

    function handleSubmit (e) {
        e.preventDefault()
        dispatch(getByName(input))
        
        if(!input){
            swal({
                title: "Error",
                text: "Please, write a dog breed",
                icon: "warning",
                button: "Okay",
                timer: "2000"
            })
            setInput("")
        }

        setInput("")
    }

    function handleRefresh (){
        dispatch(getAllDogs())
    }

    return(<div className={styles.container}>

        <form>
            <input 
                className={styles.inpText}
                type="text" 
                placeholder="Search Dog"
                value={input}
                onChange={(e) => setInput(e.target.value)}    
            />
            <button 
                className={styles.submitButton}
                type="submit" 
                onClick={(e) => handleSubmit(e)}>Search</button>
        </form>

        <button className={styles.refreshButton} onClick={(e) => handleRefresh(e)}>Refresh</button>
    </div>)
}