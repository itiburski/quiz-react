import React from 'react';
import QuestionContainer from '../questions/QuestionContainer';

function TemplateDetail (props) {

    return (
        <div>
            <div className="row">
                <label className="strong">Description: </label> <label>{props.templateDescription}</label><br/>
            </div>
            <div className="row">
                <label className="strong">Status: </label> <label>{props.templateStatus}</label><br/>
            </div>

            <hr/>

            <QuestionContainer templateUid={props.templateUid} />

            <button className="action" onClick={() => props.cancelFn()} >Back</button>
        </div>
    )
}

export default TemplateDetail;