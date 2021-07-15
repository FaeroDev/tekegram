const commentFormHndl = async (event) => {
    event.preventDefault();

    const text = document.querySelector('textarea[name="comment-body"]').value
    const post_id =document.querySelector('input[name="post-id"').value

    if (text) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                text
            }),
            headers: { "Content-Type": "application/json" },

        })
        document.location.reload()

    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHndl)