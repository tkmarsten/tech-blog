const posts = document.querySelectorAll('.post')
posts.forEach(post => {
  post.addEventListener('click', e => {
    console.log(e.target.getAttribute('data-postId'))
  })
})