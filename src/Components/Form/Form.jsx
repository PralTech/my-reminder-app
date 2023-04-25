import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { auth } from '../Login/Firebase';
import  './Form.css'

function Form(onLogoutSuccess) {
  const [reminderName, setReminderName] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const remindersRef = firebase.firestore().collection('reminders');
        remindersRef.where('userId', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot((snapshot) => {
            const newReminders = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setReminders(newReminders);
          });
      }
    });
    return unsubscribe;
  }, []);
  

  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      return;
    }
    const remindersRef = firebase.firestore().collection('reminders');
    await remindersRef.add({
      name: reminderName,
      date: reminderDate,
      time: reminderTime,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId: auth.currentUser.uid,
    });
    setReminderName('');
    setReminderDate('');
    setReminderTime('');
  };

  const handleCompleteReminder = async (reminderId) => {
    const reminderRef = firebase.firestore().collection('reminders').doc(reminderId);
    await reminderRef.update({
      completedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const handleDeleteReminder = async (reminderId) => {
    const reminderRef = firebase.firestore().collection('reminders').doc(reminderId);
    await reminderRef.delete();
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('logout Successfully');
      onLogoutSuccess(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="reminder-container">
      <form onSubmit={handleAddReminder} className="reminder-form">
        <label>
          Name:
          <input className="login-input" type="text" value={reminderName}
           onChange={(e) => setReminderName(e.target.value)} placeholder='Enter your name' required />
        </label>
        <label>
          Date:
          <input className="login-input" type="date" value={reminderDate} 
          onChange={(e) => setReminderDate(e.target.value)} required />
        </label>
        <label>
          Time:
          <input className="login-input" type="time" value={reminderTime} 
          onChange={(e) => setReminderTime(e.target.value)} required />
        </label>
        <button type="submit" className="add-reminder-btn">Add Reminder</button>
      </form>

      <ul className="reminder-list">
        {
          reminders.map((reminder) => (
          <li key={reminder.id} className="reminder-list">
            <span className="reminder-info">{reminder.name} - {reminder.date} {reminder.time}</span>
            {!reminder.completedAt && (
              <button onClick={() => handleCompleteReminder(reminder.id)} 
              className="complete-reminder-btn">Complete</button>
            )}
            <button onClick={() => handleDeleteReminder(reminder.id)}
             className="delete-reminder-btn">Delete</button>
          </li>
        ))
        }
      </ul>
      <button onClick={handleLogout} className="logout-btn">Log Out</button>
    </div>
  );
}

export default Form;
