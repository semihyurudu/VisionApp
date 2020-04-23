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
    getProfilePath() {
      return 'https://image.tmdb.org/t/p/w90_and_h90_face'
    },
    substringWithWords(text, length) {
      return text.replace(/^(.{150}[^\s]*).*/, "$1");
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

    }
  }
};
