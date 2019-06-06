import React, { Component } from "react";


class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn1: "",
            password1: "",
            amount1: 0,
            isbn2: "",
            password2: "",
            amount2: 0
        };
    }

    handleISBN1(e) {
        this.setState({
            isbn1: e.target.value
        })
    }

    handlePass1(e) {
        this.setState({
            password1: e.target.value
        })
    }

    handleAmount1(e) {
        this.setState({
            amount1: e.target.value
        })
    }

    handleISBN2(e) {
        this.setState({
            isbn2: e.target.value
        })
    }

    handlePass2(e) {
        this.setState({
            password2: e.target.value
        })
    }

    handleAmount2(e) {
        this.setState({
            amount2: e.target.value
        })
    }

    sendDataAdd() {
        fetch("https://boarch-backend.herokuapp.com/books/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                mode: "cors",
                body: JSON.stringify({"isbn_code": this.state.isbn1, "password": this.state.password1, "number_of_books": parseInt(this.state.amount1)})
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) })
    }

    sendDataDelete() {
        fetch("https://boarch-backend.herokuapp.com/books/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                mode: "cors",
                body: JSON.stringify({"isbn_code": this.state.isbn2, "password": this.state.password2, "number_of_books": parseInt(this.state.amount2)})
            })
            .then(function(res){ console.log(res) })
            .catch(function(res){ console.log(res) })
    }

    render() {
        return(
            <div className="Book">
                <section className="Book__add">
                    <h1>Add Book</h1>
                    <label htmlFor="ISBN1">Enter book ISBN Code</label>
                    <input id="ISBN1" className="Book__input" onChange={(e) => this.handleISBN1(e)} type="text" placeholder="ISBN Code"/>
                    <label htmlFor="Password1">Enter Library password</label>
                    <input id="Password1" className="Book__input" onChange={(e) => this.handlePass1(e)} type="password" placeholder="Library Password"/>
                    <label htmlFor="Amount1">Enter amount of books</label>
                    <input id="Amount1" className="Book__input" onChange={(e) => this.handleAmount1(e)} type="number" step="1" min="1"/>
                    <button className="App__button" onClick={() => this.sendDataAdd()}>Submit</button>
                </section>
                <section className="Book__delete">
                    <h1>Delete Book</h1>
                    <label htmlFor="ISBN2">Enter book ISBN Code</label>
                    <input id="ISBN2" className="Book__input" onChange={(e) => this.handleISBN2(e)} type="text" placeholder="ISBN Code"/>
                    <label htmlFor="Password2">Enter Library password</label>
                    <input id="Password2" className="Book__input" onChange={(e) => this.handlePass2(e)} type="password" placeholder="Library Password"/>
                    <label htmlFor="Amount2">Enter amount of books</label>
                    <input id="Amount2" className="Book__input" onChange={(e) => this.handleAmount2(e)} type="number" step="1" min="1"/>
                    <button className="App__button" onClick={() => this.sendDataDelete()}>Submit</button>
                </section>
            </div>
        );
    }
}

export default Book;