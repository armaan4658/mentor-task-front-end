import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
export const AddMentor = () => {
    const validationSchema = Yup.object().shape({
        mentorName: Yup.string().required('Please enter a student name')
    })
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({resolver:yupResolver(validationSchema)})
    const [msg,setMsg] = useState("");
    const onSubmit = (data) => {
        axios.post(`https://mentor-task-back-end-ak.herokuapp.com/task/addmentor`,data)
        .then(res=>{
            if(res.data.message){
                setMsg(res.data.message);
            }
        })
        .catch(res=>console.log(res))
    }
    const hideMsg = () => {
        setTimeout(()=>setMsg(""),1000*10);
    }
    return(
        <>
            <h1>Add Mentor</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',justifyItems:'center'}}>
                <TextField
                variant="outlined"
                label="mentor name"
                {...register("mentorName")}
                />
                {errors.mentorName && (
                    <span style={{color:'red'}}>{errors.mentorName.message}</span>
                )}
                <Button
                type="submit"
                variant="contained"
                >
                    submit
                </Button>
            </form>
            {
                msg?(
                    msg==="green"?(
                        <p>Mentor added successfully</p>
                    ):(
                        <p>Mentor already exists</p>
                    )
                ):(
                    <p></p>
                )
            }
            {msg?hideMsg():""}
        </>
    )
}