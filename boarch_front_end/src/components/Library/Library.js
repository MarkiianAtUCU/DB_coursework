import React, { Component } from "react";


class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phoneNumber: "",
            password: ""
        }
    }

    sendDataAdd() {
        fetch("https://boarch-backend.herokuapp.com/library/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                mode: "cors",
                body: JSON.stringify({"name": this.state.name, "password": this.state.password, "address": this.state.address, "phone_number": this.state.phoneNumber})
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) })
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleAddress(e) {
        this.setState({
            address: e.target.value
        })
    }

    handlePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    handlePass(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return(
            <div className="Library">
                <section className="Library__add">
                    <h1>Add Library</h1>
                    <label htmlFor="Name">Enter library name</label>
                    <input id="Name" className="Library__input" onChange={(e) => this.handleName(e)} type="text" placeholder="Library name"/>
                    <label htmlFor="Address">Enter library address</label>
                    <input id="Address" className="Library__input" onChange={(e) => this.handleAddress(e)} type="text" placeholder="Library address"/>
                    <label htmlFor="PhoneNumber">Enter library phone number</label>
                    <input id="PhoneNumber" className="Library__input" onChange={(e) => this.handlePhoneNumber(e)} type="text" placeholder="Library phone number"/>
                    <label htmlFor="Password">Enter library password</label>
                    <input id="Password" className="Library__input" onChange={(e) => this.handlePass(e)} type="password"/>
                    <button className="App__button" onClick={() => this.sendDataAdd()}>Submit</button>
                </section>
            </div>
        );
    }
}

export default Library;