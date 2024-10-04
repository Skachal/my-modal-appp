import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
  const [totalHours, setTotalHours] = useState(3);
  const [courseType, setCourseType] = useState('academic');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(1);
  const [breaks, setBreaks] = useState(false);
  
  const [startTime, setStartTime] = useState('07:00');
  const [endTime, setEndTime] = useState('07:45');

  useEffect(() => {
    // Устанавливаем сегодняшнюю дату для startDate
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // Формат YYYY-MM-DD
    setStartDate(formattedToday);
    
    // Устанавливаем дату на 6 дней вперед для endDate
    today.setDate(today.getDate() + 6);
    const formattedFutureDate = today.toISOString().split('T')[0];
    setEndDate(formattedFutureDate);
  }, []);

  const handleTotalHoursChange = (value) => {
    const newTotalHours = totalHours + value;

    // Если новое общее количество часов меньше или равно нулю
    if (newTotalHours <= 0) {
      setTotalHours(0);
      // Устанавливаем endDate на сегодняшнюю дату
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0]; // Формат YYYY-MM-DD
      setEndDate(formattedToday);
    } else {
      // Если новое общее количество часов больше нуля
      setTotalHours(newTotalHours);
      // Устанавливаем endDate на 2 дня вперед
      const newEndDate = new Date(endDate);
      newEndDate.setDate(newEndDate.getDate() + 2);
      setEndDate(newEndDate.toISOString().split('T')[0]);
    }
  };

  const handleDayToggle = (day) => {
    setDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );

    // Обновляем endDate в зависимости от выбранных дней
    const updatedEndDate = new Date(endDate);
    const totalDays = days.length; // Текущее количество выбранных дней

    // Устанавливаем endDate на 2 дня вперед в зависимости от количества выбранных дней
    updatedEndDate.setDate(updatedEndDate.getDate() + (totalDays > 0 ? 0 : 2)); // Если нет выбранных дней, добавляем 2 дня
    setEndDate(updatedEndDate.toISOString().split('T')[0]); // Устанавливаем обновленную дату
  };

  const handleThreeDayClick = () => {
    const selectedDays = ['Пн', 'Ср', 'Пт'];
    setDays(selectedDays);
    // Обновляем endDate в зависимости от выбранных дней
    const updatedEndDate = new Date(endDate);
    updatedEndDate.setDate(updatedEndDate.getDate() + 2); // Добавляем 2 дня
    setEndDate(updatedEndDate.toISOString().split('T')[0]);
  };

  const handleTwoDayClick = () => {
    const selectedDays = ['Вт', 'Чт'];
    setDays(selectedDays);
    // Обновляем endDate в зависимости от выбранных дней
    const updatedEndDate = new Date(endDate);
    updatedEndDate.setDate(updatedEndDate.getDate() + 2); // Добавляем 2 дня
    setEndDate(updatedEndDate.toISOString().split('T')[0]);
  };

  const handleCourseTypeChange = (e) => {
    const selectedCourseType = e.target.value;
    setCourseType(selectedCourseType);

    // Установка времени в зависимости от выбранного типа курса
    if (selectedCourseType === 'astronomical') {
      setStartTime('07:00');
      setEndTime('08:00');
    } else {
      setStartTime('07:00');
      setEndTime('07:45');
    }
  };

  return (
    <div className="overlay">
      <div className="modal-container">
        <div className='one'>
          <h2 className="title">Редактирование расписания</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className='line'></div>
        <div className='two'>
          <p className='school'>Онлайн школа</p>
          <div className='colorrr'>
            <p className='colorr'>Цвет группы: </p>
            <input type="color" className="color-input" />
          </div>
        </div>
        <div className='three'>
          <select value={courseType} onChange={handleCourseTypeChange} className="select-course">
            <option value="academic">Академические</option>
            <option value="astronomical">Астрономические</option>
          </select>
          
          <div className="chas-input-group">
            <button className="button-m" onClick={() => handleTotalHoursChange(-1)}>-</button>
            <span className="total-hours">{totalHours}</span>
            <label className="chas">Всего <br></br> часов</label>
            <button className="button-p" onClick={() => handleTotalHoursChange(1)}>+</button>
          </div>

          <div className="input-group date-group">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="date-input-l" />
            <label className="date-label">до</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="date-input-r" />
          </div>
        </div>
        
        <div className='four'>
          <button className="three-day" onClick={handleThreeDayClick}>Пн/Ср/Пт</button>
          <button className="two-day" onClick={handleTwoDayClick}>Вт/Чт</button>
          
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <button
                  key={day}
                  className={`day-label ${days.includes(day) ? 'active' : ''}`}
                  onClick={() => handleDayToggle(day)}
              >
                  {day}
              </button>
          ))}
        </div>

        <div className='five'>
          <select value={courseType} onChange={handleCourseTypeChange} className="select-course">
            <option value="pereriv">Без перерыва</option>
            <option value="5min">5 мин</option>
            <option value="10min">10 мин</option>
            <option value="15min">15 мин</option>
            <option value="20min">20 мин</option>
            <option value="30min">30 мин</option>
          </select>
          
          <div className="chas-input-group">
            <button className="button-m" onClick={() => setHoursPerDay(Math.max(0, hoursPerDay - 1))}>-</button>
            <span className="total-hours">{hoursPerDay}</span>
            <label className="chas">Часов <br></br>в день</label>
            <button className="button-p" onClick={() => setHoursPerDay(hoursPerDay + 1)}>+</button>
          </div>

          <div className="input-group date-group">
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="date-input-l" />
            <label className="date-label">до</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="date-input-r" />
          </div>
        </div>
        
        <div className='six'>
          <select value={courseType} onChange={handleCourseTypeChange} className="select-prepod" disabled={courseType === 'astronomical'}>
            <option value="prepod">Выберите преподавателя на это время</option>
          </select>
          <select value={courseType} onChange={handleCourseTypeChange} className="select-auditoria" disabled={courseType === 'astronomical'}>
            <option value="auditoria">Аудитория</option>
          </select>
        </div>
        
        <div className='red-warning'>
          <p>Выбор <span>преподавателя</span> и <span>аудитории </span>не обязательны</p>
        </div>
        <div className='line'></div>
        <div className='buttons'>
          <button className="closed-button" onClick={onClose}>
            Отмена
          </button>
          <button className="add-schedule-button" onClick={() => console.log({ totalHours, courseType, startDate, endDate, days, hoursPerDay, breaks })}>
            Добавить расписание
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
