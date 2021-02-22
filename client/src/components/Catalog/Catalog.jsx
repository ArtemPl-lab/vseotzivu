import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import Spinner from '../Spinners/Spinner';
import Card from './Card';

const Catalog = ({ posts, title, download }) => {
    const dispatch = useDispatch();
    const { ref, inView} = useInView({ threshold: 0 });
    if(inView) dispatch(download());
    return (
        <div className="card">
            <div className="card-header">
                <h2>{title}</h2>
            </div>
            <div className="card-body">
                { posts.map( (post, index) => <Card post={post} key={index} /> ) }
                <div ref={ref} />
                { !posts.length ? <Spinner /> : ''}
            </div>
        </div>
    )
}

export default Catalog;
