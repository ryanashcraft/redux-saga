!(function(n, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], t)
      : t((n.ReduxSaga = {}))
})(this, function(n) {
  'use strict'
  var t = function(n) {
      return '@@redux-saga/' + n
    },
    g = t('CANCEL_PROMISE'),
    e = t('CHANNEL_END'),
    M = t('IO'),
    f = t('MATCH'),
    r = t('MULTICAST'),
    o = t('SAGA_ACTION'),
    I = t('SELF_CANCELLATION'),
    h = t('TASK'),
    y = t('TASK_CANCEL'),
    P = t('TERMINATE'),
    a = t('LOCATION')
  var U = function(n) {
      return null == n
    },
    D = function(n) {
      return null != n
    },
    S = function(n) {
      return 'function' == typeof n
    },
    u = function(n) {
      return 'string' == typeof n
    },
    K = Array.isArray,
    z = function(n) {
      return n && S(n.then)
    },
    F = function(n) {
      return n && S(n.next) && S(n.throw)
    },
    c = function n(t) {
      return t && (u(t) || s(t) || S(t) || (K(t) && t.every(n)))
    },
    i = function(n) {
      return n && S(n.take) && S(n.close)
    },
    l = function(n) {
      return S(n) && n.hasOwnProperty('toString')
    },
    s = function(n) {
      return !!n && 'function' == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype
    },
    d = function(n) {
      return i(n) && n[r]
    }
  function G() {
    return (G =
      Object.assign ||
      function(n) {
        for (var t = 1; t < arguments.length; t++) {
          var e = arguments[t]
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r])
        }
        return n
      }).apply(this, arguments)
  }
  var v = (function(n) {
      return function() {
        return n
      }
    })(!0),
    H = function() {},
    p = function(n) {
      return n
    },
    E = Object.prototype.hasOwnProperty
  var X = function(t, e) {
    G(t, e),
      Object.getOwnPropertySymbols &&
        Object.getOwnPropertySymbols(e).forEach(function(n) {
          t[n] = e[n]
        })
  }
  function b(n, t) {
    var e = n.indexOf(t)
    e < 0 || n.splice(e, 1)
  }
  var J = {
    from: function(n) {
      var t,
        e,
        r = Array(n.length)
      for (var o in n) (e = o), D((t = n)) && E.call(t, e) && (r[o] = n[o])
      return r
    },
  }
  function m(n) {
    var t = !1
    return function() {
      t || ((t = !0), n())
    }
  }
  function A(n) {
    return (
      void 0 === n && (n = 0),
      function() {
        return ++n
      }
    )
  }
  var C = A(),
    _ = function(n) {
      throw n
    },
    x = function(n) {
      return { value: n, done: !0 }
    }
  function B(n, t, e) {
    void 0 === t && (t = _), void 0 === e && (e = 'iterator')
    var r = { meta: { name: e }, next: n, throw: t, return: x, isSagaIterator: !0 }
    return (
      'undefined' != typeof Symbol &&
        (r[Symbol.iterator] = function() {
          return r
        }),
      r
    )
  }
  function T(n, t, e) {
    void 0 === e && (e = ''),
      'undefined' == typeof window
        ? console.log('redux-saga ' + n + ': ' + t + '\n' + ((e && e.stack) || e))
        : console[n](t, e)
  }
  var k = function(t) {
      return function(n) {
        return t(Object.defineProperty(n, o, { value: !0 }))
      }
    },
    Q = function(n) {
      return n === P
    },
    V = function(n) {
      return n === y
    },
    W = function(n) {
      return Q(n) || V(n)
    }
  function Y(r, o) {
    var a,
      n = Object.keys(r),
      u = n.length,
      c = 0,
      i = {},
      t = {}
    return (
      n.forEach(function(e) {
        var n = function(n, t) {
          a ||
            (t || W(n)
              ? (o.cancel(), o(n, t))
              : ((i[e] = n), ++c === u && ((a = !0), K(r) ? o(J.from(G({}, i, { length: u }))) : o(i))))
        }
        ;(n.cancel = H), (t[e] = n)
      }),
      (o.cancel = function() {
        a ||
          ((a = !0),
          n.forEach(function(n) {
            return t[n].cancel()
          }))
      }),
      t
    )
  }
  var O = { isEmpty: v, put: H, take: H }
  function q(e, r) {
    void 0 === e && (e = 10)
    var o = Array(e),
      a = 0,
      u = 0,
      c = 0,
      i = function(n) {
        ;(o[u] = n), (u = (u + 1) % e), a++
      },
      t = function() {
        if (0 != a) {
          var n = o[c]
          return (o[c] = null), a--, (c = (c + 1) % e), n
        }
      },
      f = function() {
        for (var n = []; a; ) n.push(t())
        return n
      }
    return {
      isEmpty: function() {
        return 0 == a
      },
      put: function(n) {
        var t
        if (a < e) i(n)
        else
          switch (r) {
            case 1:
              throw Error("Channel's Buffer overflow!")
            case 3:
              ;(o[u] = n), (c = u = (u + 1) % e)
              break
            case 4:
              ;(t = 2 * e), (o = f()), (u = a = o.length), (c = 0), (e = o.length = t), i(n)
          }
      },
      take: t,
      flush: f,
    }
  }
  var N = function() {
      return O
    },
    j = function(n) {
      return q(n, 3)
    },
    w = function(n) {
      return q(n, 4)
    },
    L = Object.freeze({
      none: N,
      fixed: function(n) {
        return q(n, 1)
      },
      dropping: function(n) {
        return q(n, 2)
      },
      sliding: j,
      expanding: w,
    }),
    R = [],
    Z = 0
  function $(n) {
    try {
      tn(), n()
    } finally {
      en()
    }
  }
  function nn(n) {
    R.push(n), Z || (tn(), rn())
  }
  function tn() {
    Z++
  }
  function en() {
    Z--
  }
  function rn() {
    var n
    for (en(); !Z && void 0 !== (n = R.shift()); ) $(n)
  }
  var on = function(n) {
      return function(t) {
        return n.some(function(n) {
          return ln(n)(t)
        })
      }
    },
    an = function(t) {
      return function(n) {
        return t(n)
      }
    },
    un = function(t) {
      return function(n) {
        return n.type === t + ''
      }
    },
    cn = function(t) {
      return function(n) {
        return n.type === t
      }
    },
    fn = function() {
      return v
    }
  function ln(n) {
    var t = '*' === n ? fn : u(n) ? un : K(n) ? on : l(n) ? un : S(n) ? an : s(n) ? cn : null
    if (null === t) throw Error('invalid pattern: ' + n)
    return t(n)
  }
  var sn,
    dn = { type: e },
    vn = function(n) {
      return n && n.type === e
    }
  function pn(t) {
    void 0 === t && (t = w())
    var r = !1,
      o = []
    return {
      take: function(n) {
        r && t.isEmpty()
          ? n(dn)
          : t.isEmpty()
            ? (o.push(n),
              (n.cancel = function() {
                b(o, n)
              }))
            : n(t.take())
      },
      put: function(n) {
        if (!r) {
          if (0 === o.length) return t.put(n)
          o.shift()(n)
        }
      },
      flush: function(n) {
        r && t.isEmpty() ? n(dn) : n(t.flush())
      },
      close: function() {
        if (!r) {
          r = !0
          var n = o
          o = []
          for (var t = 0, e = n.length; t < e; t++) (0, n[t])(dn)
        }
      },
    }
  }
  function gn() {
    var n,
      a = !1,
      u = [],
      c = u,
      e = function() {
        c === u && (c = u.slice())
      },
      i = function() {
        a = !0
        var n = (u = c)
        ;(c = []),
          n.forEach(function(n) {
            n(dn)
          })
      }
    return (
      ((n = {})[r] = !0),
      (n.put = function(n) {
        if (!a)
          if (vn(n)) i()
          else
            for (var t = (u = c), e = 0, r = t.length; e < r; e++) {
              var o = t[e]
              o[f](n) && (o.cancel(), o(n))
            }
      }),
      (n.take = function(n, t) {
        void 0 === t && (t = fn),
          a
            ? n(dn)
            : ((n[f] = t),
              e(),
              c.push(n),
              (n.cancel = m(function() {
                e(), b(c, n)
              })))
      }),
      (n.close = i),
      n
    )
  }
  function hn() {
    var n = gn(),
      t = n.put
    return (
      (n.put = function(n) {
        n[o]
          ? t(n)
          : nn(function() {
              t(n)
            })
      }),
      n
    )
  }
  sn =
    'undefined' != typeof self
      ? self
      : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof module
            ? module
            : Function('return this')()
  var yn, En
  'function' == typeof (En = sn.Symbol)
    ? En.observable
      ? (yn = En.observable)
      : ((yn = En('observable')), (En.observable = yn))
    : (yn = '@@observable'),
    Math.random()
      .toString(36)
      .substring(7)
      .split('')
      .join('.'),
    Math.random()
      .toString(36)
      .substring(7)
      .split('')
      .join('.')
  var bn = 'TAKE',
    Sn = 'PUT',
    mn = 'ALL',
    An = 'RACE',
    Cn = 'CALL',
    _n = 'CPS',
    xn = 'FORK',
    Tn = 'JOIN',
    kn = 'CANCEL',
    On = 'SELECT',
    qn = 'ACTION_CHANNEL',
    Nn = 'CANCELLED',
    jn = 'FLUSH',
    wn = 'GET_CONTEXT',
    Ln = 'SET_CONTEXT',
    Rn = Object.freeze({
      TAKE: bn,
      PUT: Sn,
      ALL: mn,
      RACE: An,
      CALL: Cn,
      CPS: _n,
      FORK: xn,
      JOIN: Tn,
      CANCEL: kn,
      SELECT: On,
      ACTION_CHANNEL: qn,
      CANCELLED: Nn,
      FLUSH: jn,
      GET_CONTEXT: wn,
      SET_CONTEXT: Ln,
    })
  function Mn(n, t) {
    return n + '?' + t
  }
  function In(n) {
    return n[a]
  }
  function Pn(n) {
    var t = n.name,
      e = n.location
    return e ? t + '  ' + Mn(e.fileName, e.lineNumber) : t
  }
  var Un = function(n, t) {
    var e
    return (e = []).concat.apply(e, t.map(n))
  }
  function Dn(n) {
    var t,
      e,
      r,
      o = n[0],
      a = n.slice(1),
      u = o.effect ? ((t = In(o.effect)) ? t.code + '  ' + Mn(t.fileName, t.lineNumber) : '') : null
    return ['The above error occurred in task ' + Pn(o.meta) + (u ? ' \n when executing effect ' + u : '')]
      .concat(
        a.map(function(n) {
          return '    created by ' + Pn(n.meta)
        }),
        [
          ((e = n),
          (r = Un(function(n) {
            return n.cancelledTasks
          }, e)),
          r.length ? ['Tasks cancelled due to error:'].concat(r).join('\n') : ''),
        ],
      )
      .join('\n')
  }
  function Kn(n) {
    return { name: n.name || 'anonymous', location: In(n) }
  }
  function zn(_, r, n, o, x, t) {
    var T = Object.create(n),
      c = _.finalizeRunEffect(function(n, t, e) {
        if (z(n)) j(n, e)
        else if (F(n)) w(n, t, x, e)
        else if (n && n[M]) {
          var r = n.type,
            o = n.payload
          r === bn
            ? (function(n, t) {
                var e = n.channel,
                  r = void 0 === e ? _.stdChannel : e,
                  o = n.pattern,
                  a = n.maybe,
                  u = function(n) {
                    n instanceof Error ? t(n, !0) : !vn(n) || a ? t(n) : t(P)
                  }
                try {
                  r.take(u, D(o) ? ln(o) : null)
                } catch (n) {
                  return t(n, !0)
                }
                t.cancel = u.cancel
              })(o, e)
            : r === Sn
              ? ((S = e),
                (m = (b = o).channel),
                (A = b.action),
                (C = b.resolve),
                nn(function() {
                  var n
                  try {
                    n = (m ? m.put : _.dispatch)(A)
                  } catch (n) {
                    return void S(n, !0)
                  }
                  C && z(n) ? j(n, S) : S(n)
                }))
              : r === mn
                ? (function(t, e, n) {
                    var r = Object.keys(t)
                    if (0 === r.length) return n(K(t) ? [] : {})
                    var o = Y(t, n)
                    r.forEach(function(n) {
                      return N(t[n], e, n, o[n])
                    })
                  })(o, t, e)
                : r === An
                  ? ((p = t),
                    (g = e),
                    (E = {}),
                    (y = Object.keys((v = o))).forEach(function(o) {
                      var n = function(n, t) {
                        if (!h)
                          if (t || W(n)) g.cancel(), g(n, t)
                          else {
                            var e
                            g.cancel(), (h = !0)
                            var r = (((e = {})[o] = n), e)
                            g(K(v) ? J.from(G({}, r, { length: y.length })) : r)
                          }
                      }
                      ;(n.cancel = H), (E[o] = n)
                    }),
                    (g.cancel = function() {
                      h ||
                        ((h = !0),
                        y.forEach(function(n) {
                          return E[n].cancel()
                        }))
                    }),
                    y.forEach(function(n) {
                      h || N(v[n], p, n, E[n])
                    }))
                  : r === Cn
                    ? (function(n, t, e) {
                        var r = n.context,
                          o = n.fn,
                          a = n.args
                        try {
                          var u = o.apply(r, a)
                          if (z(u)) return j(u, e)
                          if (F(u)) return w(u, t, Kn(o), e)
                          e(u)
                        } catch (n) {
                          e(n, !0)
                        }
                      })(o, t, e)
                    : r === _n
                      ? (function(n, e) {
                          var t = n.context,
                            r = n.fn,
                            o = n.args
                          try {
                            var a = function(n, t) {
                              return U(n) ? e(t) : e(n, !0)
                            }
                            r.apply(t, o.concat(a)),
                              a.cancel &&
                                (e.cancel = function() {
                                  return a.cancel()
                                })
                          } catch (n) {
                            e(n, !0)
                          }
                        })(o, e)
                      : r === xn
                        ? (function(n, t, e) {
                            var r = n.fn,
                              o = n.detached,
                              a = (function(n) {
                                var t = n.context,
                                  e = n.fn,
                                  r = n.args
                                try {
                                  var o = e.apply(t, r)
                                  return F(o)
                                    ? o
                                    : B(function(n) {
                                        return void 0 === n && (n = o), { value: n, done: !z(n) }
                                      })
                                } catch (n) {
                                  return B(function() {
                                    throw n
                                  })
                                }
                              })({ context: n.context, fn: r, args: n.args }),
                              u = ((c = a), (i = r), c.isSagaIterator ? { name: c.meta.name } : Kn(i))
                            var c, i
                            try {
                              tn()
                              var f = zn(_, a, T, t, u, o ? null : H)
                              o ? e(f) : f._isRunning ? (q.addTask(f), e(f)) : f._error ? q.abort(f._error) : e(f)
                            } finally {
                              rn()
                            }
                          })(o, t, e)
                        : r === Tn
                          ? (function(n, t) {
                              if (K(n)) {
                                if (0 === n.length) return t([])
                                var e = Y(n, t)
                                n.forEach(function(n, t) {
                                  L(n, e[t])
                                })
                              } else L(n, t)
                            })(o, e)
                          : r === kn
                            ? (function(n, t) {
                                n === I ? R(k) : K(n) ? n.forEach(R) : R(n)
                                t()
                              })(o, e)
                            : r === On
                              ? (function(n, t) {
                                  var e = n.selector,
                                    r = n.args
                                  try {
                                    var o = e.apply(void 0, [_.getState()].concat(r))
                                    t(o)
                                  } catch (n) {
                                    t(n, !0)
                                  }
                                })(o, e)
                              : r === qn
                                ? ((c = e),
                                  (i = (u = o).pattern),
                                  (f = pn(u.buffer)),
                                  (l = ln(i)),
                                  (s = function n(t) {
                                    vn(t) || _.stdChannel.take(n, l), f.put(t)
                                  }),
                                  (d = f.close),
                                  (f.close = function() {
                                    s.cancel(), d()
                                  }),
                                  _.stdChannel.take(s, l),
                                  c(f))
                                : r === jn
                                  ? o.flush(e)
                                  : r === Nn
                                    ? e(!!O._isCancelled)
                                    : r === wn
                                      ? e(T[o])
                                      : r === Ln
                                        ? ((a = e), X(T, o), a())
                                        : e(n)
        } else e(n)
        var a
        var u, c, i, f, l, s, d
        var v, p, g, h, y, E
        var b, S, m, A, C
      }),
      i = null,
      a = []
    v.cancel = H
    var e,
      u,
      f,
      l,
      s,
      k = ((e = o),
      (u = x),
      (f = t),
      ((l = {})[h] = !0),
      (l.id = e),
      (l.meta = u),
      (l._deferredEnd = null),
      (l.toPromise = function() {
        if (s._deferredEnd) return s._deferredEnd.promise
        var e,
          n = (((e = {}).promise = new Promise(function(n, t) {
            ;(e.resolve = n), (e.reject = t)
          })),
          e)
        return (
          (s._deferredEnd = n), s._isRunning || (s._isAborted ? n.reject(s._error) : n.resolve(s._result)), n.promise
        )
      }),
      (l.cont = f),
      (l.joiners = []),
      (l.cancel = d),
      (l._isRunning = !0),
      (l._isCancelled = !1),
      (l._isAborted = !1),
      (l._result = void 0),
      (l._error = void 0),
      (l.isRunning = function() {
        return s._isRunning
      }),
      (l.isCancelled = function() {
        return s._isCancelled
      }),
      (l.isAborted = function() {
        return s._isAborted
      }),
      (l.result = function() {
        return s._result
      }),
      (l.error = function() {
        return s._error
      }),
      (l.setContext = function(n) {
        X(T, n)
      }),
      (s = l)),
      O = {
        meta: x,
        cancel: function() {
          O._isRunning && !O._isCancelled && ((O._isCancelled = !0), v(y))
        },
        _isRunning: !0,
        _isCancelled: !1,
      },
      q = (function(r, t, o) {
        var a,
          u = [],
          c = !1
        function i(n) {
          t(), e(), o(n, !0)
        }
        function n(e) {
          u.push(e),
            (e.cont = function(n, t) {
              c || (b(u, e), (e.cont = H), t ? i(n) : (e === r && (a = n), u.length || ((c = !0), o(a))))
            })
        }
        function e() {
          c ||
            ((c = !0),
            u.forEach(function(n) {
              ;(n.cont = H), n.cancel()
            }),
            (u = []))
        }
        return (
          n(r),
          {
            addTask: n,
            cancelAll: e,
            abort: i,
            getTasks: function() {
              return u
            },
            getTaskNames: function() {
              return u.map(function(n) {
                return n.meta.name
              })
            },
          }
        )
      })(
        O,
        function() {
          a.push.apply(a, q.getTaskNames())
        },
        p,
      )
    function d() {
      k._isRunning && !k._isCancelled && ((k._isCancelled = !0), q.cancelAll(), p(y))
    }
    return t && (t.cancel = d), v(), k
    function v(n, t) {
      if (!O._isRunning) throw Error('Trying to resume an already finished generator')
      try {
        var e
        ;(e = t
          ? r.throw(n)
          : V(n)
            ? ((O._isCancelled = !0), v.cancel(), S(r.return) ? r.return(y) : { done: !0, value: y })
            : Q(n)
              ? S(r.return)
                ? r.return()
                : { done: !0 }
              : r.next(n)).done
          ? ((O._isRunning = !1), O.cont(e.value))
          : N(e.value, o, '', v)
      } catch (n) {
        O._isCancelled && _.logError(n), (O._isRunning = !1), O.cont(n, !0)
      }
    }
    function p(t, e) {
      var n, r
      ;(k._isRunning = !1),
        e
          ? ((r = { meta: x, effect: i, cancelledTasks: a }),
            'object' == typeof (n = t) &&
              (void 0 === n.sagaStack &&
                Object.defineProperty(n, 'sagaStack', { value: [], writable: !0, enumerable: !1 }),
              n.sagaStack.push(r)),
            k.cont || (t && t.sagaStack && (t.sagaStack = Dn(t.sagaStack)), _.onError ? _.onError(t) : _.logError(t)),
            (k._error = t),
            (k._isAborted = !0),
            k._deferredEnd && k._deferredEnd.reject(t))
          : ((k._result = t), k._deferredEnd && k._deferredEnd.resolve(t)),
        k.cont && k.cont(t, e),
        k.joiners.forEach(function(n) {
          return n.cb(t, e)
        }),
        (k.joiners = null)
    }
    function N(e, n, t, r) {
      void 0 === t && (t = '')
      var o,
        a = C()
      function u(n, t) {
        o ||
          ((o = !0),
          (r.cancel = H),
          _.sagaMonitor && (t ? _.sagaMonitor.effectRejected(a, n) : _.sagaMonitor.effectResolved(a, n)),
          t && (i = e),
          r(n, t))
      }
      _.sagaMonitor && _.sagaMonitor.effectTriggered({ effectId: a, parentEffectId: n, label: t, effect: e }),
        (u.cancel = H),
        (r.cancel = function() {
          if (!o) {
            o = !0
            try {
              u.cancel()
            } catch (n) {
              _.logError(n)
            }
            ;(u.cancel = H), _.sagaMonitor && _.sagaMonitor.effectCancelled(a)
          }
        }),
        c(e, a, u)
    }
    function j(n, t) {
      var e = n[g]
      S(e)
        ? (t.cancel = e)
        : S(n.abort) &&
          (t.cancel = function() {
            return n.abort()
          }),
        n.then(t, function(n) {
          return t(n, !0)
        })
    }
    function w(n, t, e, r) {
      zn(_, n, T, t, e, r)
    }
    function L(n, t) {
      if (n.isRunning()) {
        var e = { task: k, cb: t }
        ;(t.cancel = function() {
          return b(n.joiners, e)
        }),
          n.joiners.push(e)
      } else n.isAborted() ? t(n.error(), !0) : t(n.result())
    }
    function R(n) {
      n.isRunning() && n.cancel()
    }
  }
  function Fn(n, t) {
    for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
    var a = t.apply(void 0, r),
      u = n.channel,
      c = void 0 === u ? hn() : u,
      i = n.dispatch,
      f = n.getState,
      l = n.context,
      s = void 0 === l ? {} : l,
      d = n.sagaMonitor,
      v = n.logger,
      p = n.effectMiddlewares,
      g = n.onError,
      h = C()
    d &&
      ((d.rootSagaStarted = d.rootSagaStarted || H),
      (d.effectTriggered = d.effectTriggered || H),
      (d.effectResolved = d.effectResolved || H),
      (d.effectRejected = d.effectRejected || H),
      (d.effectCancelled = d.effectCancelled || H),
      (d.actionDispatched = d.actionDispatched || H),
      d.rootSagaStarted({ effectId: h, saga: t, args: r }))
    var y = v || T,
      E =
        p &&
        function() {
          for (var n = arguments.length, t = Array(n), e = 0; e < n; e++) t[e] = arguments[e]
          return 0 === t.length
            ? function(n) {
                return n
              }
            : 1 === t.length
              ? t[0]
              : t.reduce(function(n, t) {
                  return function() {
                    return n(t.apply(void 0, arguments))
                  }
                })
        }.apply(void 0, p),
      b = zn(
        {
          stdChannel: c,
          dispatch: k(i),
          getState: f,
          sagaMonitor: d,
          logError: function(n) {
            y('error', n), n && n.sagaStack && y('error', n.sagaStack)
          },
          onError: g,
          finalizeRunEffect: function(r) {
            return S(E)
              ? function(n, t, e) {
                  return E(function(n) {
                    return r(n, t, e)
                  })(n)
                }
              : r
          },
        },
        a,
        s,
        h,
        Kn(t),
        null,
      )
    return d && d.effectResolved(h, b), b
  }
  function Gn(t) {
    var e,
      n = new Promise(function(n) {
        e = setTimeout(n, t, !0)
      })
    return (
      (n[g] = function() {
        clearTimeout(e)
      }),
      n
    )
  }
  var Hn = function(n, t) {
      var e
      return ((e = {})[M] = !0), (e.type = n), (e.payload = t), e
    },
    Xn = function(n) {
      return Hn(xn, G({}, n.payload, { detached: !0 }))
    }
  function Jn(n, t) {
    if ((void 0 === n && (n = '*'), c(n))) return Hn(bn, { pattern: n })
    if (d(n) && D(t) && c(t)) return Hn(bn, { channel: n, pattern: t })
    if (i(n)) return Hn(bn, { channel: n })
    throw Error('take(patternOrChannel): argument ' + n + ' is not valid channel or a valid pattern')
  }
  function Bn(n, t) {
    return U(t) && ((t = n), (n = null)), Hn(Sn, { channel: n, action: t })
  }
  function Qn(n) {
    return Hn(An, n)
  }
  function Vn(n, t) {
    var e,
      r = null
    return (
      S(n) ? (e = n) : ((e = K(n) ? ((r = n[0]), n[1]) : ((r = n.context), n.fn)), r && u(e) && S(r[e]) && (e = r[e])),
      { context: r, fn: e, args: t }
    )
  }
  function Wn(n) {
    for (var t = arguments.length, e = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) e[r - 1] = arguments[r]
    return Hn(Cn, Vn(n, e))
  }
  function Yn(n) {
    for (var t = arguments.length, e = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) e[r - 1] = arguments[r]
    return Hn(xn, Vn(n, e))
  }
  function Zn(n) {
    return void 0 === n && (n = I), Hn(kn, n)
  }
  function $n(n, t) {
    return Hn(qn, { pattern: n, buffer: t })
  }
  var nt = Wn.bind(null, Gn),
    tt = function(n) {
      return { done: !0, value: n }
    },
    et = {}
  function rt(n) {
    return i(n) ? 'channel' : l(n) ? n + '' : S(n) ? n.name : n + ''
  }
  function ot(r, n, t) {
    var o,
      a,
      u,
      c = n
    function e(n, t) {
      if (c === et) return tt(n)
      if (t && !a) throw ((c = et), t)
      o && o(n)
      var e = t ? r[a](t) : r[c]()
      return (u = e.effect), (o = e.stateUpdater), (a = e.errorState), (c = e.nextState) === et ? tt(n) : u
    }
    return B(
      e,
      function(n) {
        return e(null, n)
      },
      t,
    )
  }
  function at(n, t) {
    for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
    var a,
      u = { done: !1, value: Jn(n) },
      c = function(n) {
        return (a = n)
      }
    return ot(
      {
        q1: function() {
          return { nextState: 'q2', effect: u, stateUpdater: c }
        },
        q2: function() {
          return { nextState: 'q1', effect: ((n = a), { done: !1, value: Yn.apply(void 0, [t].concat(r, [n])) }) }
          var n
        },
      },
      'q1',
      'takeEvery(' + rt(n) + ', ' + t.name + ')',
    )
  }
  function ut(n, t) {
    for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
    var a,
      u,
      c = { done: !1, value: Jn(n) },
      i = function(n) {
        return { done: !1, value: Yn.apply(void 0, [t].concat(r, [n])) }
      },
      f = function(n) {
        return (a = n)
      },
      l = function(n) {
        return (u = n)
      }
    return ot(
      {
        q1: function() {
          return { nextState: 'q2', effect: c, stateUpdater: l }
        },
        q2: function() {
          return a
            ? { nextState: 'q3', effect: ((n = a), { done: !1, value: Zn(n) }) }
            : { nextState: 'q1', effect: i(u), stateUpdater: f }
          var n
        },
        q3: function() {
          return { nextState: 'q1', effect: i(u), stateUpdater: f }
        },
      },
      'q1',
      'takeLatest(' + rt(n) + ', ' + t.name + ')',
    )
  }
  function ct(n, t) {
    for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
    var a,
      u = { done: !1, value: Jn(n) },
      c = function(n) {
        return (a = n)
      }
    return ot(
      {
        q1: function() {
          return { nextState: 'q2', effect: u, stateUpdater: c }
        },
        q2: function() {
          return { nextState: 'q1', effect: ((n = a), { done: !1, value: Wn.apply(void 0, [t].concat(r, [n])) }) }
          var n
        },
      },
      'q1',
      'takeLeading(' + rt(n) + ', ' + t.name + ')',
    )
  }
  function it(n, t, e) {
    for (var r = arguments.length, o = Array(3 < r ? r - 3 : 0), a = 3; a < r; a++) o[a - 3] = arguments[a]
    var u,
      c,
      i = { done: !1, value: $n(t, j(1)) },
      f = { done: !1, value: nt(n) },
      l = function(n) {
        return (u = n)
      },
      s = function(n) {
        return (c = n)
      }
    return ot(
      {
        q1: function() {
          return { nextState: 'q2', effect: i, stateUpdater: s }
        },
        q2: function() {
          return { nextState: 'q3', effect: { done: !1, value: Jn(c) }, stateUpdater: l }
        },
        q3: function() {
          return { nextState: 'q4', effect: ((n = u), { done: !1, value: Yn.apply(void 0, [e].concat(o, [n])) }) }
          var n
        },
        q4: function() {
          return { nextState: 'q2', effect: f }
        },
      },
      'q1',
      'throttle(' + rt(t) + ', ' + e.name + ')',
    )
  }
  function ft(n, t, e) {
    for (var r = arguments.length, o = Array(3 < r ? r - 3 : 0), a = 3; a < r; a++) o[a - 3] = arguments[a]
    var u,
      c,
      i = { done: !1, value: Jn(t) },
      f = { done: !1, value: Qn({ action: Jn(t), debounce: nt(n) }) },
      l = function(n) {
        return (u = n)
      },
      s = function(n) {
        return (c = n)
      }
    return ot(
      {
        q1: function() {
          return { nextState: 'q2', effect: i, stateUpdater: l }
        },
        q2: function() {
          return { nextState: 'q3', effect: f, stateUpdater: s }
        },
        q3: function() {
          return c.debounce
            ? { nextState: 'q1', effect: ((t = u), { done: !1, value: Yn.apply(void 0, [e].concat(o, [t])) }) }
            : { nextState: 'q2', effect: ((n = c.action), { done: !1, value: n }), stateUpdater: l }
          var n, t
        },
      },
      'q1',
      'debounce(' + rt(t) + ', ' + e.name + ')',
    )
  }
  var lt = Object.freeze({
      effectTypes: Rn,
      take: Jn,
      takeMaybe: function() {
        var n = Jn.apply(void 0, arguments)
        return (n.payload.maybe = !0), n
      },
      put: Bn,
      putResolve: function() {
        var n = Bn.apply(void 0, arguments)
        return (n.payload.resolve = !0), n
      },
      all: function(n) {
        return Hn(mn, n)
      },
      race: Qn,
      call: Wn,
      apply: function(n, t, e) {
        return void 0 === e && (e = []), Hn(Cn, Vn([n, t], e))
      },
      cps: function(n) {
        for (var t = arguments.length, e = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) e[r - 1] = arguments[r]
        return Hn(_n, Vn(n, e))
      },
      fork: Yn,
      spawn: function(n) {
        for (var t = arguments.length, e = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) e[r - 1] = arguments[r]
        return Xn(Yn.apply(void 0, [n].concat(e)))
      },
      join: function(n) {
        return Hn(Tn, n)
      },
      cancel: Zn,
      select: function(n) {
        void 0 === n && (n = p)
        for (var t = arguments.length, e = Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) e[r - 1] = arguments[r]
        return Hn(On, { selector: n, args: e })
      },
      actionChannel: $n,
      cancelled: function() {
        return Hn(Nn, {})
      },
      flush: function(n) {
        return Hn(jn, n)
      },
      getContext: function(n) {
        return Hn(wn, n)
      },
      setContext: function(n) {
        return Hn(Ln, n)
      },
      delay: nt,
      debounce: function(n, t, e) {
        for (var r = arguments.length, o = Array(3 < r ? r - 3 : 0), a = 3; a < r; a++) o[a - 3] = arguments[a]
        return Yn.apply(void 0, [ft, n, t, e].concat(o))
      },
      retry: function(n, t, e) {
        for (var r = arguments.length, o = Array(3 < r ? r - 3 : 0), a = 3; a < r; a++) o[a - 3] = arguments[a]
        return Wn.apply(
          void 0,
          [
            function(n, t, e) {
              for (var r = n, o = arguments.length, a = Array(3 < o ? o - 3 : 0), u = 3; u < o; u++)
                a[u - 3] = arguments[u]
              var c = { done: !1, value: Wn.apply(void 0, [e].concat(a)) },
                i = { done: !1, value: nt(t) }
              return ot(
                {
                  q1: function() {
                    return { nextState: 'q2', effect: c, errorState: 'q10' }
                  },
                  q2: function() {
                    return { nextState: et }
                  },
                  q10: function(n) {
                    if ((r -= 1) <= 0) throw n
                    return { nextState: 'q1', effect: i }
                  },
                },
                'q1',
                'retry(' + e.name + ')',
              )
            },
            n,
            t,
            e,
          ].concat(o),
        )
      },
      takeEvery: function(n, t) {
        for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
        return Yn.apply(void 0, [at, n, t].concat(r))
      },
      takeLatest: function(n, t) {
        for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
        return Yn.apply(void 0, [ut, n, t].concat(r))
      },
      takeLeading: function(n, t) {
        for (var e = arguments.length, r = Array(2 < e ? e - 2 : 0), o = 2; o < e; o++) r[o - 2] = arguments[o]
        return Yn.apply(void 0, [ct, n, t].concat(r))
      },
      throttle: function(n, t, e) {
        for (var r = arguments.length, o = Array(3 < r ? r - 3 : 0), a = 3; a < r; a++) o[a - 3] = arguments[a]
        return Yn.apply(void 0, [it, n, t, e].concat(o))
      },
    }),
    st = Object.freeze({
      SAGA_ACTION: o,
      TASK: h,
      createMockTask: function() {
        var n,
          t,
          e,
          r = !0
        return (
          ((n = {})[h] = !0),
          (n.isRunning = function() {
            return r
          }),
          (n.result = function() {
            return t
          }),
          (n.error = function() {
            return e
          }),
          (n.setRunning = function(n) {
            return (r = n)
          }),
          (n.setResult = function(n) {
            return (t = n)
          }),
          (n.setError = function(n) {
            return (e = n)
          }),
          n
        )
      },
      cloneableGenerator: function a(u) {
        return function() {
          for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t]
          var r = [],
            o = u.apply(void 0, e)
          return {
            next: function(n) {
              return r.push(n), o.next(n)
            },
            clone: function() {
              var t = a(u).apply(void 0, e)
              return (
                r.forEach(function(n) {
                  return t.next(n)
                }),
                t
              )
            },
            return: function(n) {
              return o.return(n)
            },
            throw: function(n) {
              return o.throw(n)
            },
          }
        }
      },
    })
  ;(n.effects = lt),
    (n.utils = st),
    (n.default = function(n) {
      void 0 === n && (n = {})
      var o,
        t = n.context,
        a = void 0 === t ? {} : t,
        u = (function(n, t) {
          if (null == n) return {}
          var e,
            r,
            o = {},
            a = Object.keys(n)
          for (r = 0; r < a.length; r++) t.indexOf((e = a[r])) < 0 && (o[e] = n[e])
          return o
        })(n, ['context']),
        c = u.sagaMonitor,
        i = u.logger,
        f = u.onError,
        l = u.effectMiddlewares
      function e(n) {
        var t = n.getState,
          e = n.dispatch,
          r = hn()
        return (
          (r.put = (u.emitter || p)(r.put)),
          (o = Fn.bind(null, {
            context: a,
            channel: r,
            dispatch: e,
            getState: t,
            sagaMonitor: c,
            logger: i,
            onError: f,
            effectMiddlewares: l,
          })),
          function(e) {
            return function(n) {
              c && c.actionDispatched && c.actionDispatched(n)
              var t = e(n)
              return r.put(n), t
            }
          }
        )
      }
      return (
        (e.run = function() {
          return o.apply(void 0, arguments)
        }),
        (e.setContext = function(n) {
          X(a, n)
        }),
        e
      )
    }),
    (n.buffers = L),
    (n.CANCEL = g),
    (n.SAGA_LOCATION = a),
    (n.runSaga = Fn),
    (n.END = dn),
    (n.isEnd = vn),
    (n.eventChannel = function(n, t) {
      void 0 === t && (t = N())
      var e,
        r = !1,
        o = pn(t),
        a = function() {
          r || ((r = !0), S(e) && e(), o.close())
        }
      return (
        (e = m(
          (e = n(function(n) {
            vn(n) ? a() : o.put(n)
          })),
        )),
        r && e(),
        { take: o.take, flush: o.flush, close: a }
      )
    }),
    (n.channel = pn),
    (n.multicastChannel = gn),
    (n.stdChannel = hn),
    (n.detach = Xn),
    Object.defineProperty(n, '__esModule', { value: !0 })
})
