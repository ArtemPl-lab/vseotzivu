import React, { useEffect, useState } from 'react'
import { useAPI } from '../../hooks/api.hook';
import Catalog from '../Catalog/Catalog';

const Search = props => {
    const query = props.match.params.query;
    const [catalog, setCatalog] = useState([]);
    const { loading, request } = useAPI();
    useEffect(
        async ()=>{
            let posts = [];
            const response = await request(
                '/api/posts/get/tags',
                'POST', 
                JSON.stringify(
                    {
                        search: query
                    }
                )
            );
            for(let i = 0; i < response.length; i++){
                posts = posts.concat(response[i].posts);
            }
            let filteredList = [...new Set(posts.map(JSON.stringify))].map(JSON.parse);
            setCatalog(filteredList);
        },[query]
    );
    
    return (
        <div>
            <Catalog posts={catalog} title={`Результаты по запросу: ${query}`} download={()=>({ type: '' })}/>
        </div>
    )
}

export default Search
