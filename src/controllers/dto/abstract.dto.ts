export class AbstractDto {
  [key: string]: any;

  constructor(options: any) {
    for (const key in options) {
      this[key] = options[key];
    }
  }
}
