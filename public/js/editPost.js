const editBtn = document.querySelector('#editBtn')
editBtn.addEventListener('click', e => {
  const postId = e.target.getAttribute('data-postId')

  const postObj = {
    title: document.querySelector('#postTitle').value,
    content: document.querySelector('#postContent').value
  }

  fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        location.replace('/dashboard')
      } else {
        alert('womp womp')
      }
    })
})

const deleteBtn = document.querySelector('#deleteBtn')
deleteBtn.addEventListener('click', e => {
  const postId = e.target.getAttribute('data-postId')

  fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        location.replace('/dashboard')
      } else {
        alert('womp womp')
      }
    })
})