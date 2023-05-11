import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

const PostReview = () => {
    const [showModal, setShowModal] = useState(false)

    return (

            <Modal
            centered
            closeIcon
            onClose={() => setShowModal(false)}
            onOpen={() => setShowModal(true)}
            open={showModal}
            trigger={<Button>Post Review</Button>}
            size='small'
            style={{height: "auto" , margin: "20%"}}
            >
                <Modal.Header>Write a Review</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input fluid placeholder='Title' />
                        <Form.TextArea placeholder='Review Post'/>
                        <Button.Group>

                        <Button color='blue'>Post</Button>
                        <Button color='red' onClick={() => setShowModal(false)}>Cancel</Button>
                        </Button.Group>
                    </Form>
                </Modal.Content>
            </Modal>

    );
};

export default PostReview;