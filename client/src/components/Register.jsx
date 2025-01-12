import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => {
            console.log(result);
            if (result.data === "Already registered") {
                Swal.fire({
                    icon: 'warning',
                    title: 'Email Already Registered',
                    text: 'Please Login to proceed.',
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You can now Login!',
                    confirmButtonText: 'Go to Login',
                }).then(() => {
                    navigate('/login');
                });
            }
        })
        .catch(err => {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again later.',
            });
        });
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: "linear-gradient(to bottom, #00d5ff, #0095ff), linear-gradient(to top, #8450F9, #FFC857)",
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" component="h1" color="primary" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
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
                        Register
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account? 
                </Typography>
                <Button 
                    component={Link}
                    to="/login"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Login
                </Button>
            </Paper>
        </Box>
    );
};

export default Register;
