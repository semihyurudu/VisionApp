export default (store, $axios) => ({
    getSearchResults(params) {
        store.dispatch("setLoading", { type: "add", name: "getSearchResults" })
        return $axios
            .get(`/search/${params.search_type}?page=${params.page}&query=${params.query}&api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getSearchResults" })
            })
    },
})