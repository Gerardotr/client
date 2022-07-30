import React, {useState} from 'react'
import axios from 'axios'
import { Button, Modal, Row, Text, Input, Checkbox } from '@nextui-org/react';
export const Login = ({ visible, closeHandler, handlerLogin, userHandler }) => {


    const [user, setuser] = useState(null)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', {username, password})
            setuser(res.data)
            userHandler(res.data)
            closeHandler()
            if(!user) {
                handlerLogin()
            }
        } catch (error) {
            
        }
    }

    

    return (
        <div>

            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Welcome
                        <Text b size={18}>
                            JWT
                        </Text>
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        onChange={(e) => setusername(e.target.value)}
                        color="primary"
                        size="lg"
                        placeholder="Username"

                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        onChange={(e) => setpassword(e.target.value)}
                        color="primary"
                        size="lg"
                        placeholder="Password"

                    />
                    <Row justify="space-between">
                        <Checkbox>
                            <Text size={14}>
                                Remember me
                            </Text>
                        </Checkbox>
                        <Text size={14}>
                            Forgot password?
                        </Text>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button  onClick={handleSubmit} auto >
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
