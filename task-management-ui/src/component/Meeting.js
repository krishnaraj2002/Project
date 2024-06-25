import React from 'react';
import MainHeader from './MainHeader'; // Adjust the path as per your project structure

const Meeting = () => {
  const handleConnect = () => {
    const googleMeetUrl = 'https://meet.google.com/mka-bkvb-bjv';
    window.location.href = googleMeetUrl;
  };

  const handleSchedule = () => {
    const googleCalendarUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en';
    window.location.href = googleCalendarUrl;
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(rgb(82, 67, 170), rgb(237, 80, 180)) repeat',
  };

  const leftSideStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const meetingImageStyle = {
    width: '520px', // Corrected 'Width' to 'width'
    height: '550px', // Adjusted height for the image to maintain aspect ratio
    borderRadius: '70px', // Adjust the border radius as needed
  };

  const rightSideStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    padding: '2rem',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Box shadow for depth
    backdropFilter: 'blur(10px)', // Blur effect for a frosted glass effect (experimental)
    maxWidth: '600px', // Max width of the container
    margin: '0 2rem', // Adjust margin as needed
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  };

  return (
    <>
      <MainHeader />
      <div style={containerStyle}>
        <div style={leftSideStyle}>
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4415.jpg?t=st=1718533563~exp=1718537163~hmac=4ade297b85dfba2905a6269e3627c3f310636c44221aef56f4b6846e4e7735ad&w=740"
            alt="Meeting"
            style={meetingImageStyle}
          />
        </div>
        <div style={rightSideStyle}>
          <h2>Meeting Actions</h2>
          <p>
            This meeting is scheduled to discuss project updates and planning for the upcoming quarter.
          </p>
          <p>Please join us using the buttons below.</p>
          <p>
            <strong>Location:</strong> Virtual meeting on Google Meet
          </p>
          <div style={buttonGroupStyle}>
            <button className="btn btn-primary" onClick={handleConnect}>
              Connect to Meeting
            </button>
            <button className="btn btn-success" onClick={handleSchedule}>
              Schedule the Meeting
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meeting;
