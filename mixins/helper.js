import ISO6391 from 'iso-639-1';
export const helper = {
  methods: {
    projectName() {
      return 'Vision App'
    },
    apiUrl() {
      return 'https://api.themoviedb.org/3/';
    },
    apiKey() {
      return '1b3c8e5cc36a460bb507fea55c7f8f56';
    },
    getLanguage() {
      return 'tr-TR';
    },
    getPosterPath() {
      return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
    },
    getSmallPosterPath() {
      return 'https://image.tmdb.org/t/p/w220_and_h330_face';
    },
    getBackdropPath() {
      return 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces'
    },
    getLargeProfilePath() {
      return 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
    },
    getMediumProfilePath() {
      return 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'
    },
    getSmallProfilePath() {
      return 'https://image.tmdb.org/t/p/w90_and_h90_face'
    },
    getNetworkLogoPath() {
      return 'https://image.tmdb.org/t/p/h30'
    },
    substringWithWords(text, length) {
      // return text.replace(/^(.{70}[^\s]*).*/, "$1");
      return text.substr(0, length);
    },
    getSearchUrl(search_type, query, page) {
      return this.apiUrl() + 'search/' + search_type + '?api_key=' + this.apiKey() + '&query=' + query + '&language=' + this.getLanguage() + '&page=' + page;
    },
    getDefaultPoster() {
      return '/images/default_poster.png';
    },
    getDefaultProfileImage() {
      return '/images/default_profile.png';
    },
    getShowAllPoster() {
      return '/show-all-poster.jpg';
    },
    getSearchTypeText(search_type) {
      let text = '';
      switch (search_type) {
        case 'multi':
          text = 'All';
          break;
        case 'movie':
          text = 'Movies';
          break;
        case 'person':
          text = 'Peoples';
          break;
        case 'tv':
          text = 'TV Shows';
          break;
        default:
          text = 'All';
          break;
      }

      return text;

    },
    getHeadTitle(title) {
      let val = this.projectName();
      if(title) {
        val = (title + ' | ' + val);
      }

      return val;
    },
    getRequestAppend() {
      return 'api_key=' + this.apiKey() + '&language=' + this.getLanguage()
    },
    popularMoviesUrl(page) {
      return this.apiUrl() + 'movie/popular?page=' + page + '&' + this.getRequestAppend();
    },
    upcomingMoviesUrl(page) {
      return this.apiUrl() + 'movie/upcoming?page=' + page + '&' + this.getRequestAppend();
    },
    popularTvShowsUrl(page) {
      return this.apiUrl() + 'tv/popular?page=' + page + '&' + this.getRequestAppend();
    },
    topRatedTvShowsUrl(page) {
      return this.apiUrl() + 'tv/top_rated?page=' + page + '&' + this.getRequestAppend();
    },
    popularPeoplesUrl(page) {
      return this.apiUrl() + 'person/popular?page=' + page + '&' + this.getRequestAppend();
    },
    trendingUrl(media_type, time_period) {
      return this.apiUrl() + 'trending/' + media_type + '/' + time_period + '?' + this.getRequestAppend();
    },
    getMovieDetailsUrl(id) {
      return this.apiUrl() + 'movie/' + id + '?' + this.getRequestAppend();
    },
    getCreditsUrl(type, id) {
      return this.apiUrl() + type + '/' + id + '/credits?' + this.getRequestAppend();
    },
    getKeywordsUrl(type, id) {
      return this.apiUrl() + type + '/' + id + '/keywords?' + this.getRequestAppend();
    },
    getVideosUrl(type, id) {
      return this.apiUrl() + type + '/' + id + '/videos?' + this.getRequestAppend();
    },
    getSimilarMoviesUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/similar?' + this.getRequestAppend();
    },
    getSimilarTvShowsUrl(id) {
      return this.apiUrl() + 'tv/' + id + '/similar?' + this.getRequestAppend();
    },
    getRecommendationMoviesUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/recommendations?' + this.getRequestAppend();
    },
    getUpcomingMoviesUrl(page) {
      return this.apiUrl() + 'movie/upcoming?page=' + page + '&' + this.getRequestAppend();
    },
    getRecommendationTvShowsUrl(id) {
      return this.apiUrl() + 'tv/' + id + '/recommendations?' + this.getRequestAppend();
    },
    getGenrePageUrl(type, id, name) {
      return '/genre/' + type + '/' + id + '?name=' + name;
    },
    getGenreListUrl(type) {
      return this.apiUrl() + 'genre/' + type + '/list?' + this.getRequestAppend();
    },
    getWithGenresUrl(type, id, page) {
      return this.apiUrl() + 'discover/' + type + '?with_genres=' + id + '&page=' + page + '&' + this.getRequestAppend()
    },
    getTvDetailsUrl(id) {
      return this.apiUrl() + 'tv/' + id + '?' + this.getRequestAppend();
    },
    getPersonDetailsUrl(id) {
      return this.apiUrl() + 'person/' + id + '?' + this.getRequestAppend();
    },
    getPersonExternalIdsUrl(id) {
      return this.apiUrl() + 'person/' + id + '/external_ids?' + this.getRequestAppend();
    },
    getPersonCombinedCreditsUrl(id) {
      return this.apiUrl() + 'person/' + id + '/combined_credits?' + this.getRequestAppend();
    },
    getKeywordDetails(id) {
      return this.apiUrl() + 'keyword/' + id + '?' + this.getRequestAppend();
    },
    getKeywordMoviesUrl(id, include_adult, page) {
      return this.apiUrl() + 'keyword/' + id + '/movies?page=' + page + '&include_adult=' + include_adult + '&' + this.getRequestAppend();
    },
    getRandomBackdropColor() {
      const colors = [
          'linear-gradient(to right, rgba(16.47%, 16.08%, 13.33%, 1.00) 150px, rgba(21.96%, 21.96%, 21.96%, 0.84) 100%)',
          'linear-gradient(to right, rgba(19.61%, 7.84%, 7.84%, 1.00) 150px, rgba(27.45%, 13.73%, 13.73%, 0.84) 100%)',
          'linear-gradient(to right, rgb(78, 22, 22) 150px, rgba(7.06%, 7.06%, 7.06%, 0.84) 100%)',
          'linear-gradient(to right, rgba(11.76%, 15.29%, 17.25%, 1.00) 150px, rgba(19.61%, 21.96%, 23.53%, 0.84) 100%)',
          'linear-gradient(to right, rgb(37, 53, 18) 150px, rgba(32, 39, 32, 0.84) 100%)',
          'linear-gradient(to right, rgba(19.22%, 20.00%, 18.82%, 1.00) 150px, rgba(26.27%, 26.27%, 26.27%, 0.84) 100%)',
          'linear-gradient(to right, rgba(20.78%, 15.69%, 11.76%, 1.00) 150px, rgba(27.45%, 22.75%, 19.22%, 0.84) 100%)',
          'linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)'
      ];

      return colors[Math.floor(Math.random() * colors.length)];
    },
    getYearFromString(date) {
      let year = '';

      if(date) {
        let arr = date.split('-');
        year = arr.filter((x) => {
          return x.length === 4
        })[0];
      }
      return year;
    },
    formatMoney(amount, currency = '$', decimalCount = 2, decimal = ".", thousands = ",") {
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return currency + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
      } catch (e) {
        console.log(e)
      }
    },
    getLanguageFromCode(code) {
      return ISO6391.getName(code);
    },
    getBudget(budget) {
      let val = '-';

      if(budget && budget !== 0) {
        val = this.formatMoney(budget);
      }

      return val;
    },
    getYoutubeIframeSrc(key) {
      return 'https://www.youtube.com/embed/' + key;
    },
    getReviewsUrl(type, id, page) {
      return this.apiUrl() + type + '/' + id + '/reviews?page=' + page + '&' + this.getRequestAppend();
    },
    getPercentage(ratio) {
      return ratio * 10;
    },
    getPersonImdbUrl(id) {
      return 'https://www.imdb.com/name/' + id;
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
    objectReverseToArray(obj) {
      let newArray = [];

      Object.keys(obj)
          .sort()
          .reverse()
          .forEach(key => {
            newArray.push( {
              key,
              'value':obj[key]
            })
          });

      return newArray
    },
    getSocialAccounts() {
      return [
          {
            url: 'https://www.facebook.com/',
            name: 'Facebook',
            image: '/social/facebook.png'
          },
          {
            url: 'https://www.twitter.com/',
            name: 'Twitter',
            image: '/social/twitter.png'
          },
          {
            url: 'https://www.instagram.com/',
            name: 'Instagram',
            image: '/social/instagram.png'
          }
      ]
    }
  }
};
