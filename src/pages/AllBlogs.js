import { useEffect, useState } from "react"
import { getAllBlogs } from "../api-calls/axios-requests"
import BlogBanner from "../components/BlogBanner";

export default function AllBlogs() {

    const [loading , setLoading] = useState(true);
    const [blogArray , setBlogArray] = useState([]);

    useEffect( () => {
        getAllBlogs()
            .then(async result => {
                if(result != null) {
                    setBlogArray(result)
                }
            })
    },[])

    return (
        <div>
            {blogArray.map((element , index) => {
                return (
                    <BlogBanner title={element.title} author={element.author} 
                        lastUpdated={element.last_updated} key={index} id={element.id}/>
                )
            })}
        </div>
    )
}