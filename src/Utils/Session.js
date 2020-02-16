const Session = (function() {
  function _setToken(token){
    localStorage.setItem('token', token)
  }

  function _getToken(){
    return localStorage.getItem('token')
  }

  return {
    getToken: _getToken,
    setToken: _setToken
  }

})();

export default Session;