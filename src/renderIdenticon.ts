import jazzicon from 'jazzicon'
import iconFactoryGenerator from './icon-factory'
const iconFactory = iconFactoryGenerator(jazzicon)
import rasterize from './rasterizeSvg'

function jsNumberForAddress (address: string) {
  var addr = address.slice(2, 10)
  var seed = parseInt(addr, 16)
  return seed
}

export default function renderIdenticon(rawAddress) {
  const address = '0x' + rawAddress.slice(2).toUpperCase()
  const diameter = 3000
  const div = jazzicon(diameter, jsNumberForAddress(address))
  const svg = div.children[0]

  // work around limitations in jazzicon library
  svg.setAttribute('viewBox', `0 0 ${diameter} ${diameter}`) // missing
  svg.removeAttribute('height') // remove default of 100
  svg.removeAttribute('width') // remove default of 100

  // add eth address to svg
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  const textContent = document.createTextNode(address)
  text.appendChild(textContent)
  text.setAttribute('x', `${diameter / 8}px`)
  text.setAttribute('y', `${diameter / 4}px`)
  text.setAttribute('font-size', `${diameter / 28}px`)
  text.setAttribute('font-family', '"Ubuntu Mono", monospace')
  svg.appendChild(text)

  // rasterize & download svg
  const el = document.getElementById('identicon');
  if (!el) throw new Error('cannot find #identicon element!')
  const img = rasterize(`eth-fashion-${address}`, svg, diameter)

  // add to DOM
  el.innerHTML = ''
  el.appendChild(img)
}
