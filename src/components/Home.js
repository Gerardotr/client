import React, { useState, useEffect } from 'react'
import { Container, Text, Card, Spacer, Button, Grid, MockItem, Col, Link, User } from '@nextui-org/react';
import { Login } from './Login';
import axios from 'axios'
import jwt_decode from "jwt-decode";
export const Home = () => {

    const [visible, setVisible] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const handler = () => setVisible(true);
    const handlerLogin = () => setIsLogin(true);
    const closeHandler = () => {
        setVisible(false);
    };
    const userHandler = (user) => {
        setUser(user);
    };

    const handleDelete = async (id) => {
        console.log(id)
        setsuccess(false)
        seterror(false)
        try {
            const res = await axiosJWT.delete('/users/' + id, { headers: { authorization: "Bearer " + user.acsessToken } })
            console.log(res.data)
            setsuccess(true)
            if (!user) {
                handlerLogin()
            }
        } catch (error) {
            seterror(true);
        }
    }

    const handleUsers = async (id) => {
        setsuccess(false)
        seterror(false)
        try {
            const res = await axios.get('/users')
            console.log(res.data)
            setUsers(res.data)
        } catch (error) {

        }
    }

    const refreshToken = async () => {
        try {
            const res = await axios.post("/refresh", { token: user.refreshToken });
            setUser({
                ...user,
                accessToken: res.data.acsessToken,
                refreshToken: res.data.refreshToken,
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const axiosJWT = axios.create()

    axiosJWT.interceptors.request.use(
        async (config) => {
            let currentDate = new Date();
            const decodedToken = jwt_decode(user.acsessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken();
                config.headers["authorization"] = "Bearer " + data.acsessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    useEffect(() => {
        handleUsers()
    }, [])


    return (
        <Container css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }} >
            <Spacer x={5} />
            {isLogin ? (
                <Grid.Container justify="center" gap={2}>
                    <Grid lg={12} >
                        <Card >
                            <Text h4>Welcome  </Text>
                            <Text> Users in the platform, administrative </Text>
                            <Card.Footer>

                            </Card.Footer>
                        </Card>
                    </Grid>
                    {
                        users.map((u) => (
                            <Grid key={u.id} lg={12}>
                                <Card color="primary">
                                    <Text h4 color="white">{u.username}</Text>
                                    <Text color="white">{u.isAdmin ? 'Admin' : 'User'}</Text>
                                    <Card.Footer>
                                        <Button onClick={() => handleDelete(u.id)}>{u.id}</Button>
                                    </Card.Footer>
                                </Card>


                            </Grid>
                        ))
                    }

                    {error && (
                        <span className="error">
                            You are not allowed to delete this user!
                        </span>
                    )}
                    {success && (
                        <span className="success">
                            User has been deleted successfully...
                        </span>
                    )}
                </Grid.Container>

            ) : (

                <Card css={{
                    px: '$4'
                }}>
                    <Col >
                        <Text
                            h1
                            size={60}
                            css={{
                                textGradient: '45deg, $blue500 -20%, $pink500 50%'
                            }}
                            weight="bold"
                        >
                            Welcome,
                        </Text>

                        <Text
                            h1
                            size={60}
                            css={{
                                textGradient: '45deg, $purple500 -20%, $pink500 100%'
                            }}
                            weight="bold"
                        >
                            Gerardo
                        </Text>

                        <Text
                            h1
                            size={60}
                            css={{
                                textGradient: '45deg, $yellow500 -20%, $red500 100%'
                            }}
                            weight="bold"
                        >
                            Tobar
                        </Text>



                    </Col>
                    <Spacer x={5} />

                    <Button onClick={handler} shadow color="gradient" auto>
                        Login
                    </Button>
                    <Spacer x={5} />


                    <Button onClick={handler} shadow color="secondary" auto>
                        Register
                    </Button>
                    <Spacer x={5} />
                </Card>
            )}






            <Login userHandler={userHandler} handlerLogin={handlerLogin} isLogin={isLogin} visible={visible} closeHandler={closeHandler} />



        </Container>
    )
}
