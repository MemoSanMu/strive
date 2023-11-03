const lowerCase = str => {
    let result = ''
    for (let char of str) {
      const charAt = char.charCodeAt()
      if (charAt <= 'Z'.charCodeAt() && charAt >= 'A'.charCodeAt()) {
        char = String.fromCharCode(charAt + 32)
      }
      result += char
    }
    return result
  }

  //=> 'hello'

  console.log(  lowerCase('HELLO'), 'hello');

  //=> '山月'
console.log(  lowerCase('山月'), '山月');