import Ansi256Data from './Ansi256Data'
export class ColorConvertor {
    rgbToAnsi256(rgb: [number, number, number]) {
        let deviation = Number.MAX_VALUE;
        let code = 0;
        Ansi256Data.forEach((color, index) => {
            let tmp = this.calcDeviation(rgb, color.hexString)
            if (deviation > tmp) {
                deviation = tmp
                code = index
            }
        });
        return `\u001B[${code}m`
    }

    private calcDeviation(rgb: [number, number, number], hexString: string) {
      let a = Math.pow((rgb[0] - parseInt(hexString.substring(1, 3), 16)) * 0.3, 2)
      let b = Math.pow((rgb[1] - parseInt(hexString.substring(3, 5), 16)) * 0.59, 2)
      let c = Math.pow((rgb[2] - parseInt(hexString.substring(5, 7), 16)) * 0.11, 2)
      return  a + b + c
    }
}