export default (store, $axios) => ({
    getPopularMovies(page = 1) {
        store.dispatch("setLoading", { type: "add", name: "getPopularMovies" })
        return $axios
            .get(`/movie/popular?page=${page}&api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getPopularMovies" })
            })
    },
    getUpcoming() {
        store.dispatch("setLoading", { type: "add", name: "getUpcomingMovies" })
        return $axios
            .get(`/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getUpcomingMovies" })
            })
    },
})