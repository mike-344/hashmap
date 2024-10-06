import { linkedList } from "./linkedlist";

function Hashmap() {
    const buckets = new Array(16);
    let capacity = buckets.length;
    const loadFactor = 0.75;
    let size = 0;

    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }
        return hashCode;
    };

    const set = (key, value) => {
        if (key == null) return; 
        let index = hash(key);

        if (!buckets[index]) {
            buckets[index] = linkedList();
        }

        let current = buckets[index].getHead();
        while (current) {
            if (current.value.key === key) {
                current.value.value = value; 
                return;
            }
            current = current.next;
        }

        buckets[index].append({ key, value });
        size++;

        if (size / capacity > loadFactor) {
            resize();
        }
    };

    const resize = () => {
        const oldBuckets = buckets;
        capacity *= 2;
        buckets.length = capacity;

        
        size = 0; 
        for (const bucket of oldBuckets) {
            if (bucket) {
                let current = bucket.getHead();
                while (current) {
                    set(current.value.key, current.value.value);
                    current = current.next;
                }
            }
        }
    };

    const get = (key) => {
        if (key == null) return null; 
        let index = hash(key);
        if (!buckets[index]) return null;

        let current = buckets[index].getHead();
        while (current) {
            if (current.value.key === key) {
                return current.value.value;
            }
            current = current.next;
        }
        return null; 
    };

    const has = (key) => {
        return get(key) !== null; 
    };

    const remove = (key) => {
        if (key == null) return false; 
        let index = hash(key);
        if (!buckets[index]) return false;

        let current = buckets[index].getHead();
        let previous = null;
        while (current) {
            if (current.value.key === key) {
                if (previous) {
                    previous.next = current.next; 
                } else {
                    buckets[index].head = current.next; 
                }
                size--;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false; 
    };

    const length = () => {
        return size; 
    };

    const clear = () => {
        buckets.length = 16; 
        capacity = 16;
        size = 0; 
    };

    const keys = () => {
        const allKeys = [];
        for (const bucket of buckets) {
            if (bucket) {
                let current = bucket.getHead();
                while (current) {
                    allKeys.push(current.value.key);
                    current = current.next;
                }
            }
        }
        return allKeys;
    };

    const values = () => {
        const allValues = [];
        for (const bucket of buckets) {
            if (bucket) {
                let current = bucket.getHead();
                while (current) {
                    allValues.push(current.value.value);
                    current = current.next;
                }
            }
        }
        return allValues;
    };

    const entries = () => {
        const allEntries = [];
        for (const bucket of buckets) {
            if (bucket) {
                let current = bucket.getHead();
                while (current) {
                    allEntries.push([current.value.key, current.value.value]);
                    current = current.next;
                }
            }
        }
        return allEntries;
    };

    return { set, get, has, remove, length, clear, keys, values, entries };
}