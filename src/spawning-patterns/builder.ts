enum ImageFormat {
  Png = "png",
  Jpeg = "jpeg",
}

interface IResolution {
  width: number;
  height: number;
}

interface IImageConversion extends IResolution {
  format: ImageFormat;
}

class ImageBuilder {
  private formats: ImageFormat[] = [];
  private resolutions: IResolution[] = [];

  /**
   * Основная идея паттерна Строитель заключается в том, что мы можем создавать
   * сложные объекты пошагово. При этом нам не нужно знать о всех шагах создания
   * объекта, а только о тех, которые нам интересны.
   * Каждый метод возвращает this.
   */
  addPng() {
    if (this.formats.includes(ImageFormat.Png)) {
      return this;
    }
    this.formats.push(ImageFormat.Png);
    return this;
  }
  addJpeg() {
    if (this.formats.includes(ImageFormat.Jpeg)) {
      return this;
    }
    this.formats.push(ImageFormat.Jpeg);
    return this;
  }

  addResolution(width: number, height: number) {
    this.resolutions.push({ width, height });
    return this;
  }
  /**
   * Финальный метод, который собирает все данные и возвращает готовый объект.
   */
  build(): IImageConversion[] {
    const res: IImageConversion[] = [];
    for (const format of this.formats) {
      for (const resolution of this.resolutions) {
        res.push({ format, ...resolution });
      }
    }
    return res;
  }
}
