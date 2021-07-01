// "QuickSort"
const quickSort = (arr) => {
  if (arr.length <= 1) return arr;

  const left = [];
  const right = [];
  const newArray = [];
  const pivot = arr.pop();
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return newArray.concat(quickSort(left), pivot, quickSort(right));
};

// "MergeSort"
const _mergeArrays = (a, b) => {
  const c = []

  while (a.length && b.length) {
    c.push(a[0] > b[0] ? b.shift() : a.shift())
  }

  //if we still have values, let's add them at the end of `c`
  while (a.length) {
    c.push(a.shift())
  }
  while (b.length) {
    c.push(b.shift())
  }

  return c
}

const mergeSort = (a) => {
  if (a.length < 2) return a
  const middle = Math.floor(a.length / 2)
  const a_l = a.slice(0, middle)
  const a_r = a.slice(middle, a.length)
  const sorted_l = mergeSort(a_l)
  const sorted_r = mergeSort(a_r)
  return _mergeArrays(sorted_l, sorted_r)
}

// "InsertionSort"
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    let temp = arr[i]
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j+1] = temp
  }
  return arr
}

// "BubbleSort"
const bubbleSort = (arr) => {
    let swapp;
    let n = arr.length-1;
    const x = arr;
    do {
        swapp = false;
        for (let i = 0; i < n; i++)
        {
            if (x[i] < x[i+1])
            {
               const temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
 return x; 
}

// "RadixSort"
const radixSort = array => { // O(nk)
  const getMax = array => { // O(n)
    let max = 0
    for (let num of array) {
      max = (max < num.toString().length) ? num.toString().length : max
    }
    return max
  }

  const getPosition = (num,place) => Math.floor(num / Math.pow(10,place)) % 10 // O(1)

	const max = getMax(array);
	for (let i = 0; i < max; i++) {
		let buckets = Array.from({length:10}, () => [])
		for (let j = 0; j < array.length; j++) {
			buckets[getPosition(array[j], i)].push(array[j])
		}
		array = [].concat(...buckets)
	}
	return array
}

// "HeapSort"
const heapSort = (arr) => {
  let array_length;

  const heap_root = (input, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < array_length && input[right] > input[max])     {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

  const swap = (input, index_A, index_B) => {
    const temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
  }

  const heap_Sort = (input) => {
      array_length = input.length;
      const middleItem = Math.floor(array_length / 2);

      for (let i = middleItem; i >= 0; i -= 1) {
        heap_root(input, i);
      }

      for (let i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
        heap_root(input, 0);
      }
      return input;
  }
  return heap_Sort(arr.slice());
}


//-------------------------//
export const sortify = {
  QuickSort: quickSort,
  MergeSort: mergeSort,
  InsertionSort: insertionSort,
  BubbleSort: bubbleSort,
  RadixSort: radixSort,
  HeapSort: heapSort,
};
