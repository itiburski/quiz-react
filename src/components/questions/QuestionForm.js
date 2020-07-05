import React from 'react';

function QuestionForm (props) {

    let buttonCancel;
    if (props.questionUid !== ''){
        buttonCancel = <button onClick={ (event) => {event.preventDefault(); props.cancelCallback(); } } className="action">Cancel</button>;
    }

    return(
        <div>
            <div className="small">
                <form>
                    <input name="questionDescription" className="fullSize" value={props.questionDescription} onChange={props.handleChange}
                        placeholder="Question description..." />
                    
                    <br/>
    
                    <button onClick={ (event) => {event.preventDefault(); props.saveCallback();} } className="action">Save</button>&nbsp;
                    {buttonCancel}                
                </form>
            </div>
            <br/>&nbsp;
            <br/>            
        </div>

    );

}

export default QuestionForm;