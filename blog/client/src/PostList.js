import React, {useState, useEffect} from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import axios from 'axios';

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const response = await axios.get('http://posts.com/posts');
        // console.log(response.data);
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (<div key={post.id} className="card" style={{width: '30%', marginBottom: '20px'}}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentCreate postId={post.id}/>
                    <CommentList comments={post.comments}/>
                </div>
            < /div>
        );
    });
    return <div className='d-flex flex-row flex-wrap justify-content-between'>{renderedPosts}</div>;
}