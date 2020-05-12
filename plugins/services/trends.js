export default (store, $axios) => ({
    getTrends(period, media_type = 'all') {
        store.dispatch("setLoading", { type: "add", name: `getTrends_${media_type}_${period}` })
        return $axios
            .get(`/trending/${media_type}/${period}?api_key=${process.env.API_KEY}&language=en-US`)
            .then(response => Promise.resolve(response.data))
            .catch(error => {
                return Promise.reject(error)
            })
            .finally(() => {
                store.dispatch("setLoading", { type: "remove", name: "getTrends" })
            })
    },
})