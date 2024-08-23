const User = require('../models/user.model')
const { fetchfromTMDB } = require('../services/tmdb.service')

module.exports.SearchForPerson = async(req,res)=>{
   const {query} = req.params
   try {
    const {results} = await fetchfromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
    if(results.length === 0){
      return res.status(404).send(null)
    }
    await User.findByIdAndUpdate(req.user._id,{
        $push:{
            searchHistory:{
                id:results[0].id,
                image:results[0].profile_path,
                title:results[0].name,
                searchType:'person',
                createdAt:new Date()
            }
        }
    })
    res.status(200).json({success:true,content:results})
   } catch (error) {
     console.log(error)
     res.status(500).json({success:false,message:"Internal Server Error"})
   }
}

module.exports.SearchForMovie= async(req,res)=>{
    const {query} = req.params
    try {
     const {results} = await fetchfromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
     if(results.length === 0){
       return res.status(404).send(null)
     }
     await User.findByIdAndUpdate(req.user._id,{
         $push:{
             searchHistory:{
                 id:results[0].id,
                 image:results[0].poster_path,
                 title:results[0].title,
                 searchType:'movie',
                 createdAt:new Date()
             }
         }
     })
     res.status(200).json({success:true,content:results})
    } catch (error) {
      console.log(error)
      res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.SearchForTV = async(req,res)=>{
    const {query} = req.params
    try {
     const {results} = await fetchfromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
     if(results.length === 0){
       return res.status(404).send(null)
     }
     await User.findByIdAndUpdate(req.user._id,{
         $push:{
             searchHistory:{
                 id:results[0].id,
                 image:results[0].poster_path,
                 title:results[0].name,
                 searchType:'tv',
                 createdAt:new Date()
             }
         }
     })
     res.status(200).json({success:true,content:results})
    } catch (error) {
      console.log(error)
      res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

module.exports.GetSearchHistory = (req,res)=>{
   try {
    res.status(200).json({success:true,content:req.user.searchHistory})
   } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"Internal Server Error"})
   }
}

module.exports.RemoveFromHistory = async(req,res)=>{
  let {id} = req.params
  id = parseInt(id)
  try {
    await User.findByIdAndUpdate(req.user._id,{
      $pull:{
        searchHistory:{
           id
        }
      }
    })
    res.status(200).json({success:true,message:"Removed from History"})
  } catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"Internal Server Error"})
  }
}