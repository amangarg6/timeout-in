import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Calnder.css';

function Calndar() {
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [userPunches, setUserPunches] = useState([]);
  const [userLeaves, setUserLeaves] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData")).id;
  const userId = userData;

  const mapStatusToWord = (status) => {
    switch (status) {
     
      case 1:
        return 'P';
      case 2:
        return 'A';
      case 3:
        return 'HFD';
      default:
        return null;
    }
  };

  useEffect(() => {
    fetch(`https://localhost:7226/api/punch/GetById/${userId}`)
      .then(response => response.json())
      .then(data => setUserPunches(data))
      .catch(error => console.error('Error fetching punch data:', error));

    fetch(`https://localhost:7226/api/leave/GetById/${userId}`)
      .then(response => response.json())
      .then(data => setUserLeaves(data))
      .catch(error => console.error('Error fetching leave data:', error));
  }, [userId]);

  const getAttendanceStatusForDate = (date) => {
    const punchForDate = userPunches.find(punch => new Date(punch.date).toDateString() === date.toDateString());

    if (punchForDate) {
      return mapStatusToWord(punchForDate.attandanceStatus);
    } else {
      const leaveForDate = userLeaves.find(leave => new Date(leave.date).toDateString() === date.toDateString());
      if (leaveForDate) {
        return 'L';
      }
      return null; 
    }
  };

  const renderCellContent = ({ date, view }) => {
    const attendanceStatus = getAttendanceStatusForDate(date);
  
    let statusColor = '';
    let statusLabel = '';
  
    switch (attendanceStatus) {
      case 'P':
        statusColor = '#4caf50'; 
        statusLabel = 'P';
        break;
      case 'L':
        statusColor = '#ff9800';
        statusLabel = 'L';
        break;
      case 'A':
        statusColor = '#f44336'; 
        statusLabel = 'A';
        break;
      case 'HFD':
        statusColor = '#2196f3'; 
        statusLabel = 'HFD';
        break;
      default:
        statusColor = '#f9f9f9'; 
        break;
    }
  
    if (view === 'month') {
      return (
        <div className="attendance-status" style={{ backgroundColor: statusColor }}>
          {statusLabel}
        </div>
      );
    }

    return (
      <div>
        <div>{date.toDateString()}</div>
        <div className={`attendance-status ${attendanceStatus}`} style={{ backgroundColor: statusColor }}>
          {statusLabel}
        </div>
      </div>
    );
  };
  
  
  return (
    <div className="calndar-container text-center ">
      <Calendar
        onChange={setCalendarDate}
        value={calendarDate}
        tileContent={renderCellContent}
      />
    </div>
  );
}

export default Calndar;
