const newFormHandler = async function(event) {
    event.preventDefault();

    console.log('newFormHandler fired')

    const title = document.getElementById("post-title").value;
    const body = document.getElementById("new-post-body").value

    await fetch(`/api/post/new`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            body
        }),
        headers: { "Content-Type": "application/json" },
    })
    document.location.replace('/dashboard')
}

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler);