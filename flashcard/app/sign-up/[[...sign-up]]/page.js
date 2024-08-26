import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <Container maxWidth="false" sx={{ bgcolor: '#65747b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" sx={{ bgcolor: '#001a2a' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        FlashStudyX
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            Sign up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{ textAlign: 'center', my: 4, flexGrow: 1 }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
                </Typography>
                <Box sx={{ bgcolor: '#65747b', p: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <SignUp />
                </Box>
            </Box>
        </Container>
    )
}
