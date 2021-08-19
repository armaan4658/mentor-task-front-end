import { useContext, useEffect, useState } from "react"
import {AssignedTable} from './assignedTable.js';
import {UpdateMentor} from './updateMentor.js';
import {GetDataContext} from '../App.js'
import CloseIcon from '@material-ui/icons/Close';
export const MentorStudent = () => {
    const getData = useContext(GetDataContext);
    try{
        useEffect(getData,[]);
    }catch(e){
        console.log(e);
    }
    const [update,setUpdate] = useState(false);
    var divClass = ""
    if(update){
        divClass ="update open"
    }else{
        divClass="update"
    }
    return(
        <>
            <div className={divClass}>
                <CloseIcon
                onClick={()=>setUpdate(false)}
                />
                <UpdateMentor/>
            </div>
            <AssignedTable setUpdate={setUpdate}/>
        </>
    )
}