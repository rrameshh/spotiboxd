
import { Container } from '@/components/ui/container.tsx';
import { Navbar } from '@/components/ui/navbar.tsx';
import TopAlbums from './components/ui/topalbums.tsx';
import './App.css';



// const authorizationEndpoint = "https://accounts.spotify.com/authorize";
// const scope = 'user-read-private user-read-email';
//require("dotenv").config();
export default function Root() {

  return (
    <Container>
      <Navbar />
      <TopAlbums />
    </Container>
    
  );
}
