import { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

 export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

  

 
    useEffect(() => {
      const loadAll = async () => {
          let list = await Tmdb.getHomeList();
          setMovieList(list);

          // Escolher aleatoriamente um filme do MCU
          let mcu = list.filter(i => i.slug === 'mcu');
          let randomChosen = Math.floor(Math.random() * (mcu[0].items.results.length - 1));
          let chosen = mcu[0].items.results[randomChosen];
          
          // Obter informações do filme escolhido
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'movie');

          // Certifique-se de que o título está sendo acessado corretamente
          let title = chosenInfo.title || chosenInfo.name; // 'title' para filmes, 'name' para séries
          setFeaturedData({ ...chosenInfo, title });
      }

      loadAll();
    }, []);
  
    useEffect(() =>{
      const scrollListener = () => {
        if(window.scrollY > 10) {
          setBlackHeader(true);
        } else {
          setBlackHeader(false);
        }
      }

      window.addEventListener('scroll', scrollListener);
      return () => {
        window.removeEventListener('scroll', scrollListener);
      }
  }, []);

  return (
    <div className="page">

    <Header black={blackHeader} />

      {featuredData &&
      <FeaturedMovie item={featuredData} />
      }
        <section className="lists">
          {movieList.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
        <footer>
          <img src="src/assets/logo-icons/logo-name.png" alt="" />
          <img className='cat-roll' src="src/assets/logo-icons/cat-roll.gif" alt="" />
        </footer>

        {movieList.length <= 0 &&
        <div className="loading">
          <img src="src/assets/logo-icons/catflix-loading.gif" alt="Carregando" />
        </div>
        }
    </div>
  );
  }

