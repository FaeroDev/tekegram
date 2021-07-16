let post_id;
// let posertboy = this.id
// console.dir(this)
const commentFormHndl = async function(event) {
    event.preventDefault();

    const text = document.querySelector('textarea[name="comment-body"]').value
    // const post_id =document.querySelector('input[name="post_id"]').value
    post_id = this[0].dataset.postid
    // console.dir(post_id)
console.dir(this)
    if (text) {
        await fetch('/api/comment', {
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