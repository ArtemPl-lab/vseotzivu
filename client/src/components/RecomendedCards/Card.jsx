import React from 'react'
import Spinner from '../Spinners/Spinner';

const Card = ({title, posts}) => {
    return (
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="card-title text-center pt-2">{title}</h4>
          </div>
          <ul className="list-group list-group-flush">
    { posts.length ? posts.map(post => <li className="list-group-item" key={post._id}><a href={`/post/${post.url}`}>{post.title.slice(0, 100)}{post.title.length > 100 ? '...' : ''}</a></li>) : <Spinner />}
          </ul>
        </div>
    )
}

export default Card;
