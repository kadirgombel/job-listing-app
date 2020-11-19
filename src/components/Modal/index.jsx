import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Modal.scss";

function Modal({ children, headerText, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  return (
    <div className="modal">
      <div ref={modalRef} className="modal__dialog">
        <div>
          <div className="modal__header">
            <span className="modal__header-text"> {headerText} </span>
            <span onClick={onClose} className="modal__close">
              &#10006;
            </span>
          </div>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  headerText: PropTypes.string,
};

export default Modal;
