import { CSSProperties } from "react";

export const labelColor = (label_color: string): CSSProperties => {
    const bgcolor: string = '#' + label_color || '#FFF'

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(bgcolor)
    if (!result) {
      return {}
    }

    const red = parseInt(result[1], 16)
    const green = parseInt(result[2], 16)
    const blue = parseInt(result[3], 16)

    let color = ''
    if (0.299 * red + 0.587 * green + 0.114 * blue > 127.5) {
      color = '#020202'
    } else {
      color = '#FFF'
    }

    return {
      color: color,
      backgroundColor: bgcolor,

    }
  }