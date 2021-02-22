import React, { useEffect, useState } from 'react';
import { useAPI } from '../hooks/api.hook';

const Footer = props => {
    const [popularTags, setPopularTags] = useState([]);
    const [ last, setLast ] = useState([]);
    const { loading, request } = useAPI();
    useEffect(async () =>{
        const response = await request('/api/posts/get/popularTags', 'POST');
        setPopularTags(response);
        const res = await request('/api/posts/news', 'POST');
        setLast(res);
    }, []);
    return(
        <footer className="container py-5">
            <div className="row">
                <div className="col-6 col-md">
                    <h5>Главное</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="/complaints">Жалобы</a></li>
                        <li><a className="text-muted" href="/reviews">Отзывы</a></li>
                        <li><a className="text-muted" href="/">Добавить жалобу/отзыв</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Популярные теги</h5>
                    <ul className="list-unstyled text-small">
                        {popularTags.map(tag => <li><a className="text-muted" href={`/search/${tag.tag}`}>{tag.tag}</a></li>)}
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Последние посты</h5>
                    <ul className="list-unstyled text-small">
                        {last.map(tag => <li><a className="text-muted" href={`/post/${tag.url}`}>{tag.title.slice(0,10)}...</a></li>)}
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Информация</h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="/about">Главное</a></li>
                        <li><a className="text-muted" href="/accommodation">Правила размещения</a></li>
                        <li><a className="text-muted" href="/rules">Правила сайта</a></li>
                        <li><a className="text-muted" href="/feedback">Плохой отзовик VS хороший</a></li>
                    </ul>
                </div>
            </div>
            </footer>
    );
}

export default Footer;