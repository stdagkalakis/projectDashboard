import React, { Fragment } from 'react'
import ProjectCard from './ProjectCard';
import { Grid, Image, Segment, Icon } from 'semantic-ui-react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import DraggableCore from 'react-draggable';
import Form from '../Form/AddProjetForm'

function Board(props) {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        getCards();
    }, [])

    const drop = e => {
        e.preventDefault();

        const cardId = e.dataTransfer.getData('cardId');

        const card = document.getElementById(cardId);

        e.target.append(card);
    }

    const dragOver = e => {
        e.preventDefault();
    }

    const getCards = () => {
        axios.get(`api/cards/`)
            .then(res => {
                console.log(res);
                setCards([...res.data.cards]);
            }).catch(err => {
                console.log(err);
            });
    }

    const handleDelete = (id) => {
        axios.delete(`api/cards/${id}`)
            .then(res => {
                console.log(res.data);
                console.log(id);
                getCards();
            }).catch(err => {
                console.log(err);
            });
    }

    const handleAdd = async ({ title, description }) => {
        console.log(title + " " + description);
        await axios.post(`/api/cards`, { title, description })
            .then(res => {
                console.log(res);
                getCards();
                return;
            }).catch(err => {
                console.log(err);
                return;
            });
    }



    return (
        <Fragment>
            <Grid style={{ height: '100vh' }}>
                <Grid.Row columns='equal' className="columnHeader" verticalAlign='middle'>
                    <Grid.Column></Grid.Column>
                    <Grid.Column className="column">
                        <h3>Flowcharts</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Wireframes</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Prototype</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Development</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Test</h3>
                    </Grid.Column>
                    <Grid.Column>
                        <h3>Launch</h3>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
                <Grid.Row columns='equal' divided style={{ height: "100%" }}>
                    <Grid.Column></Grid.Column>
                    <Grid.Column onDrop={drop} onDragOver={dragOver} id="Lane 1">
                        {cards.map((card, i) => (
                            < ProjectCard key={i} id={card.id} className="drag" title={card.title} description={card.description} id={card.id} handleDelete={handleDelete} />
                        ))}
                    </Grid.Column>
                    <Grid.Column onDrop={drop} onDragOver={dragOver} id="Lane 2" style={{ display: "block", backgroundColot: "blue" }}>
                    </Grid.Column>
                    <Grid.Column onDrop={drop} onDragOver={dragOver} id="Lane 3">

                    </Grid.Column>
                    <Grid.Column onDrop={drop} onDragOver={dragOver} id="Lane 4">

                    </Grid.Column>
                    <Grid.Column onDrop={drop} onDragOver={dragOver} id="Lane 5">

                    </Grid.Column>
                    <Grid.Column onDrop={drop} onDragOver={dragOver} id="Lane 6">

                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid >
            <Form addProject={handleAdd} />
        </Fragment>
    )
}

export default Board
