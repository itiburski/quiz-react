import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function QuizForm (props) {
    const buttonTitle = props.isAdding ? 'Submit' : 'Update';
    let templateElements;

    if (props.isAdding) {
        templateElements =
            <div className="row">
                <label className="strong">Template: </label>
                <br/>
                <select className="fullSize" key={props.templateUid} value={props.templateUid} name="templateUid" onChange={props.handleChange}>
                    <option key="empty" value="">-- Choose a template --</option>
                    {props.templates.map(template => <option key={template.templateUid} value={template.templateUid}>{template.description}</option>)}
                </select>
                <br/>
            </div>
    }

    return(
        <form>
            {templateElements}

            <div className="row">
                <label className="strong">Description: </label>
                <br/>
                <input name="quizDescription" className="fullSize" value={props.quizDescription} onChange={props.handleChange}
                    placeholder="Quiz description..." />
                <br/>
            </div>

            <div className="row">
                <label className="strong">Begin date: </label>
                <br/>
                <DatePicker selected={props.quizBegin} onChange={props.handleQuizBeginChangeFn} dateFormat="MMMM d, yyyy"/>
                <br/>
            </div>

            <div className="row">
                <label className="strong">End date: </label>
                <br/>
                <DatePicker selected={props.quizEnd} onChange={props.handleQuizEndChangeFn} dateFormat="MMMM d, yyyy"/>
                <br/>
            </div>

            <button className="action" onClick={ (event) => { event.preventDefault(); props.saveQuizFn(); } } >{buttonTitle}</button>
            <button className="action" onClick={ (event) => { event.preventDefault(); props.cancelFn(); } } >Cancel</button>
        </form>
    );
}

export default QuizForm;