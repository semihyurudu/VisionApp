import Movies from "./services/movies.js"
import TvShows from "./services/tv_shows.js"
import Trends from "./services/trends.js"
import Search from "./services/search.js"

const serviceFactory = (store, $axios) => ({
    movies: Movies(store, $axios),
    tv_shows: TvShows(store, $axios),
    trends: Trends(store, $axios),
    search: Search(store, $axios),
})

export default ({store, $axios}, inject) => {
    const service = serviceFactory(store, $axios)
    inject("service", service)
}