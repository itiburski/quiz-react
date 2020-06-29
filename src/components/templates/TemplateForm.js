import React from 'react';
import TemplateDataService from '../../services/templateDataService';

class TemplateForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.template.description,
            status: props.template.status,
            templateUid: props.template.templateUid,
            isAdding: !props.template.templateUid || 0 === props.template.templateUid.length
        }
    }

    handleChange = (event) => {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? 
            this.setState({
                [name]: checked
            })
        :
        this.setState({
            [name]: value
        }) 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {description, templateUid} = this.state;
        let action = this.state.isAdding ? TemplateDataService.create(description) : TemplateDataService.update(templateUid, description);

        action
            .then(response => {
                this.props.submitCallback();
            })
            .catch(e => {
                console.error(e);
            });
    }

    componentDidMount = () => {
        const formTitle = this.state.isAdding ? 'New template' : 'Edit template';
        this.props.setTitleCallback(formTitle);
    }

    render() {
        const buttonTitle = this.state.isAdding ? 'Submit' : 'Update';
        return(
            <form onSubmit={this.handleSubmit}>
                <input name="description" size="120" value={this.state.description} onChange={this.handleChange}
                    placeholder="Description..." />
                
                <br/>
                <button className="action">{buttonTitle}</button>
                <button className="action" onClick={() => this.props.cancelCallback()} >Cancel</button>
            </form>
        );
    }

}

export default TemplateForm;