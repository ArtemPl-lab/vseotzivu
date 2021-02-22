import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import About from './StaticPages/About';
import Accommodation from './StaticPages/Accommodation';
import Feedback from './StaticPages/Feedback';
import UniversalForm from './Forms/UniversalForm';
import Rules from './StaticPages/Rules';
import { useSelector } from 'react-redux';
import Catalog from './Catalog/Catalog';
import { fetchComplaints, fetchReviews } from '../redux/actions';
import PostPage from './PostPage/PostPage';
import Search from './Search/Search';
import Remove from './PostPage/Remove';
import Auth from './Auth/Auth';
import Register from './Auth/Register';
const MainContent = () => {
    const complaints = useSelector(state => state.posts.complaints);
    const reviews = useSelector(state => state.posts.reviews);
    return(
        <div className="mb-4 col-xl-8">
            <BrowserRouter>
                <Route exact path="/">
                    <UniversalForm />
                </Route>
                <Route exact path="/complaints">
                    <Catalog posts={complaints.data} title="Жалобы" download={()=>fetchComplaints(complaints.page)}/>
                </Route>
                <Route exact path="/reviews">
                    <Catalog posts={reviews.data} title="Отзывы" download={()=>fetchReviews(reviews.page)}/>
                </Route>
                <Route exact path="/post/:url" component={PostPage} />
                <Route exact path="/about">
                    <About />
                </Route>
                <Route exact path="/rules">
                    <Rules />
                </Route>
                <Route exact path="/accommodation">
                    <Accommodation />
                </Route>
                <Route exact path="/feedback">
                    <Feedback />
                </Route>
                <Route exact path="/admin">
                    <Auth />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/search/:query" component={Search}/>
                <Route exact path="/remove/:url" component={Remove}/>
            </BrowserRouter>
        </div>
    );
}

export default MainContent;