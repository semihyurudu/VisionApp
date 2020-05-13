export default (store, $axios) => ({
    getGenres(type) {
        store.dispatch("setLoading", { type: "add", name: `getGenres_${type}` })
        return $axios
            .get(`/trending/${media_type}/${type}?api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: `getGenres_${type}` })
            })
    },
})