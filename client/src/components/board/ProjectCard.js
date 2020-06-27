import React, { Fragment, useState, useEffect } from 'react'
import { Card, Icon, CardContent, CardHeader } from 'semantic-ui-react'
import Draggable from 'react-draggable'

function ProjectCard(props) {



    const dragOver = e => {
        e.stopPropagation();
    }

    const handleDelete = () => {
        props.handleDelete(props.id);

    }

    return (
        <Fragment>
            <Card id={props.id}
                draggable="true"
                onDragStart={(event) => { event.dataTransfer.setData('cardId', event.target.id); }}
                onDragOver={dragOver}
            >
                <div className="header">
                    <CardHeader className="title"> {props.title}</CardHeader>
                    <Icon name="close" inverted onClick={handleDelete} />
                </div>

                <CardContent style={{ height: "auto" }} >
                    <Card.Description className="description">
                        {props.description}
                    </Card.Description>
                </CardContent>
            </Card>
        </Fragment >
    )

}

export default ProjectCard
