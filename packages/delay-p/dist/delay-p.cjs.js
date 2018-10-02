'use strict'

var symbols = require('@redux-saga/symbols')

function delayP(ms) {
  var timeoutId
  var promise = new Promise(function(resolve) {
    timeoutId = setTimeout(resolve, ms, true)
  })

  promise[symbols.CANCEL] = function() {
    clearTimeout(timeoutId)
  }

  return promise
}

module.exports = delayP
