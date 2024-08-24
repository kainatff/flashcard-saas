'use client';
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useauth } from '@clerk/nextjs';
import Head from 'next/head';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  AppBar, Container, Toolbar,
  Grid, Card, CardContent, CardMedia
} from "@mui/material";

const features = [
  {
    title: 'Smart Flashcards',
    description: 'AI-generated flashcards based on your study material to enhance learning.',
    image: 'path/to/flashcards-image.jpg',
  },
  {
    title: 'Progress Tracking',
    description: 'Track your learning progress with detailed analytics and insights.',
    image: 'path/to/progress-tracking-image.jpg', 
  },
  {
    title: 'Customizable Study Plans',
    description: 'Create personalized study plans that adapt to your learning pace.',
    image: 'path/to/customizable-study-plans-image.jpg', 
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
    <Grid container spacing={4} sx={{ mt: 4 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={feature.image}
              alt={feature.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const PricingSection = () => {
  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
      {pricingPlans.map((plan, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {plan.title}
              </Typography>
              <Typography variant="h4" color="primary" gutterBottom>
                {plan.price}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {plan.description}
              </Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {plan.features.map((feature, i) => (
                  <Typography variant="body2" color="text.secondary" key={i}>
                    {feature}
                  </Typography>
                ))}
              </Stack>
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
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
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          Learn More
        </Button>
      </Box>
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Features
        </Typography>
        {/* Use the FeatureSection component here */}
        <FeatureSection />
      </Box>
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pricing
        </Typography>
        {/* Use the PricingSection component here */}
        <PricingSection />
      </Box>
    </Container>
  );
}
