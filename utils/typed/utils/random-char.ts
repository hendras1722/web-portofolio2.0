import { keyboards } from '../data/keyboards.ts';
import { isSpecialChar } from './is-special-char.ts';
import { randomInt } from './random-int.ts';

export class RandomChars {
  public getRandomCharCloseToChar(intendedChar: string, locale: string): string | undefined {
    const keyboard = keyboards[locale];
    if (!keyboard) {
      throw new Error(`Locale ${locale} is not known`);
    }
    let isLowerKey = true;
    let rowIndex = keyboard.lower.findIndex(row => row.includes(intendedChar));
    if (rowIndex === -1) {
      isLowerKey = false;
      rowIndex = keyboard.upper.findIndex(row => row.includes(intendedChar));
    }
    if (rowIndex === -1) {
      return undefined;
    }
    const usedKeyboard = isLowerKey ? keyboard.lower : keyboard.upper;
    const keyboardRow = usedKeyboard[rowIndex];
    if (!keyboardRow) {
      return undefined;
    }
    const columnIndex = keyboardRow.indexOf(intendedChar);
    const nearbyChars = this.findNearbyChars(intendedChar, rowIndex, columnIndex, usedKeyboard);

    return nearbyChars[randomInt(0, nearbyChars.length - 1)];
  }

  private findNearbyChars(intendedChar: string, rowIndex: number, columnIndex: number, usedKeyboard: string[]): string[] {
    const threshold = Math.random() < 0.5 ? 2 : 1;
    const nearbyChars: string[] = [];

    for (let r = -1; r <= 1; r++) {
      for (let c = -2; c <= 2; c++) {
        const row = rowIndex + r;
        const column = columnIndex + c;

        if ((r === 0 && c === 0) || Math.abs(r) + Math.abs(c) > threshold) {
          continue;
        }
        if (row === 0 && rowIndex !== 0) {
          continue;
        }
        const keyboardRow = usedKeyboard[row];
        if (row < 0 || !keyboardRow || column < 0 || column >= keyboardRow.length) {
          continue;
        }

        const potentialChar = keyboardRow[column];
        if (potentialChar === undefined || isSpecialChar(potentialChar) !== isSpecialChar(intendedChar)) {
          continue;
        }
        nearbyChars.push(potentialChar);
      }
    }
    return nearbyChars;
  }
}
