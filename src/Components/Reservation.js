import styles from "./Reservation.css";
import { useState } from "react";
//import { submitAPI } from './apiUtils'; // Correct the path as needed


function Reservations (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState ('');
    const [number, setNumber] = useState ('');
    const [date, setDate] = useState ('');
    const [time, setTime] = useState ('6:00');
    const [guests, setGuests] = useState ('');

    const clearInput = () => {
        setName('');
        setEmail('');
        setNumber('');
        setDate('');
        setTime('6:00');
        setGuests('')
    }

    //Function to handle form submission in Reservation component
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.submitForm(e);
        clearInput();
        if (name.length < 3 || number.length < 9) {
            alert("Name must be at least 3 characters. Phone must be at least 10 characters.");
            return;
        }
    }
    const handleChange = (e) => {
        setDate(e);
        props.dispatch(e);
    };

    return (
        <div className="reservation">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="heading">Reserve a Table:</h1>

                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required/>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter a valid email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required/>

                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter a phone number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required/>

                    <label htmlFor="book-date">Preferred Date:</label>
                    <input
                        type="date"
                        id="book-date"
                        value={date}
                        onChange={(e) => handleChange(e.target.value)}
                        name="date"
                        required/>

                    <label htmlFor="book-time">Preferred Time:</label>
                    <select
                        type="time"
                        id="book-time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}>
                            <option value="" >Select Time</option>
                        {/*Populate option from the availableTimes prop */}
                        {props.availableTimes.availableTimes.map(availableTimes => {return <option key={availableTimes}>{availableTimes}</option>})}

                    </select>

                    <label htmlFor="book-guests">Number of Guests:</label>
                    <select
                        id="book-guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        name="guests"
                        required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    <button type="submit" >
                            Book a Table
                    </button>
            </form>
        </div>
    )
}

export default Reservations;
