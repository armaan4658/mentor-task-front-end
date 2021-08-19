import { useEffect } from "react"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import {useState,useContext} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import axios from "axios";
import {
    GetStudentsContext,GetMentorsContext,
    StudentsContext,MentorsContext ,GetDataContext
} from '../App.js';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const UpdateMentor = () => {
    const getStudents = useContext(GetStudentsContext);
    const getMentors = useContext(GetMentorsContext);
    const students = useContext(StudentsContext);
    const mentors = useContext(MentorsContext);
    const getData = useContext(GetDataContext);
    const getMentStud = () => {
        getStudents();
        getMentors();
    }
    try{
        useEffect(getMentStud,[]);
    }catch(e){
        console.log(e);
    }
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        mentorName : Yup.string().required('Please select a mentor'),
        studentName : Yup.string().required('Please select a student')
    })
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({resolver:yupResolver(validationSchema)});
    const [msg,setMsg] = useState("");
    const onSubmit = (data) => {
        axios.patch(`https://mentor-task-back-end-ak.herokuapp.com/task/updatementor`,data)
        .then(res=>{
            if(res.data.message){
                setMsg(res.data.message);
            }
            if(res.data.message==="green"){
                getData();
            }
        })
        .catch(res=>console.log(res))
    }
    const hideMsg = () => {
        setTimeout(()=>setMsg(""),1000*10);
    }
    return(
        <div style={{display:'grid',placeItems:'center'}}>
            <h1>Update mentor</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Mentor</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Mentor"
                          {...register("mentorName")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {mentors.map((m)=>(
                              <MenuItem value={m.mentorName}>{m.mentorName}</MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                    {errors.mentorName && (
                        <span style={{color:'red'}}>{errors.mentorName.message}</span>
                    )}
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Student</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          label="Student"
                          {...register("studentName")}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {students.map((s)=>(
                              <MenuItem value={s.studentName}>{s.studentName}</MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                    {errors.studentName && (
                        <span style={{color:'red'}}>{errors.studentName.message}</span>
                    )}
                </div>
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
                        <p>Updated mentor successfully</p>
                    ):(
                        <p>{msg}</p>
                    )
                ):(
                    <p></p>
                )
            }
            {msg?hideMsg():""}
        </div>
    )
}