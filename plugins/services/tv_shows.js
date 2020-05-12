export default (store, $axios) => ({
    getPopularTvShows() {
        store.dispatch("setLoading", { type: "add", name: "getPopularTvShows" })
        return $axios
            .get(`/tv/popular?api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getPopularTvShows" })
            })
    }
})