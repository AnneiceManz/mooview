import React, {useState} from 'react';

const CommentForm = ({review_id, user}) => {

    const userId = user
    

    const [writeComment, setWriteComment] = useState(
        state || {
            user_id: userId,
            review_id: review_id,
            comment_text: "",
        }
      )
    
      const handleChange = (e) => {
        setWriteComment ({ ...writeComment, [e.target.name]: e.target.value})
      }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(writeComment),
          });
          window.location.reload();
        } catch (error) {
          console.log(error.message);
        }
      };  

    return (
        <div>
            
        </div>
    );
};

export default CommentForm;