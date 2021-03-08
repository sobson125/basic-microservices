import React, {useState} from 'react';
import axios from 'axios';

export default () => {
    const [title, setTitle] = useState('');

    async function onSubmit(event) {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="">Title</label>
                <input value={title} onChange={event => setTitle(event.target.value)} type="text"
                       className="form-control"/>
            </div>
            <button className="btn-primary">Submit</button>
        </form>
    </div>;
}