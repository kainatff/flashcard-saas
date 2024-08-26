'use client';
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "@mui/material";
import Head from 'next/head';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  AppBar, Container, Toolbar,
  Grid, Card, CardContent, CardMedia,
  createTheme, ThemeProvider
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
      main: '#001d36', 
    },
    text: {
      primary: '#000d15', 
      secondary: '#334753', 
    },
    background: {
      default: '#001420', 
    },
  },
});

const features = [
  {
    title: 'Easy Text Input',
    description: 'Seamlessly input text to generate flashcards without hassle.',
    image: 'input.jpg',
  },
  {
    title: 'Smart Flashcards',
    description: 'AI-generated flashcards tailored to your study material for effective learning.',
    image: 'cards.jpg',
  },
  {
    title: 'Accessible Anywhere',
    description: 'Access your flashcards and study plans from any device, anywhere.',
    image: 'access.jpg',
  },
];

const pricingPlans = [
  {
    title: 'Free Plan',
    price: '$0',
    description: 'Basic access to create flashcards and track your progress.',
    features: ['Create up to 100 flashcards', 'Basic analytics', 'Limited AI suggestions'],
  },
  {
    title: 'Pro Plan',
    price: '$9.99/month',
    description: 'Advanced features for avid learners.',
    features: ['Unlimited flashcards', 'Advanced analytics', 'AI-powered study plans', 'Priority support'],
  },
];

const FeatureSection = () => {
  return (
    <Grid container spacing={4} sx={{ mt: 1 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345, bgcolor: '#0d2635', color: '#fff' }}>
            <CardMedia
              component="img"
              height="140"
              image={feature.image}
              alt={feature.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: '#fff' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="#c0c0c0">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const PricingSection = ({ handleSubmit }) => {
  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 1 }}>
      {pricingPlans.map((plan, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ 
            maxWidth: 345, 
            textAlign: 'center', 
            bgcolor: '#0d2635', 
            color: '#fff', 
            minHeight: '420px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
          }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {plan.title}
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                {plan.price}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {plan.description}
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {plan.features.map((feature, i) => (
                  <Typography variant="body1" color="text.secondary" key={i}>
                    {feature}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
            <Box sx={{ pb: 2 }}> {/* Ensure button is at the bottom */}
              <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick= {handleSubmit}>
                Choose Plan
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSessionJson.message)
      return
    }
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

 return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { height: '100%' },
          body: { height: '100%', margin: 0, padding: 0, backgroundColor: '#65747b' },
        }}
      />
      <Head>
        <title> FlashStudyX </title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>
      
      <AppBar position="static" sx={{ bgcolor: '#001a2a' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FlashStudyX
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container sx={{ bgcolor: '#65747b', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to FlashStudyX
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
            Get Started
          </Button>
        </Box>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <FeatureSection />
        </Box>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom >
            Pricing
          </Typography>
          <PricingSection handleSubmit={handleSubmit} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
