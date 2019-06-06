let apiUrl
const apiUrls = {
  production: 'https://conservator.herokuapp.com',
  development: 'https://conservator.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
