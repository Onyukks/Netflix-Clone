const axios = require('axios')
const env = process.env

const fetchfromTMDB = async(url)=>{
    const options = {
        headers:{
            accept:'application/json',
            Authorization:`Bearer ${env.TMDB_API_KEY}`
        }
    }
   const response = await axios.get(url,options)

   if(response.status !== 200){
    throw new Error('Failed to fetch from TMDB' ,response )
   }

   return response.data
}

module.exports = {
    fetchfromTMDB
}