# ADAM [app developer advanced module] UI Components (beta)
<img src="https://steve19890707.github.io/UI-Components/imgs/banner.jpg" alt="" />

It's components for React, now is beta version, release will be come in future.
### [develop using packages]
- react-icons(4.4.0)
- styled-components(5.3.5)
- lodash(4.17.21)
- moment(2.29.4)
- classnames(2.3.2)
## Components Using

component params guide.
### 🍎 DropInput

| object | Params | Type |
| ------ | ------ | ------ |
| datalist | default: empty array (*inset must be use object: { value,...etc }*) | array |
| theme | light / dark | string |
| width | [default: 180px] (number) + px / % / rem ...etc | string |
| fontSize | [default: 14px] (number) + px / % / rem ...etc | string |
| placeholder | default: 'select' | string |
| emptyValue | default: 'data not found' | string |
| onClick | call your event, return: object | function |

### 🍎 Button

| object | Params | Type |
| ------ | ------ | ------ |
| theme | light / dark | string |
| text | default: button | string |
| width | [default: 180px] (number) + px / % / rem ...etc | string |
| fontSize | [default: 14px] (number) + px / % / rem ...etc | string |
| onClick | call your event | function |

### 🍎 Switch

| object | Params | Type |
| ------ | ------ | ------ |
| theme | light / dark | string |
| size | [default: 50px] (number) + px / % / rem ...etc | string |
| onChange | call your event, return: Boolen | function |

### 🍎 Input

| object | Params | Type |
| ------ | ------ | ------ |
| datalist | default: empty array | array |
| theme | light / dark | string |
| width | [default: 180px] (number) + px / % / rem ...etc | string |
| fontSize | [default: 14px] (number) + px / % / rem ...etc | string |
| placeholder | default: 'select' | string |
| onChange | call your event, return: value(string) | function |


### 🍎 Date Picker

| object | Params | Type |
| ------ | ------ | ------ |
| theme | light / dark | string |
| width | [default: 180px] (number) + px / % / rem ...etc | string |
| onClick | call your eventt, return: object { selected: moment(pick date) } | function |

### 🍎 Tab

| object | Params | Type |
| ------ | ------ | ------ |
| datalist | default: empty array | array |
| defaultId | default: 1 | Number |
| theme | light / dark | string |
| onClick | call your eventt, return: object { id, value } | function |

### 🍎 List

| object | Params | Type |
| ------ | ------ | ------ |
| dataType | default: 'single'(single, multiple) | string |
| data(single) | default: empty array; type: [ 'string',... ] | array |
| data(multiple) | default: empty array; type: [ { title, data },... ] | array |
| header | default: 'header' | string |
| theme | light / dark | string |
| width | [default: 600px] (number) + px / % / rem ...etc | string |
| onClick | call your eventt, return: value | function |
