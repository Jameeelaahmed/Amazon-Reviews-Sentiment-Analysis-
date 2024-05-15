import classes from './SingleModel.module.css';
import { useState, useRef } from 'react';

export default function SingleModel() {
    const [reviewValue, setReviewValue] = useState('');
    const reviewRef = useRef();

    function handleFocus1() {
        // handle focus 1 logic
    }

    function handleFocus2() {
        // handle focus 2 logic
    }

    function handleSubmit(e) {
        e.preventDefault();
        setReviewValue(reviewRef.current.value);
    }

    console.log(reviewValue)

    return (
        <div className={classes.container}>
            <div className={classes.subscribe}>
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="Enter your email" ref={reviewRef}></textarea>
                    <input type="submit" value="Subscribe" />
                </form>
            </div>

            <div className={classes.models}>
                <div className={classes.tabs}>
                    <div className={classes.model}>Naive Bayes</div>
                    <div className={classes.model}>Rnn</div>
                    <div className={classes.model}>Roberta</div>
                </div>
            </div>

            <div className={classes.emojies}>
                <div id="angry" className={classes.emoji} onClick={handleFocus1}>
                    <img className={classes.emoji_img} src="/src/assets/Angry Emoji.png" alt="" />
                </div>
                <div id="love" className={classes.emoji} onClick={handleFocus2}>
                    <img src="/src/assets/Smile Emoji With Hearts.png" className={classes.emoji_img} />
                </div>
            </div>
        </div>
    );
}
