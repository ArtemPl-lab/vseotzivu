import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RecomendedCard from './components/RecomendedCards/RecomendedCards';
import MainContent from './components/MainContent';
import Modal from './components/Modal/Modal';
import { fetchComplaints, fetchReviews } from './redux/actions';


function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchComplaints());
    dispatch(fetchReviews());
  });

  return (
    <React.Fragment>
      <Header />
      <div className="container-fluid pt-3">
        <div className="row">
          <MainContent />
          <RecomendedCard />
        </div>
      </div>
      <Footer />
      <Modal />
    </React.Fragment>
  );
}
export default App;
