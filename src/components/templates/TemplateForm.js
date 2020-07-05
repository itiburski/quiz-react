import React from 'react';

function TemplateForm(props) {
        const buttonTitle = props.isAdding ? 'Submit' : 'Update';
        return(
            <form>
                <input name="templateDescription" size="120" value={props.templateDescription} onChange={props.handleChange}
                    placeholder="Template description..." />
                
                <br/>
                <button className="action" onClick={ (event) => { event.preventDefault(); props.saveTemplateFn(); } } >{buttonTitle}</button>
                <button className="action" onClick={ (event) => { event.preventDefault(); props.cancelFn(); } } >Cancel</button>
            </form>
        );
}

export default TemplateForm;