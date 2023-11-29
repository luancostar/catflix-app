const API_KEY = '38c007f28d5b66f36b9c3cf8d8452a4b';
const API_BASE ='https://api.themoviedb.org/3';


// originais da netflix
// recomendados (treinding)
// em alta (top rated)
// acao 
// comedia
// terror 
// romance
// documentario

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
     

        return [
          
            
            {
                slug: 'mcu',
                title: 'Universo Marvel - Filmes',
                items: await basicFetch(`/discover/movie?with_keywords=180547&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'mcu',
                title: 'Universo Marvel - Séries',
                items: await basicFetch(`/discover/tv?with_keywords=180547&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'dc',
                title: 'Universo Cinematográfico DC',
                items: await basicFetch(`/discover/movie?with_keywords=229266&language=pt-BR&api_key=${API_KEY}`)
            },
            
        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId) {
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
            }
        }
        return info;
        }
    }