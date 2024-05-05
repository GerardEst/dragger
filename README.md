Easily drag and drop any elements. Supports collisions and drag while ctrl or shift is press.

[Codepen Example](https://codepen.io/gereger/pen/poBMyOa?editors=1111)

### Installation

`npm install @gerardest/dragger`

### Basic usage

`import {dragger} from './dragger.js'`

Just pass an array of elements to dragger
  
```
const elements = document.querySelector('.draggable')
dragger(elements)
```

### Collisions
When there is a collision, a 'colliding' attribute is added to the element so you can do whatever you need with it. For example, add some style to it:
~~~
div[colliding] {
  background-color: salmon;
}
~~~

### Methods
#### Add
You can add draggable items whenever you need with add
~~~
import {add} from '@gerardest/dragger'
let el = document.querySelector('#newItem')
add(el)
~~~

### Events
In the event, you can see if shift or ctrl was pressed during the event.
#### startDrag
~~~
dragger.startDrag = ev => {
  // your code
}
~~~
#### stopDrag
~~~
dragger.stopDrag = ev => {
  // your code
}
~~~
#### onCollide
~~~
dragger.onCollide = ev => {
  // your code
}
~~~
#### endCollide
~~~
dragger.endCollide = ev => {
  // your code
}
~~~