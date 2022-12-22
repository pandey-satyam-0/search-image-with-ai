import React from 'react';
import { Container } from 'react-bootstrap';
import AiImageGenerator from './Component/AiImageGenerator';

function App() {

  // console.log('app', process.env.REACT_APP_OPENAI_API_KEY);

  return (
    <Container fluid style={{ width: '100vw', height: '100vh'}}>
      <AiImageGenerator />
    </Container>
  )
}

export default App