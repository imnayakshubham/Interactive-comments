import React from 'react'
import "./DeleteModal.css"

export const DeleteModal = ({ setIsModalVisible, handleDeleteComment, data }) => {
    return (
        <div className='delete__modal__wrapper'>
            <div className="delete__modal__container">
                <div className="delete__modal__title">
                    <div className="modal__title">Delete comment</div>
                </div>
                <div className="delete__modal__content">
                    <span> Are you sure you want to delete this comment? This will remove the
                        comment and can't be undone.</span>
                </div>
                <div className="delete__modal__footer">
                    <button className="cancel-btn" onClick={() => { setIsModalVisible(false) }}>
                        No, cancel
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteComment(data)}>
                        Yes, delete
                    </button>
                </div>

            </div>
        </div>
    )
}
