const testing = true
import { consoler } from './utils.js'

let arrayOfDraggables = []

export function dragger(elements){
    arrayOfDraggables = elements.length > 0 ? [...elements] : [elements]
    initGeneralEvents()
    for(let element of arrayOfDraggables){
        resetElementPosition(element)
        addTouchEvents(element)
        addMouseEvents(element)
    } 
}

function initGeneralEvents(){
    document.addEventListener('mousemove', ev => {
        const draggedElement = document.querySelector('[dragging]')
        if(draggedElement) move(draggedElement, {
            x: ev.clientX,
            y: ev.clientY,
            shift: ev.shiftKey,
            ctrl: ev.ctrlKey
        })
    })
}

export function add(element){
    arrayOfDraggables.push(element)
    prepareElement(element)
}

function resetElementPosition(element){
    element.style.userSelect = 'none'
    element.style.position = 'absolute'
    element.style.margin = 0
}
function addTouchEvents(element){
    element.addEventListener('touchstart', ev => {
        startDrag(ev.target, {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY
        })
    })
    element.addEventListener('touchmove', ev => {
        move(ev.target, {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY
        })
    })
    element.addEventListener('touchend', ev => {
        stopDragging(ev.target, {
            x: ev.changedTouches[0].clientX,
            y: ev.changedTouches[0].clientY
        })
    })
}
function addMouseEvents(element){
    element.addEventListener('mousedown', ev => {
        startDrag(element, {
            x: ev.clientX,
            y: ev.clientY,
            shift: ev.shiftKey,
            ctrl: ev.ctrlKey
        })
    })
    element.addEventListener('mouseup', ev => {
        stopDragging(element, {
            x: ev.clientX,
            y: ev.clientY,
            shift: ev.shiftKey,
            ctrl: ev.ctrlKey
        })
    })
}



function startDrag(element, {x,y,shift,ctrl}){
    consoler(testing, `Started: ${x}:${y} - ${shift ? 'shift' : 'no shift'}, ${ctrl ? 'ctrl' : 'no ctrl'}`)
    
    element.setAttribute('dragging', '')
    element.style.zIndex = 1000
    element.setAttribute('shiftX', x - element.getBoundingClientRect().left)
    element.setAttribute('shiftY', y - element.getBoundingClientRect().top)

    if(dragger.startDrag) dragger.startDrag({element,x,y,shift,ctrl})
}

function move(moving, {x,y,shift,ctrl}){    
    consoler(testing, `Moving: ${x}:${y} - ${shift ? 'shift' : 'no shift'}, ${ctrl ? 'ctrl' : 'no ctrl'}`)

    moving.style.left = x - moving.getAttribute('shiftX') + 'px'
    moving.style.top = y - moving.getAttribute('shiftY') + 'px'

    const notYou = arrayOfDraggables.filter( drag => drag !== moving )

    if(dragger.drag) dragger.drag({element: moving,x,y,shift,ctrl})

    for(let el of notYou){
        
        const el_x = el.getBoundingClientRect().left
        const el_y = el.getBoundingClientRect().top
        const el_width = el.getBoundingClientRect().width
        const el_height = el.getBoundingClientRect().height
        
        const movingEl_x = moving.getBoundingClientRect().left
        const movingEl_y = moving.getBoundingClientRect().top
        const movingEl_width = moving.getBoundingClientRect().width
        const movingEl_height = moving.getBoundingClientRect().height
        
        if(movingEl_x + movingEl_width >= el_x && movingEl_x <= el_x + el_width && movingEl_y + movingEl_height >= el_y && movingEl_y <= el_y + el_height){
            if(!el.hasAttribute('colliding')){ 
                el.setAttribute('colliding','')
                if(dragger.onCollide) dragger.onCollide({
                        collider: moving, 
                        collided: el
                    })
            }
        }else{
            if(el.hasAttribute('colliding')){
                el.removeAttribute('colliding')
                if(dragger.endCollide) dragger.endCollide({
                    collider: moving, 
                    collided: el
                })
            }
        }   
    }
}

function stopDragging(element, {x,y,shift,ctrl}){
    consoler(testing, `Stopped: ${x}:${y} - ${shift ? 'shift' : 'no shift'}, ${ctrl ? 'ctrl' : 'no ctrl'}`)
    
    element.style.zIndex = 'unset'
    element.removeAttribute('dragging')
    
    if(dragger.stopDrag) dragger.stopDrag({element,x,y,shift,ctrl})
}