import React from 'react';

class TemplateDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: props.template.description,
            status: props.template.status,
            templateUid: props.template.templateUid
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <label className="strong">Description: </label> <label>{this.state.description}</label><br/>
                </div>
                <div className="row">
                    <label className="strong">Status: </label> <label>{this.state.status}</label><br/>
                </div>

                <button className="action" onClick={() => this.props.cancelCallback()} >Cancel</button>
            </div>
        )
    }
}

export default TemplateDetail;