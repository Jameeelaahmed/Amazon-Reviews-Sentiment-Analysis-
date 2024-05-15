import { useState, useRef } from 'react';
import classes from './SingleModel.module.css'; // Assuming classes are defined in SingleModel.module.css

export default function SingleModel() {
    const [reviewValue, setReviewValue] = useState('');
    const [selectedModel, setSelectedModel] = useState(null);
    const reviewRef = useRef();

    const handleModelSelect = (modelName) => {
        console.log(modelName);
        setSelectedModel(modelName);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedModel && reviewRef.current.value.trim() !== '') {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/send_review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        reviewText: reviewRef.current.value,
                        modelName: selectedModel,
                    }),
                });
                if (response.ok) {
                    console.log('Review submitted successfully!');
                    // Reset review input and selected model after submission
                    setReviewValue('');
                    setSelectedModel(null);
                } else {
                    console.error('Failed to submit review:', response.statusText);
                }
            } catch (error) {
                console.error('Error submitting review:', error.message);
            }
        } else {
            console.error('Please select a model and provide a review.');
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.models}>
                <button className={classes.button} onClick={() => handleModelSelect('Naive Bayes')}>
                    Naive Bayes
                </button>
                <button className={classes.button} onClick={() => handleModelSelect('RNN')}>
                    RNN
                </button>
                <button className={classes.button} onClick={() => handleModelSelect('Roberta')}>
                    Roberta
                </button>
            </div>

            <form className={classes.subscribe} onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter your review"
                    ref={reviewRef}
                    value={reviewValue}
                    onChange={(e) => setReviewValue(e.target.value)}
                ></textarea>
                <input type="submit" value="Submit" />
            </form>

            <div className={classes.emojies}>
                <div id="angry" className={classes.emoji} onClick={() => console.log('Angry clicked')}>
                    <img className={classes.emoji_img} src="/src/assets/Angry Emoji.png" alt="" />
                </div>
                <div id="love" className={classes.emoji} onClick={() => console.log('Love clicked')}>
                    <img
                        src="/src/assets/Smile Emoji With Hearts.png"
                        className={classes.emoji_img}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
