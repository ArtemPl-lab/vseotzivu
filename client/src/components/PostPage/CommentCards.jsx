import React, { useEffect, useState } from 'react'
import { useAPI } from '../../hooks/api.hook';
import Card from './Card';
import Spinner from '../Spinners/Spinner';

const CommentCards = ({ postId }) => {
    const { loading, error,  request } = useAPI();
    let [ comments, setComments ] = useState('');

    useEffect(async ()=>{
        const response = await request('/api/posts/comments', 'POST', JSON.stringify({ postId }));
        let graf = new Map(response.map(comm => [comm._id, {...comm, used: false}]));
        const use = id => graf.set(id, {...graf.get(id), used: true});
        const isUsed = id => graf.get(id).used;
        const dfs = id => {
            use(id);
            return(
                <div className="pl-3" key={id}>
                    <Card comment={graf.get(id)}/>
                    {graf.get(id).replays.map(child => (!isUsed(child)) ? dfs(child) : '')}
                </div>
            );
        }
        setComments([...graf].map(v => dfs(v[1]._id)));
    }, [ postId ]);
    if(loading) return <Spinner />
    return (
        <div className="card mt-4">
            <div className="card-body" style={{paddingLeft: 0}}>
                {comments}
            </div>
        </div>
    )
}

export default CommentCards;
