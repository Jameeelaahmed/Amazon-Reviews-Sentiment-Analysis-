import { useState, useRef } from 'react';
import classes from './SingleModel.module.css'; // Assuming classes are defined in SingleModel.module.css

export default function SingleModel() {
    const [reviewValue, setReviewValue] = useState('');
    const [selectedModel, setSelectedModel] = useState(null);
    const [sentiment, setSentiment] = useState(null); // State variable to store sentiment
    const reviewRef = useRef();
    const [model, setModel] = useState(false);
    const [error, setError] = useState(false)

    const handleModelSelect = (modelName) => {
        console.log(modelName);
        setSelectedModel(modelName);
        if (modelName === 'Roberta') {
            setModel(true); // Set model state to true if "Roberta" is selected
        } else {
            setModel(false); // Set model state to false for other models
        }
        setError(false);

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
                    const data = await response.json();
                    console.log('Sentiment:', data.sentiment);
                    // Set sentiment value in state
                    setSentiment(data.sentiment);
                    console.log('Review submitted successfully!');
                    console.log(data)
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

        if (!model) {
            setError(prev => (!prev))
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.models}>
                <button className={classes.button} onClick={() => handleModelSelect('Naive Bayes')}>
                    Naive Bayes
                </button>
                <button className={`${classes.button} ${model && classes.button_active}`} onClick={() => handleModelSelect('Roberta')}>
                    RoBerta
                </button>
                <button className={classes.button} onClick={() => handleModelSelect('CNN')}>
                    CNN
                </button>
                <button className={classes.button} onClick={() => handleModelSelect('rnn')}>
                    Rnn
                </button>
            </div>

            <form className={classes.subscribe} onSubmit={handleSubmit}>
                <div className={classes.form}>
                    <textarea
                        placeholder="Enter your review"
                        ref={reviewRef}
                        value={reviewValue}
                        onChange={(e) => setReviewValue(e.target.value)}
                    ></textarea>
                    <input type="submit" value="Submit" />
                </div>
                <div>
                    {error && <p className={classes.error}>you havenot select a model yet!</p>}
                </div>
            </form>

            <div className={classes.emojies}>
                <div id="angry" className={`${classes.emoji} ${sentiment === 0 && classes.active1} `} onClick={() => console.log('Angry clicked')}>
                    <img className={classes.emoji_img} src="/src/assets/Angry Emoji.png" alt="" />
                </div>
                <div id="love" className={`${classes.emoji} ${sentiment === 1 && classes.active2} `} onClick={() => console.log('Love clicked')}>
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
