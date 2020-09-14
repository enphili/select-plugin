'use strict';

import {Select} from './select/select';
import './select/style.scss';

const select = new Select('#select', {
  placeholder: 'Выбрать элемент',
  // selectedId: '1', // выбраный элемент по умолчанию
  data: [
    {id: '1', value: 'Значение 1'},
    {id: '2', value: 'Значение 2'},
    {id: '3', value: 'Значение 3'},
    {id: '4', value: 'Значение 4'}
  ],
  onSelect(item) {
    console.log('Выбран элемент:', item); // что делать c результатом выбора
  }
});