/**
 * Author: Alexandre Chabeau
 * License: MIT
 * Contact: alexandrechabeau.pro@gmail.com
 * Original repos: https://github.com/saucyspray/split-text-js
 */
class SplitText {
  constructor(_target) {
    this.result = new Object()
    this.result.originalText = _target.innerText
    this.result.splitted = this.split(_target)
    this.result.words = this.result.splitted.querySelectorAll(
      '.SplitTextJS-wrapper',
    )
    this.result.chars =
      this.result.splitted.querySelectorAll('.SplitTextJS-char')
    this.result.spaces = this.result.splitted.querySelectorAll(
      '.SplitTextJS-spacer',
    )
    return this.result
  }
  createSpan(_class) {
    let span = document.createElement('span')
    span.style.display = 'inline-block'
    span.className = _class
    return span
  }
  split(_target) {
    let containerArray = new Array()
    const splittedTarget = _target.innerText.split(' ')
    let counter = splittedTarget.length
    splittedTarget.map((word) => {
      const wrapper = this.createSpan('SplitTextJS-wrapper')
      word.split(/(?!^)/).map((char) => {
        let el = this.createSpan('SplitTextJS-char')
        el.innerText = char
        wrapper.appendChild(el)
      })
      counter--
      containerArray.push(wrapper)
      if (counter > 0) {
        let space = this.createSpan('SplitTextJS-char SplitTextJS-spacer')
        space.innerHTML = '&nbsp;'
        containerArray.push(space)
      }
    })
    _target.innerHTML = ''
    containerArray.forEach((child) => {
      _target.appendChild(child)
    })
    return _target
  }
}
module.exports = SplitText
