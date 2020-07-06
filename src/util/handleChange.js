function handleChange(event) {
    const {name, value, type, checked} = event.target;
    type === "checkbox" ?
        this.setState({
            [name]: checked
        })
    :
    this.setState({
        [name]: value
    });
}

export default handleChange;