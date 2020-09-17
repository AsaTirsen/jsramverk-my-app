import React, {Component} from "react";


export class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: '',
                password: '',
            },
        };
        this.handleTextareaChange = this.handleTextareaChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTextareaChange(event) {
        this.setState({
            data: Object.assign({}, this.state.data, {
                [event.target.name]: event.target.value,
            }),
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = this.state.data;
        console.log(data)
        fetch('http://localhost:1337/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(res => {
            console.log(res);
            if (!res.data) {
                alert("Vänligen skapa användare")
                this.props.history.goBack();
            } else {
                if(res.data.token) {
                    localStorage.setItem('token', res.data.token);
                }
            }
        });
    }

    render() {
        return (
            <form id="contact-form" onSubmit={this.handleSubmit} method="POST">
                <h3>Logga in</h3>
                <label className="input-label">Emailadress</label>
                <input type="email" className="input" name="email" value={this.state.data.email} onChange={this.handleTextareaChange.bind(this)}/>
                <br/>
                <label className="input-label">Lösenord</label>
                <input type="password" className="input" autoComplete="current-password" name="password" value={this.state.data.password} onChange={this.handleTextareaChange}/>
                <button type="submit" className="button">Submit</button>
            </form>
        );
    }
}

export default Authenticate;
