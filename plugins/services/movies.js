export default (store, $axios) => ({
    getPopularMovies() {
        store.dispatch("setLoading", { type: "add", name: "getPopularMovies" })
        return $axios
            .get(`/movie/popular?api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getPopularMovies" })
            })
    },
})