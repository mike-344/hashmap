function Hashmap(){

const buckets = new Array(16)
let capacity = buckets.length
let loadFactor = .75


let hash = (key) =>{
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }
 
    return hashCode;
}

return {capacity, hash}
}

export {Hashmap}