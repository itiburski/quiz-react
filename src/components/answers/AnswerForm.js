import React from 'react';
import AnswerItem from './AnswerItem';

function AnswerForm(props) {
    return(
        <form>
            <div className="row">
                <label className="strong">Quiz: </label> <label>{props.quizDescription}</label><br/>
            </div>

            <div className="small">
                {props.answerChoices.map((elem, index) => (
                    <AnswerItem key={elem.questionUid} questionUid={elem.questionUid} 
                        questionDescription={elem.description} questionChoice={elem.choice} questionIndex={index}
                        choices={props.choices} handleChange={props.handleChange} />
                ))}
            </div>

            <button className="action" onClick={ (event) => { event.preventDefault(); props.saveQuizFn(); } } >Submit</button>&nbsp;
            <button className="action" onClick={ (event) => { event.preventDefault(); props.cancelFn(); } } >Cancel</button>
        </form>
    )
}

export default AnswerForm;