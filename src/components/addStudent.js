import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
export const AddStudent = () => {
    const validationSchema = Yup.object().shape({
        studentName: Yup.string().required('Please enter a student name')
    })
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({resolver:yupResolver(validationSchema)})
    const [msg,setMsg] = useState("");
    const onSubmit = (data) => {
        axios.post(`https://mentor-task-back-end-ak.herokuapp.com/task/addstudent`,data)
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
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid',justifyItems:'center'}}>
                <TextField
                variant="outlined"
                label="student name"
                {...register("studentName")}
                />
                {errors.studentName && (
                    <span style={{color:'red'}}>{errors.studentName.message}</span>
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
                        <p>Student added successfully</p>
                    ):(
                        <p>student already exists</p>
                    )
                ):(
                    <p></p>
                )
            }
            {msg?hideMsg():""}
        </>
    )
}