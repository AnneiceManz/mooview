import React from 'react';
import * as ioicons from 'react-icons/io5'
import { Card, Image } from 'semantic-ui-react'

const NowPlaying = ({movie}) => {

    // const onUpdate = (toUpdateStudent) => {
    //     toUpdate(toUpdateStudent)
    // }

    // const onDelete = (toDeleteStudent) => {
    //     toDelete(toDeleteStudent)
    // }

    return (
        <Card centered>
            <Image centered size='medium' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            {/* <Card.Content> */}
            {/* <Card.Header>{movie.original_title}</Card.Header>
            <Card.Description>{movie.overview}</Card.Description> */}
            {/* <Button variant="outline-danger" onClick={()=>{onDelete(student)}} style={{padding: '0.6em', marginRight:'0.9em'}}><ioicons.IoTrash/></Button>
            <Button variant="outline-info" onClick={()=>{onUpdate(student)}} style={{padding: '0.6em'}}> <ioicons.IoSync/></Button> */}
            {/* </Card.Content> */}
        </Card>
    )

}

export default NowPlaying;