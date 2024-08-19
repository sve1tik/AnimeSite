export default new Promise((res) => {
  const script = document.createElement('script')
  script.onload = () => res()
  script.setAttribute('src', '/AnimeSite/playerjs.js')
  document.head.appendChild(script)
})
