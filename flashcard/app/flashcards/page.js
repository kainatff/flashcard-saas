'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, CollectionReference, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Box, Button, Card, CardActionArea, CardContent, Container, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"


export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter()
  
    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])

      const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
      }

      const handleDeleteClick = (event, flashcard) => {
        event.stopPropagation();
        setSelectedFlashcard(flashcard);
        setOpenDialog(true);
      };
    
      const confirmDelete = async () => {
        if (!user || !selectedFlashcard) return;
        const docRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || [];
          const updatedCollections = collections.filter(flashcard => flashcard.name !== selectedFlashcard.name);
          await updateDoc(docRef, { flashcards: updatedCollections });
          setFlashcards(updatedCollections);
        }
        setOpenDialog(false);
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
    
      const handleStartCreating = () => {
        router.push('/generate');
      };
      
      if(!isLoaded || !isSignedIn){
        return <></>
      }

      return (
        <Container maxWidth="md">
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {flashcard.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )
  }