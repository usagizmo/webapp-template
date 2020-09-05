import { useEffectOnce } from 'react-use'

const useTypekit = (kitId: string): void => {
  useEffectOnce(() => {
    const d = document
    const config = {
        kitId,
        scriptTimeout: 3000,
        async: true,
      },
      h = d.documentElement,
      t = setTimeout(function () {
        h.className = h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive'
      }, config.scriptTimeout),
      tk = d.createElement('script'),
      s = d.getElementsByTagName('script')[0]
    let f = false,
      a
    h.className += ' wf-loading'
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js'
    tk.async = true
    tk.onload = (tk as any).onreadystatechange = function () {
      a = this.readyState
      if (f || (a && a != 'complete' && a != 'loaded')) return
      f = true
      clearTimeout(t)
      try {
        // eslint-disable-next-line no-extra-semi
        ;(window as any).Typekit?.load(config)
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
    }
    s.parentNode.insertBefore(tk, s)
  })
}

export default useTypekit
