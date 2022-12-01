const postForm = document.querySelector('#createPost')
postForm.addEventListener('submit', e => {
  e.preventDefault()

  const postObj = {
    title: document.querySelector('#postTitle').value,
    content: document.querySelector('#postContent').value
  }

  fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify(postObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        location.replace('/dashboard')
      } else {
        alert('Post could not be created')
      }
    })
})