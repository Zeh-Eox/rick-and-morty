import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  private dictionary: { [key: string]: string } = {
    'DEAD': 'Mort',
    'ALIVE': 'Vivant',
    'UNKNOWN': 'Inconnu',
  };

  transform(value: string): string {
    const temp = value.toUpperCase();
    return this.dictionary[temp] || value;
  }
}