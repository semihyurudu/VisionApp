import ISO6391 from 'iso-639-1';
export const helper = {
  methods: {
    apiUrl() {
      return 'https://api.themoviedb.org/3/';
    },
    apiKey() {
      return '1b3c8e5cc36a460bb507fea55c7f8f56';
    },
    getLanguage() {
      return 'en-US';
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
    substringWithWords(text, length) {
      // return text.replace(/^(.{70}[^\s]*).*/, "$1");
      return text.substr(0, length);
    },
    getSearchUrl(search_type, query, page) {
      return this.apiUrl() + 'search/' + search_type + '?api_key=' + this.apiKey() + '&query=' + query + '&language=' + this.getLanguage() + '&page=' + page;
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
    getRequestAppend() {
      return 'api_key=' + this.apiKey() + '&language=' + this.getLanguage()
    },
    popularMoviesUrl(page) {
      return this.apiUrl() + 'movie/popular?page=' + page + '&' + this.getRequestAppend();
    },
    popularTvShowsUrl(page) {
      return this.apiUrl() + 'tv/popular?page=' + page + '&' + this.getRequestAppend();
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
    getMovieCreditsUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/credits?' + this.getRequestAppend();
    },
    getMovieKeywordsUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/keywords?' + this.getRequestAppend();
    },
    getMovieVideosUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/videos?' + this.getRequestAppend();
    },
    getSimilarMoviesUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/similar?' + this.getRequestAppend();
    },
    getRecommendationsMoviesUrl(id) {
      return this.apiUrl() + 'movie/' + id + '/recommendations?' + this.getRequestAppend();
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
      let arr = date.split('-');

      year = arr.filter((x) => {
        return x.length === 4
      });

      return year[0];
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
    getYoutubeIframe(key) {
      return 'https://www.youtube.com/embed/' + key;
    },
    getMovieReviewsUrl(id, page) {
      return this.apiUrl() + 'movie/' + id + '/reviews?page=' + page + '&' + this.getRequestAppend();
    }
  }
};
