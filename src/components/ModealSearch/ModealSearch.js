import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ModealSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // هنا يمكنك تنفيذ عملية البحث بناءً على searchQuery
    console.log("Searching for:", searchQuery);
    handleClose(); // إغلاق المودال بعد تنفيذ البحث
  };

  return (
    <div>
      <Button variant="link" className="onclinkSearch" onClick={handleShow}>
        <FontAwesomeIcon icon={faSearch} className="color_icon" />
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>بحث</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSearch} className="formSeasrch">
            <input
              type="text"
              className="form-control"
              placeholder="ابحث هنا..."
              value={searchQuery}
              onChange={handleInputChange}
              required
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                إلغاء
              </Button>
              <Button variant="primary" type="submit">
                بحث
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SearchBar;
