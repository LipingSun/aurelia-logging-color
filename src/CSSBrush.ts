import { RGB, createColorsFromMap, rgbHex } from 'color-map'

import { rainbow } from './colors'
import { BrushOption, Brush } from './interfaces'

export class CSSBrush implements Brush {
  private count = 0
  private colors: RGB[]
  private map: { [index: string]: RGB } = {}
  private option: BrushOption

  constructor(option: Partial<BrushOption> = {}) {
    this.option = {
      maxColor: option.maxColor || 20,
      coloringText: option.coloringText || false
    }
    this.colors = createColorsFromMap(rainbow, option.maxColor || 20)
  }

  color(id: string, ...rest: string[]) {
    // TODO style (italic, bold, underscore) rotation
    const rgb = this.getRgb(id)
    const background = rgbHex(rgb)
    const border = rgbHex(rgb.map(x => Math.max(0, x - 32)))
    const color = this.getLightness(rgb[0], rgb[1], rgb[2]) >= 0.5 ? '#000000' : '#ffffff'
    let idStr = `%c ${id} `
    if (rest.length > 1 && rest[0].indexOf('%c') !== -1) {
      idStr += rest.shift()
    }
    return [idStr, `padding: 2px; margin: 2px; line-height: 1.8em;background: ${background};bother: 1px solid ${border};color: ${color};`, ...rest]
  }

  private getRgb(text: string) {
    // It is ok to overlep color.
    // Not trying to be too smart about it.
    return this.map[text] = this.map[text] || this.colors[this.count++ % this.option.maxColor]
  }

  // Get Lightness of HSL
  private getLightness(r: number, g: number, b: number){
    r /= 255
    g /= 255
    b /= 255
    return (Math.max(r, g, b) + Math.min(r, g, b)) / 2
  }
}
