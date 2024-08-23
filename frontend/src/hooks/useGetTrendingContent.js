import { useContentStore } from "../store/content";
import {useEffect,useState} from 'react'
import axios from 'axios'

const useGetTrendingContent = () => {
    const {contentType} = useContentStore()
    const [trendingContent, setTrendingContent] = useState(null);

    useEffect(() => {
       const getTrendingContent = async()=>{
         try {
            const {data:{content}} = await axios.get(`/api/v1/${contentType}/trending`)
            setTrendingContent(content)
         } catch (error) {
            console.log(error)
         }
        
       }
       getTrendingContent()
    }, [contentType]);

    return {trendingContent};
}
 
export default useGetTrendingContent;