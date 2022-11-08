import Inputmask from 'inputmask'

export default class PhoneMask {
  constructor(mask) {
    this.im = new Inputmask(mask)
  }

  init(element) {
    this.im.mask(element)
  }
}
