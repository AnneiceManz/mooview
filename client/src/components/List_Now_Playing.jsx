import React, { useState, useEffect } from 'react'
import NowPlaying from './Now_Playing';
import { Card, Segment } from 'semantic-ui-react'

const ListNowPlaying = () => {

    // this is my original state with an array of students 
    const [movies, setMovies] = useState(null);

    //this is the state needed for the UpdateRequest
    // const [editingStudent, setEditingStudent] = useState(null)


    async function loadMovies() {
        // fetch the data from the backend
        const response = await fetch(
          "http://localhost:8080/api/movie/now_playing/"
        );
        const json = await response.json();
        setMovies(json);
        console.log("this is the json", json);
      }

    useEffect(() => {
        loadMovies();
    }, []);

    // const onSaveStudent = (newStudent) => {
    //     //console.log(newStudent, "From the parent - List of Students");
    //     setStudents((students) => [...students, newStudent]);
    // }


    // //A function to control the update in the parent (student component)
    // const updateStudent = (savedStudent) => {
    //     // console.log("Line 29 savedStudent", savedStudent);
    //     // This function should update the whole list of students - 
    //     loadStudents();
    // }

    // //A function to handle the Delete funtionality
    // const onDelete = (student) => {
    //     //console.log(student, "delete method")
    //     return fetch(`http://localhost:8080/api/students/${student.id}`, {
    //         method: "DELETE"
    //     }).then((response) => {
    //         //console.log(response);
    //         if (response.ok) {
    //             loadStudents();
    //         }
    //     })
    // }

    // //A function to handle the Update functionality
    // const onUpdate = (toUpdateStudent) => {
    //     //console.log(toUpdateStudent);
    //     setEditingStudent(toUpdateStudent);

    // }



    return (
        <div className="mybody">
        <div className="list-students">
            <h2>Now Playing</h2>
            <Segment className='list__movies' style={{overflow:"auto"}}>

            <Card.Group itemsPerRow={6} fluid >
            {movies ? movies.data.results.map((movie) => {return  <NowPlaying key={movie.id} movie={movie} />}) : null}
                {/* // <li>{students ? students.data.results[0].original_title:null}</li> */}
            </Card.Group>
            </Segment>
        </div>
        {/* <MyForm key={editingStudent ? editingStudent.id : null} onSaveStudent={onSaveStudent} editingStudent={editingStudent} onUpdateStudent={updateStudent} /> */}
        </div>
    );
}


export default ListNowPlaying