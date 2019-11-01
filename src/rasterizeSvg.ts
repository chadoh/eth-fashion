export default function rasterizeSvg(filename: string, svg: Element, size: number) {
  // create canvas
  const canvas = document.createElement('canvas')
  canvas.setAttribute('height', `${size}px`)
  canvas.setAttribute('width', `${size}px`)
  const ctx = canvas.getContext('2d')

  // add svg to canvas
  const svgString = (new XMLSerializer()).serializeToString(svg)
  const dataUrl = 'data:image/svg+xml,'+encodeURIComponent(svgString)
  const img = new Image()
  img.src = dataUrl
  img.onload = () => {
    ctx.drawImage(img, 0, 0)

    canvas.toBlob(blob => {
      const a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  return img
}

