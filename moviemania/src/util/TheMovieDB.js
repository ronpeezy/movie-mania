const APIKEY = 'f15c4b2ce4c406bdb50a6246ede778bb';
const APIURL = 'https://api.themoviedb.org/3'

const apiFetch = (lookupPath) => {
    let databaseUrl = APIURL + lookupPath + '?api_key=' + APIKEY;
    return fetch(databaseUrl)
    .then(function(response) {
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(function(data) {
        let results = data.results;
        return results;
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

export const TheMovieDB = {
    NowPlaying() {
        return apiFetch('/movie/now_playing').then(data => { return data; });
    },
    TopRated() {
        return apiFetch('/movie/top_rated').then(data => { return data; });
    },
    Popular() {
        return apiFetch('/movie/popular').then(data => { return data; });
    },
    Upcoming() {
        return apiFetch('/movie/upcoming').then(data => { return data; });
    },
    GetDetails(movieId) {
        let databaseUrl = APIURL + '/movie/' + movieId + '?api_key=' + APIKEY;
        return fetch(databaseUrl)
        .then(response => response.json())
        .then(data => { return data; })
        .catch((error) => {
            console.log('Fetch Error :-S', error);
        });
    },
    Search(searchQuery) {
        let databaseUrl = APIURL + '/search/movie?api_key=' + APIKEY + '&query=' + searchQuery +  '&page=1&include_adult=false';
        return fetch(databaseUrl)
        .then(response => response.json())
        .then(data => { return data; })
        .catch((error) => {
            console.log('Fetch Error :-S', error);
        });
    }
}