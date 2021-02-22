import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../redux/actions';
import Spinner from '../Spinners/Spinner';
const Modal = () => {
    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();
    const close = () => dispatch(hideNotification());
    return (
        <React.Fragment>
            <div className={`modal fade ${modal.isShow && "show"}`}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modal.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={close}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {modal.content || <Spinner />}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={close}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${modal.isShow && "show"}`}></div>
        </React.Fragment>
    )
}

export default Modal;
