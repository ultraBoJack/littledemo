<template>
  <div>
    <button id="ajaxBtn" @click="makeRequest">ajax</button>
  </div>
</template>

<script>
export default {
  methods: {
    makeRequest() {
      let httpRequest
      if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
        httpRequest = new XMLHttpRequest()
      } else if (window.ActiveXObject) { // IE 6 and older
        httpRequest = new ActiveXObject('Microsoft.XMLHTTP')
      }
      if (!httpRequest) {
        alert('given up: can\'t create an XMLHttp instance')
      }
      httpRequest.onreadystatechange= function() {
        if (httpRequest.requestState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            alert(httpRequest.responseText)
          } else {
            alert('there was a problem with the request...')
          }
        }
      }
      httpRequest.open('GET', 'http://arunranga.com/examples/access-control/')
      httpRequest.setRequestHeader('eContent-Typ', 'application/x-www-form-urlencoded')
      httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      httpRequest.send()
    }
  }
}
</script>
