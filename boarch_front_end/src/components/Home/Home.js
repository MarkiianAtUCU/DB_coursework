import React, { Component } from "react";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            results: [],
            bookName: ""
        };
    }

    handleInput(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    sendData() {
        fetch(`https://boarch-backend.herokuapp.com/books/${this.state.inputValue}`, {mode: "cors"})
            .then(function (response) {
                if (response.status !== 422) {
                    return response.json();
                } else {
                    return "Some error";
                }
            })
            .then((myJson) => {
                let res = myJson;

                if (typeof res !== "string") {
                    this.setState({
                        bookName: res.title,
                        results: res.libraries
                    });
                } else {
                    this.setState({
                        bookName: "",
                        results: []
                    })
                }
            });
    }

    render() {
        return(
            <div className="Home">
                <div className="Home__search">
                    <h1>Search a Book</h1>
                    <input className="Home__input" type="text" onChange={(e) => this.handleInput(e)} placeholder="Insert book ISBN"/>
                    <button className="Home__button" onClick={() => this.sendData()}>Search</button>
                    <p>{this.state.bookName}</p>
                </div>
                <ul className="App__results">
                    {this.state.results.length === 0 ? <p>Nothing Found</p> : this.state.results.map((item, i) => resultItem(item, i))}
                </ul>
            </div>
        );
    }
}

const resultItem = (item, i) => {
    return (
        <li key={i}>
            <h1 aria-label="library name">{item.name}</h1>
            <p aria-label="library address">Address: {item.address}</p>
            <p aria-label="library phone number">Phone Number: {item.phone_number}</p>
            <p aria-label="Book amount">Amount of this book: {item.number_of_books}</p>
        </li>
    )
};

export default Home;