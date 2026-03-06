import type { Keyboards } from '../types/keyboard.ts';

export const keyboards: Keyboards = {
  en: {
    lower: ['1234567890-=', 'qwertyuiop[]', 'asdfghjkl;', 'zxcvbnm,./', ' '],
    upper: ['!@#$%^&*()_+', 'QWERTYUIOP{}|', 'ASDFGHJKL:"', 'ZXCVBNM?', ' ']
  },
  de: {
    lower: ['1234567890ß', 'qwertzuiopü+', 'asdfghjklöä#', 'yxcvbnm,.-', ' '],
    upper: ['!"§$%&/()=?', 'QWERTZUIOPÜ*', "ASDFGHJKLÖÄ'", 'YXCVBNM;:_', ' ']
  }
};
