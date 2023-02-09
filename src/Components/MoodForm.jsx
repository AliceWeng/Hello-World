import "../App.css";

function MoodForm() {
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} action="/moods" method="POST">
                <label htmlFor="text">
                    Let's talk about our feelings.
                </label>
                <textarea id="text" name="text" type="text" rows="10" cols="50" required/>
                <label htmlFor="color">
                    What color best describes your mood today?
                </label>
                <input id="color" name="color" type="color"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default MoodForm;