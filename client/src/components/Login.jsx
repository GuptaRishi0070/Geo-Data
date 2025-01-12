import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data === "Success") {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Login successful!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#3085d6',
                    }).then(() => {
                        navigate('/map');
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Incorrect password! Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Retry',
                        confirmButtonColor: '#d33',
                    });
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#d33',
                });
            });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
                backgroundImage: "linear-gradient(to bottom, #00d5ff, #0095ff), linear-gradient(to top, #8450F9, #FFC857)",
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: { xs: '90%', sm: '50%', md: '30%' } }}>
                <Typography variant="h4" component="h1" color="primary" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don&apos;t have an account? 
                </Typography>
                <Button
                    component={Link}
                    to="/register"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Register
                </Button>
            </Paper>
        </Box>
    );
};

export default Login;
