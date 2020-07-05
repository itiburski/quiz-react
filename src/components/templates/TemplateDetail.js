import React from 'react';
import QuestionContainer from '../questions/QuestionContainer';
import { TemplateStatusEnum } from '../../enums/TemplateStatusEnum';

function TemplateDetail (props) {

    let button;
    if (TemplateStatusEnum.PENDING === props.templateStatus) {
        button = <button className="action" onClick={props.updateTemplateStatusCallback}>Activate</button>
    } else if (TemplateStatusEnum.ACTIVE === props.templateStatus) {
        button = <button className="action" onClick={props.updateTemplateStatusCallback}>Inactivate</button>
    }

    return (
        <div>
            <div className="row">
                <label className="strong">Description: </label> <label>{props.templateDescription}</label><br/>
            </div>
            <div className="row">
                <label className="strong">Status: </label> <label>{props.templateStatus}</label><br/>
            </div>

            {button}

            <hr/>

            <QuestionContainer templateUid={props.templateUid} />

            <button className="action" onClick={() => props.cancelFn()} >Back</button>
        </div>
    )
}

export default TemplateDetail;