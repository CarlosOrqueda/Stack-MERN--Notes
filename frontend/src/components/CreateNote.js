import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

    state = {
        users: [],
        _id: '',
        userSelected: '',
        title: '',
        content: '',
        date: new Date(),
        editing: false
    };

    async componentDidMount() {
        const users = await axios.get('http://localhost:3000/api/users');
        this.setState({
            users: users.data.map(user => user.username),
            userSelected: users.data[0].username
        });
        if (this.props.match.params.id) {
            const note = await axios.get(`http://localhost:3000/api/notes/${this.props.match.params.id}`); 
            this.setState({
                title: note.data.title,
                content: note.data.content,
                date: new Date(note.data.date),
                author: note.data.author,
                editing: true, 
                _id: this.props.match.params.id
            })
        }
    };

    onSubmit = async e => {
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        }
        if (this.state.editing) {
            await axios.put(`http://localhost:3000/api/notes/${this.state._id}`, newNote);
        } else {
            await axios.post('http://localhost:3000/api/notes', newNote);
        }
        
        
        this.props.history.push('/');
    };

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onChangeDate = date => {
        this.setState({date});
    };

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create Note</h4>

                    {/** SELECT USER */}
                    <div className="form-group">
                        <select className="form-control" value={this.state.userSelected} name="userSelected" onChange={this.onInputChange}>
                            {
                                this.state.users.map(user => 
                                    <option key = {user} value={user}>
                                        {user}
                                    </option>    
                                )
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" value = {this.state.title} onChange={this.onInputChange} name="title" placeholder="Title" required/>
                    </div>

                    <div className="form-group">
                        <textarea name="content" className="form-control" value = {this.state.content} onChange={this.onInputChange} placeholder="Content" required></textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>

                    <form onSubmit={this.onSubmit}>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
