import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'platePipe',
})
export class PipePlate implements PipeTransform {
  transform(value: string): string {
    const rawValue = value.replace(/[^a-zA-Z0-9,;\-.!? ]/g, '');
    const formattedValue = `${rawValue
      .substring(0, 3)
      .toUpperCase()}-${rawValue.substring(4, 8)}`;
    return formattedValue;
  }
}
