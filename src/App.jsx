import { useState, useEffect } from 'react'
import {motion} from 'framer-motion'
import logo from './assets/Kaamelott_Logo.png';
import './assets/App.scss'

function App() {

  const [quote, setQuote] = useState('');
  const [key, setKey] = useState(0);

  const getQuote = async () => {
    try {
      const response = await fetch(' https://kaamelott.reiter.tf/quote/random')
      const data = await response.json();
      setQuote(data);
      setKey(prevKey => prevKey + 1)
    } catch (error) {
      console.error(error);
      alert('Problème lors de la récupération de la citation');
    }
  }

  useEffect(() => {
    getQuote();
  }, []);



  return (
    <section className="widget">
      <img src={logo} alt="Logo Kaamelott" className="logo" />
      <button onClick={getQuote} type="button" className="button">Nouvelle citation </button>
      {quote && (
                <motion.blockquote
                key={key}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
      }}>
                    <p className="widget-content">{quote.citation}</p>

                    <p className="widget-content cite">
                        <cite>
                            {quote.infos.personnage} dans l&apos;épisode {quote.infos.episode}, {quote.infos.saison}
                        </cite>
                    </p>
                </motion.blockquote>
            )}
    </section>
  );
}

export default App;
