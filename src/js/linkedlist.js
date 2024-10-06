function linkedList(){
    let head = null;
    let tail = null;
    let length = 0;
    let append = (value) =>{
        let newNode = Node(value)
        if (head === null){
        head = newNode;
        tail = newNode;
        } else{
            tail.next = newNode
            tail = newNode
        }
        length++
    }
    let prepend = (value) => {
        let newNode = Node(value)
        if (head === null){
            head = newNode
            tail = newNode
        } else{
        newNode.next = head;
        head = newNode
        }
        length++;
    }
    let size = () =>{
        return length;
    }
    let getHead = () =>{
        return head;
    }
    let getTail = () =>{
        return tail;
    }
    let at = (index) =>{
        let current = getHead();
        let count = 0
        while(count < index){
            current = current.next
            count++
        }
        return current
    }
    let toString = () =>{
        let str = ''
        let current = getHead()
        while (current){
            str += `( ${current.value} ) ->`
            current = current.next
        }
        str += ` null`
        return str;
    }
    let pop = () =>{
       let current = getHead()
       while(current.next !== tail){
        current = current.next
       }
       current.next = null
       tail = current
       length--
       
    }
    let contains = (value) =>{
        let current = getHead()
        while (current){
           if (current.value === value){
            return true
           }
           current = current.next
           
        }
        return false
    }

    let find = (value) =>{
        let counter = 0;
        let current = getHead()
        while (current){
           if (current.value === value){
            return counter
           }
           current = current.next
           counter++
           
        }
        return null
    }


    const insertAt = (value, index) => {
        if (index < 0 || index > length) {
            throw new Error('Index out of bounds');
        }
        if (index === 0) {
            prepend(value);
        } else if (index === length) {
            append(value);
        } else {
            const newNode = Node(value);
            const previousNode = at(index - 1);
            newNode.next = previousNode.next;
            previousNode.next = newNode;
            length++;
        }
    };

    const removeAt = (index) => {
        if (index < 0 || index >= length) {
            throw new Error('Index out of bounds');
        }
        if (index === 0) {
            head = head.next;
            if (length === 1) {
                tail = null;
            }
        } else {
            const previousNode = at(index - 1);
            previousNode.next = previousNode.next.next;
            if (index === length - 1) {
                tail = previousNode; // Update tail if removing the last element
            }
        }
        length--;
    };


    return {append, prepend, size, getHead, getTail, at, toString, pop, contains, find, insertAt, removeAt}

}

function Node(value = null, next = null){
 

return {value, next}
}

export {linkedList}