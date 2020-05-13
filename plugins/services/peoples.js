export default (store, $axios) => ({
    getPopular() {
        store.dispatch("setLoading", { type: "add", name: "getPopularPeoples" })
        return $axios
            .get(`/person/popular?api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getPopularPeoples" })
            })
    },
})