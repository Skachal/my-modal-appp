
import React, { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h1>Модальное окно в React</h1>
      <button onClick={toggleModal}>Открыть модальное окно</button>
      <Modal isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default App;
