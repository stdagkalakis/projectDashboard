import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment, Icon } from 'semantic-ui-react'

function AddProjetForm(props) {
    const [open, setOpen] = useState(false);
    const [iconName, setIconName] = useState("angle down")

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const toggle = () => {
        let angle = open ? "down" : "right";
        setIconName("angle " + angle);
        setOpen(!open);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '' || description === '') {
            resetForm();
            return;
        }
        props.addProject({ title, description });
        resetForm();
    }

    const resetForm = () => {
        setTitle('');
        setDescription('');
    }

    return (
        <Grid className="addProjectForm">
            <Grid.Column style={{ maxWidth: 450 }}>

                <Form size='large' id="form" onSubmit={handleSubmit}>
                    <Segment>
                        <div className="header">
                            <h3>New project</h3>
                            <Icon name={iconName} onClick={toggle} />
                        </div>
                        <div hidden={open}>
                            <Form.Input
                                fluid
                                placeholder='Project title'
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)} />
                            <Form.TextArea
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                style={{ resize: "none" }}
                                placeholder='Project description'
                            />
                            <button className="button" type="submit" >
                                Add project  +
                            </button>
                        </div>
                    </Segment>
                </Form >
            </Grid.Column>
        </Grid>

    )
}

export default AddProjetForm
