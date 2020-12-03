import Vue from 'vue'
Vue.prototype.$peToEn = (amount) => {
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ]
  const arabicNumbers = [
    /٠/g,
    /١/g,
    /٢/g,
    /٣/g,
    /٤/g,
    /٥/g,
    /٦/g,
    /٧/g,
    /٨/g,
    /٩/g,
  ]

  if (typeof amount === 'string') {
    for (let i = 0; i < 10; i++) {
      amount = amount.replace(persianNumbers[i], i).replace(arabicNumbers[i], i)
    }
  }

  return amount
}

Vue.prototype.$numberFormat = (num) => {
  if (typeof num === 'undefined' || num == null) {
    return num
  }

  if (/,/g.test(num)) {
    num = num.replace(/,/g, '')
  }

  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + ',')
}

Vue.prototype.$numberFormat = (num) => {
  if (typeof num === 'undefined' || num == null) {
    return num
  }

  if (/,/g.test(num)) {
    num = num.replace(/,/g, '')
  }

  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + ',')
}

Vue.prototype.$clearNumber = (number) => {
  if (number) {
    return number.toString().replace(/,/g, '')
  }
}

Vue.prototype.$decimalNumber = (number) => {
  if (number - Math.floor(number) !== 0) {
    return number
  }
  return Number(number).toFixed(0)
}
