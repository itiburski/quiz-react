import React, { Component } from 'react';
import TemplateDataService from '../../services/templateDataService'
import TemplateList from './TemplateList';
import TemplateForm from './TemplateForm';
import TemplateDetail from './TemplateDetail';
import { ModeEnum } from '../../enums/ModeEnum';
import { TemplateStatusEnum } from '../../enums/TemplateStatusEnum';
import handleChange from '../../util/handleChange';

const emptyTemplate = {
    description: '',
    status: '',
    templateUid: ''
};

class TemplateContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            templates: [],
            mode: ModeEnum.LISTING,
            title: 'Template list',
            templateUid: '',
            templateDescription: '',
            templateStatus: '',
            errorMessage: ''
        };
    }

    componentDidMount() {
        this.getAllTutorials();
    }

    getAllTutorials() {
        this.setListMode();
        TemplateDataService.getAll()
            .then(response => {
                this.setState({ templates: response.data });
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    changeMode(template, mode, title) {
        this.setState({
            templateUid: template.templateUid,
            templateDescription: template.description,
            templateStatus: template.status,
            mode: mode,
            title: title,
            errorMessage: ''
        });
    }

    setListMode = () => {
        this.changeMode(emptyTemplate, ModeEnum.LISTING, 'Template list');
    }

    setAddMode = () => {
        this.changeMode(emptyTemplate, ModeEnum.ADDING, 'New template');
    }

    setEditMode = (editTemplate) => {
        this.changeMode(editTemplate, ModeEnum.EDITING, 'Edit template');
    }

    setDetailMode = (detailTemplate) => {
        this.changeMode(detailTemplate, ModeEnum.DETAILING, 'Template detail');
    }

    deleteTemplate = (templateToDelete) => {
        let confirmDelete = window.confirm('Delete template?');

        if (confirmDelete) {
            TemplateDataService.delete(templateToDelete.templateUid)
                .then(response => {
                    this.getAllTutorials();
                })
                .catch(error => {
                    this.handleDataServiceError(error);
                });
        }
    }

    saveTemplate = () => {
        const {templateDescription, templateUid} = this.state;
        let action = ModeEnum.ADDING === this.state.mode ? TemplateDataService.create(templateDescription) : TemplateDataService.update(templateUid, templateDescription);

        action
            .then(response => {
                this.getAllTutorials();
            })
            .catch(error => {
                this.handleDataServiceError(error);
            });
    }

    updateTemplateStatus = (template) => {
        let msg;
        let action;
        if (TemplateStatusEnum.PENDING === template.status) {
            action = TemplateDataService.activate(template.templateUid);
            msg = 'activate';
        } else if (TemplateStatusEnum.ACTIVE === template.status) {
            action = TemplateDataService.inactivate(template.templateUid);
            msg = 'inactivate';
        }

        let confirmChangeStatus = window.confirm(`Confirm ${msg} template?`);

        if (confirmChangeStatus && action) {
            action
                .then(response => {
                    this.getAllTutorials();
                })
                .catch(error => {
                    this.handleDataServiceError(error);
                });
        }
    }

    handleDataServiceError(error) {
        if (error.response) {
            // Request made and server responded
            this.setErrorMessage(error.response.data.message);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('error.message', error.message);
            this.setErrorMessage(error.message);
        }
    }

    setTitle = (newTitle) => {
        this.setState({title: newTitle});
    }

    setErrorMessage = (message) => {
        this.setState({ errorMessage: message });
    }

    handleNewdButton = (event) => {
        this.setAddMode();
    }

    render() {
        let content;

        if (this.state.mode === ModeEnum.LISTING) {
            content = 
                <div>
                    { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }
                    <p>{this.state.templates.length} templates found</p>
                    <TemplateList templates = {this.state.templates} editFn={this.setEditMode}
                        deleteFn={this.deleteTemplate} detailFn={this.setDetailMode}
                        updateTemplateStatusFn={this.updateTemplateStatus} />
                    <button className="action" onClick={this.handleNewdButton}>New</button>
                </div>
        }

        if (this.state.mode === ModeEnum.ADDING || this.state.mode === ModeEnum.EDITING){ 
            content = 
                <div>
                    { this.state.errorMessage && <h3 className="error-message"> { this.state.errorMessage } </h3> }
                    <TemplateForm templateDescription={this.state.templateDescription} 
                        saveTemplateFn={this.saveTemplate} cancelFn={this.setListMode} 
                        handleChange={handleChange.bind(this)} isAdding={ModeEnum.ADDING === this.state.mode} />
                </div>
        }

        if (this.state.mode === ModeEnum.DETAILING){ 
            content = 
                <TemplateDetail templateUid={this.state.templateUid} 
                    templateDescription={this.state.templateDescription} templateStatus={this.state.templateStatus}
                    cancelFn={this.setListMode} />
        }

        return (
            <div>
                <h2 className="subtitle">{this.state.title}</h2>
                {content}
            </div>
        )
    }
}

export default TemplateContainer;