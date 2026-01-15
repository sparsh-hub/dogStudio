import { useState } from 'react'
import './App.css'
import Dog from './components/Dog'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <>
      <main>
        <Canvas style={{
          height: "100vh",
          width: "100vw",
          position: 'fixed',
          top:0,
          left:0,
          backgroundImage: "url(/background-l.png)",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>
          <Dog />
        </Canvas>
        <section id='section-1'></section>
        <section id='section-2'></section>
        <section id='section-3'></section>
      </main>
    </>
  )
}

export default App
