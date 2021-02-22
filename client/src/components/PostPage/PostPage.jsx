import React, { useEffect, useState } from 'react'
import { useAPI } from '../../hooks/api.hook';
import Spinner from '../Spinners/Spinner';
import CommentCards from './CommentCards';
import CommentForm from './CommentForm';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";
const PostPage = props => {
    const [postData, setPostData] = useState({});
    const { loading, request } = useAPI();
    const [cookies, setCookie] = useCookies(['jwt']);
    const [redirect, setRedirect] = useState('');
    const deletPost = async event => {
        if(cookies.jwt){
            event.preventDefault();
            await request('/api/posts/delete', 'POST', JSON.stringify(postData));
            setRedirect('/');
        }
    }
    const postUrl = props.match.params.url;
    useEffect(async () => {
        const response = await request('/api/posts/get/review-data', 'POST', JSON.stringify({ url: postUrl }));
        setPostData(response);
    }, [postUrl]);
    if(redirect) return <Redirect to="/"/>
    if(loading) return <Spinner />
    return (
        <React.Fragment>
            <div>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h2>{postData.title}</h2>
                        <a type="button" class="btn btn-danger ml-2 d-flex align-items-center" style={{height: "45px"}} href={`/remove/${postUrl}`} onClick={deletPost}>Удалить</a>
                    </div>
                    <div className="card-body lead" style={{ minHeight: "240px" }}>
                        {postData.content}
                    </div>
                    <ul className="list-group list-group-flush">
                        {postData.organisation ? <li className="list-group-item">Организация - {postData.organisation}</li> : ''}
                        {postData.address ? <li className="list-group-item">Адрес - {postData.address}</li> : ''}
                        {postData.phone ? <li className="list-group-item">Телефон - {postData.phone}</li> : ''}
                        {postData.email ? <li className="list-group-item">E-mail - {postData.email}</li> : ''}
                        {postData.site ? <li className="list-group-item">Сайт - {postData.site}</li> : ''}
                        {postData.tags ? <li className="list-group-item">Теги - {postData.tags.split(', ').map(tag => <h5 style={{display: "inline"}}><a className="badge badge-primary mr-2" href={`/search/${tag.trim()}`}>{tag.trim()}</a></h5>)}</li> : ''}
                        {postData.site ? <li className="list-group-item">
                            <WhatsappShareButton url={`https://vseotzivu.ru/post/${postUrl}`} title={postData.title} className="mr-2">
                                <WhatsappIcon size={32} round={true} />
                            </WhatsappShareButton>
                            <VKShareButton url={`https://vseotzivu.ru/post/${postUrl}`} title={postData.title} className="mr-2">
                                <VKIcon size={32} round={true} />
                            </VKShareButton>
                            <FacebookShareButton url={`https://vseotzivu.ru/post/${postUrl}`} title={postData.title} className="mr-2">
                                <FacebookIcon size={32} round={true} />
                            </FacebookShareButton>
                            <ViberShareButton url={`https://vseotzivu.ru/post/${postUrl}`} className="mr-2" title={postData.title}>
                                <ViberIcon size={32} round={true} />
                            </ViberShareButton>
                            <TelegramShareButton url={`https://vseotzivu.ru/post/${postUrl}`} title={postData.title}  className="mr-2">
                                <TelegramIcon size={32} round={true} />
                            </TelegramShareButton>
                            <EmailShareButton url={`https://vseotzivu.ru/post/${postUrl}`} subject={postData.title}  className="mr-2" body={postData.content}>
                                <EmailIcon size={32} round={true} />
                            </EmailShareButton>
                        </li> : ''}
                    </ul>
                </div>
                <CommentForm post={postData}/>
            </div>
            <CommentCards postId={postData._id}/>
        </React.Fragment>
    )
}

export default PostPage;