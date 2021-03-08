import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(response.data);
    };

    useEffect(() => {
        fetchData();
        console.log(comments);
    }, []);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>;
    });


    return (
        <ul>{renderedComments}</ul>
    );
}