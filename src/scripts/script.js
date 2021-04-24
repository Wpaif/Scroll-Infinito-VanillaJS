const postContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')


let page = 1


const getPost = async () => {
  
  const reponse = await 
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
  return reponse.json()
}

const generatePostsTemplate = post => post.map(({ id, title, body }) => `
    <div class="post">
      <div class="number">${id}</div>
      <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
      </div>
    </div>
  `).join('')

const addPostIntoDOM = async () => {
  const posts = await getPost()

  const postsTemplate = generatePostsTemplate(posts)

  postContainer.innerHTML += postsTemplate
}

const getNextPost = () => {
  setTimeout(() => {
    page++
    addPostIntoDOM()
  }, 300);
}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show')
    getNextPost()
  }, 1000)
}

const showLoader = () => {
  loaderContainer.classList.add('show')
  removeLoader()
}

const handleScroll = () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement
  const isPageBottonAlmostReached = scrollTop + clientHeight 
    >= scrollHeight - 10

  if (isPageBottonAlmostReached)
    showLoader()
}

const showPostIfMatchInputValue = inputValue => post => {
  const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
  const postBody = post.querySelector('.post-body').textContent.toLowerCase()

  const inputIsinclude = postTitle.includes(inputValue)
    || postBody.includes(inputValue)

  if (inputIsinclude) {
    post.style.display = 'flex'
    return
  }

  post.style.display = 'none'
}

const handleInputValue = event => {
  const inputValue = event.target.value.toLowerCase()
  const post = document.querySelectorAll('.post')

  post.forEach(showPostIfMatchInputValue(inputValue));
}

filterInput.addEventListener('input', handleInputValue)
window.addEventListener('scroll', handleScroll)
window.addEventListener('DOMContentLoaded', addPostIntoDOM())