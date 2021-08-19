import './App.css';
import {Switch, Route, Link} from 'react-router-dom';
import {MentorStudent} from './components/mentorStudent.js';
import {AssignMentor} from './components/assignMentor.js';
import {AddStudent} from './components/addStudent.js';
import {AddMentor} from './components/addMentor.js';
import {Header} from './components/header.js';
import {useState} from "react";
import axios from "axios";
import React from 'react';

export const GetStudentsContext = React.createContext(null);
export const GetMentorsContext = React.createContext(null);
export const StudentsContext = React.createContext(null);
export const MentorsContext = React.createContext(null);
export const GetDataContext = React.createContext(null)
export const DataContext = React.createContext(null)

function App() {
  const [data,setData] = useState([]);
    const getData = () => {
        axios.get(`https://mentor-task-back-end-ak.herokuapp.com/task/getassignedstudents`)
        .then(res=>{
            if(res.status===200){
                setData(res.data);
            }
        })
        .catch(res=>console.log(res))
    }
  const [students,setStudents] = useState([]);
  const [mentors,setMentors] = useState([]);
  const getStudents = () => {
      axios.get(`https://mentor-task-back-end-ak.herokuapp.com/task/getstudent`)
      .then(res=>{
        console.log(res);
        if(res.status===200){
          setStudents(res.data);
        }
      })
      .catch(res=>console.log(res))
  }
  const getMentors = () => {
    axios.get(`https://mentor-task-back-end-ak.herokuapp.com/task/getmentor`)
    .then(res=>{
      console.log(res);
      if(res.status===200){
        setMentors(res.data);
      }
    })
    .catch(res=>console.log(res))
  }
  const ulStyle = {
    display:'flex',
    listStyle:'none',
    justifyContent:'space-around'
  }
  const linkStyle={
    textDecoration:'none',
    color:'black',
    fontSize:'large',
    fontWeight:'600'
  }
  return (
    <div className="App">
      <Header/>
      <nav>
        <ul style={ulStyle}>
              <li><Link style={linkStyle} to='/'>Mentor{' & '}Students</Link></li>
              <li><Link style={linkStyle} to='/addmentor'>Add mentor</Link></li>
              <li><Link style={linkStyle} to='/addstudent'>Add student</Link></li>
              <li><Link style={linkStyle} to='/assignmentor'>Assign mentor</Link></li>
        </ul>
      </nav>
      <Switch>
        <GetStudentsContext.Provider value={getStudents}>
          <GetMentorsContext.Provider value={getMentors}>
            <StudentsContext.Provider value={students}>
              <MentorsContext.Provider value={mentors}>
                <GetDataContext.Provider value={getData}>
                  <DataContext.Provider value={data}>
                    <Route exact path='/'>
                        <MentorStudent />
                    </Route>
                    <Route path='/addmentor'>
                        <AddMentor/>
                    </Route>
                    <Route path='/addstudent'>
                        <AddStudent />
                    </Route>
                    <Route path='/assignmentor'>
                        <AssignMentor/>
                    </Route>
                  </DataContext.Provider>
                </GetDataContext.Provider>
              </MentorsContext.Provider>
            </StudentsContext.Provider>
          </GetMentorsContext.Provider>
        </GetStudentsContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
