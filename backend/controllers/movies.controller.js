const { fetchfromTMDB } = require("../services/tmdb.service")

module.exports.GetTrendingMovie = async(req,res)=>{
    try {
        const data = await fetchfromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US')
        const movie = data.results[Math.floor(Math.random() * data.results?.length)]
        res.status(200).json({success:true,content:movie})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.GetMovieTrailer = async(req,res)=>{
    const {id} = req.params
    try {
        const {results} = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.status(200).json({success:true,trailers:results})
    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.GetMovieDetails= async(req,res)=>{
    const {id} = req.params
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({success:true,content:data})
    } catch (error) {
        if(error.message.includes('404')){
            return res.status(404).send(null)
        }
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.GetSimilarMovies = async(req,res)=>{
    const {id} = req.params
    try {
        const {results} = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success:true,similar:results})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.GetMoviesByCategory = async(req,res)=>{
    const {category} = req.params
    try {
        const {results} = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(200).json({success:true,content:results})
    } catch (error) {
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}