const commentBtn = document.querySelector('#commentBtn')
commentBtn.addEventListener('click', e => {
  const commentObj = {
    content: document.querySelector('#commentContent').value,
    post_id: e.target.getAttribute('data-postId')
  }

  fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify(commentObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        location.reload()
      } else {
        alert('womp womp')
      }
    })
})