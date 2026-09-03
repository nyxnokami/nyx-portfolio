import Starfield from './Starfield.jsx';
import CommandMenu from './CommandMenu.jsx';
import Hero from './Hero.jsx';              
import ProjectCards from './ProjectCards.jsx';
import NyxLab from './NyxLab.jsx';          
import BlogSection from './BlogSection.jsx'; 
import Skills from './Skills.jsx';
import Experience from './Experience.jsx';
import ContactForm from './ContactForm.jsx'; 
import ZodiacSky from './ZodiacSky.jsx';     // 👈 New quirky interactive piece
import Footer from './Footer.jsx';

function App() {
  return (
    <>
      <Starfield />
      <CommandMenu />

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem clamp(1.25rem, 4vw, 2rem) 0',
          boxSizing: 'border-box',
        }}
      >
        {/* Generic header removed entirely for a cleaner flow */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5rem', 
          }}
        >
          <Hero />           
          <ProjectCards />
          <NyxLab />         
          <BlogSection />    
          <Skills />
          <Experience />
          <ContactForm />    
          <ZodiacSky />      {/* 👈 Added right before the absolute footer */}
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
