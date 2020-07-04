import React from 'react';

function QuestionForm (props) {

    return(
        <form onSubmit={props.submitCallback}>
            <input name="questionDescription" size="80" value={props.questionDescription} onChange={props.handleChange}
                placeholder="Description..." />&nbsp;
            
            <button className="action">Save</button>
        </form>
    );

}

export default QuestionForm;