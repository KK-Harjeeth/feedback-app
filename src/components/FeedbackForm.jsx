import React from 'react'
import Card from './shared/Card'
import { useState, useContext, useEffect } from 'react'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';
function FeedbackForm() {
    const {addFeedback,feedbackEdit,updateFeedback}=useContext(FeedbackContext);
    const [text,setText]=useState('');
    const [rating,setRating]=useState(10);
    const [btnDisabled,setBtnDisabled]=useState(true);
    const [message,setMessage]=useState('');

    useEffect(()=>{
        if(feedbackEdit.edit===true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating) 
        }
        
    },[feedbackEdit])
    function handleTextChange(e){
        if(text===''){
            setBtnDisabled(true);
            setMessage('');
        }
        else if(text!=='' && text.trim().length<10){
            setBtnDisabled(true);
            setMessage('Text must be atleast 10 characters');
        }
        else{
            setMessage('');
            setBtnDisabled(false);
        }
        setText(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if(text.trim().length>=10){
            const newFeedback={
                text,
                rating,
            }
            if(feedbackEdit.edit===true){
                updateFeedback(feedbackEdit.item.id,newFeedback);
            }
            else{
                addFeedback(newFeedback);
            }
            

            setText('');
        }
    }
  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate  your overall experience with us?</h2>
            <RatingSelect select={(rating)=>setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder='write a review' value={text}/>
                <Button type="submit" version='secondary' isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm
