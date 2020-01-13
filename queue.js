/**
 * Queue class used to create queues with first-in-first-out
 */
class Queue 
{ 
    /**
     * constructor, creates empty list
     */
    constructor() 
    { 
        this.items = []; 
    } 
    /**
     * adds element to the end of the list
     * @param {} element 
     */
    enqueue(element) 
    {     
        this.items.push(element); 
    } 
    /**
     * removes first item on the list, shifts all elements to the front, and returns given element
     */
    dequeue() 
    { 
        if(this.isEmpty()) 
            return false; 
        return this.items.shift(); 
    }
    /**
     * checks if queueu list is empty, returns true if empty
     */
    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length == 0; 
    }
} 