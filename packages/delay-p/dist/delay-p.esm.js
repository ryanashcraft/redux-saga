import { CANCEL } from '@redux-saga/symbols'

function delayP(ms) {
  var timeoutId
  var promise = new Promise(function(resolve) {
    timeoutId = setTimeout(resolve, ms, true)
  })

  promise[CANCEL] = function() {
    clearTimeout(timeoutId)
  }

  return promise
}

export default delayP
