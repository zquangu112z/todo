import React, { Component } from 'react';
import Remarkable from 'remarkable';

class ItemList extends Component {
    getRawMarkup(raw) {
        const md = new Remarkable();
        return { __html:md.render(raw)};
    }
    render() {
        return (
            <ul>
                {this.props.items.map(item => {
                    // console.log("cur id" ,item.id)
                    return <li key={item.id}>
                                <div>
                                    <div dangerouslySetInnerHTML={this.getRawMarkup(item.text)}></div>
                                    <button onClick={this.props.handleRemove} id={item.id}>X</button>
                                </div>
                            </li>
                })}
            </ul>
        );
    }
}

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curText: '',
            items: [],
            count: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }
    render() {
        return (
            <div>
                <h1>TODO</h1>
                <ItemList items={this.state.items} handleRemove={this.handleRemove}></ItemList>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">What needs to be done?</label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.curText}></input>
                    <button>Add</button>
                </form>
            </div>
        )
    }
    handleSubmit(e) {
        e.preventDefault();
        // console.log(this.state.curText)
        if (this.state.curText.length > 0) {
            this.setState({
                items: this.state.items.concat({
                    text: this.state.curText,
                    id: this.state.count
                }),
                curText: "",
                count: this.state.count + 1,
            })

        }
    }
    handleChange(e) {
        this.setState(
            {
                curText: e.target.value
            }
        )
    }
    handleRemove(e) {
        let rmId = e.target.id
        console.log(rmId)
        console.log(this.state.items)
        this.setState({
            items: this.state.items.filter(item => item.id !== parseInt(rmId)),
            curText: "",
            count: this.state.count,
        });
        console.log(this.state.items)
    }
}
export default Todo