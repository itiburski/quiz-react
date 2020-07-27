import React from 'react';

function AnswerItem(props) {
    return(
        <div>
            <div className="row">
                <label className="strong">Question: </label> <label>{props.questionDescription}</label><br/>
                <br/>

                {props.choices.map(element => (
                    <label key={props.questionUid + element.choice}>
                        <input 
                            type="radio" 
                            name={"choice"+props.questionIndex}
                            data-index={props.questionIndex}
                            value={element.choice}
                            checked={props.questionChoice === element.choice}
                            onChange={props.handleChange}
                        /> {element.description}
                    </label>
                ))}
            </div>

        </div>
    );
}

export default AnswerItem;