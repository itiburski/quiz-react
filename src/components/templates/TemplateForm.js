import React from 'react';
import TemplateDataService from '../../services/templateDataService';

class TemplateForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.template.description,
            status: props.template.status,
            templateUid: props.template.templateUid,
            isAdding: !props.template.templateUid || 0 === props.template.templateUid.length,
            errorMessage: ''
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

    setErrorMessage = (message) => {
        this.setState({ errorMessage: message });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {description, templateUid} = this.state;
        let action = this.state.isAdding ? TemplateDataService.create(description) : TemplateDataService.update(templateUid, description);

        action
            .then(response => {
                this.props.submitCallback();
            })
            .catch(error => {
                if (error.response) {
                    // Request made and server responded
                    this.setErrorMessage(error.response.data.message);
                  } else if (error.request) {
                      console.log("error.request");
                    // The request was made but no response was received
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
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
                { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }

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