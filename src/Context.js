import React, { useState, useEffect } from 'react'
import useHover from './hooks/useHover'
const Context = React.createContext()

function ContextProvider({ children }) {

    const [array, setArray] = useState([])
    const [start, setStart] = useState(false)
    const [arraySize, setArraySize] = useState(50)
    const [sortSpeed, setSortSpeed] = useState(0)
    const [sortType, setSortType] = useState("bubble")

    let animationArr = []
    let tempLen
    let index = 0
    let freeze = false

    //makes array when component mounts
    useEffect(() => {
        randomizeArray()
    }, [arraySize])

    //randomizes the array, used when component first mounts and when user refreshes
    function randomizeArray() {
        const randArray = []
        let i = 0;
        const max = 100;
        const min = 10;

        for (i = 0; i < arraySize; i++) {
            const randNum = Math.floor(Math.random() * (max - min)) + min
            randArray.push({
                value: randNum,
                isSorted: false,
                isCompared: false,
                isSwitch: false
            });
        }
        setArray(randArray)
    }

    //too cause delay
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //BUBBLESORT O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O O 
    async function bubbleSort() {

        const randArr = array.slice()

        for (let i = 0; i < arraySize - 1; i++) {
            for (let j = 0; j < arraySize - i - 1; j++) {

                //comparing
                randArr[j].isCompared = true
                randArr[j + 1].isCompared = true
                randArr[j].value > randArr[j + 1].value ? randArr[j + 1].isSwitch = true : randArr[j + 1].isSwitch = false
                setArray(randArr.slice())


                await sleep(sortSpeed);

                if (randArr[j].value > randArr[j + 1].value) {
                    [randArr[j], randArr[j + 1]] = [randArr[j + 1], randArr[j]]
                    setArray(randArr.slice())
                }

                //done comparing
                randArr[j].isCompared = false
                randArr[j + 1].isCompared = false
                randArr[j].isSwitch = false
                setArray(randArr.slice())

            }
            //doneSorting
            randArr[arraySize - 1 - i].isSorted = true
            i === arraySize - 2 ? randArr[0].isSorted = true : randArr[0].isSorted = false
            setArray(randArr.slice())
        }

        setStart(false)
    }

    //SELECTIONSORT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    async function selectionSort() {

        const randArr = array.slice()

        let min_idx = 0

        for (let i = 0; i < arraySize - 1; i++) {
            min_idx = i;

            randArr[i].isCompared = true
            setArray(randArr.slice())



            for (let j = i + 1; j < arraySize; j++) {

                randArr[j].isCompared = true
                setArray(randArr.slice())

                await sleep(sortSpeed);
                if (randArr[j].value < randArr[min_idx].value) {
                    randArr[min_idx].isSwitch = false
                    min_idx = j
                    randArr[min_idx].isSwitch = true
                }


                randArr[j].isCompared = false
                setArray(randArr.slice())

            }

            [randArr[i], randArr[min_idx]] = [randArr[min_idx], randArr[i]]
            randArr[min_idx].isCompared = false
            randArr[i].isSwitch = false
            randArr[i].isSorted = true

            // randArr[i].isSwitch = false
            setArray(randArr.slice())

        }

        randArr[arraySize - 1].isSorted = true
        setArray(randArr.slice())
        setStart(false)
    }

    //INSERTIONSORT <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< 
    async function insertionSort() {

        const randArr = array.slice()

        let key = 0;

        for (let i = 1; i < arraySize; i++) {

            randArr[i].isSorted = true
            setArray(randArr.slice())
            key = randArr[i].value;

            let j = i - 1;

            if (randArr[j].value <= key) {
                await sleep(sortSpeed);
            }

            while (j >= 0 && randArr[j].value > key) {

                randArr[j + 1].isSwitch = true;
                randArr[j].isCompared = true
                if (j === i - 1) {
                    randArr[j].isCompared = false
                    randArr[j].isSorted = true
                }
                setArray(randArr.slice())

                await sleep(sortSpeed);

                randArr[j + 1].isSwitch = false;
                randArr[j].isCompared = false
                randArr[j].isSorted = false
                setArray(randArr.slice())

                randArr[j + 1].value = randArr[j].value;
                randArr[j].value = key
                j = j - 1;
            }

            randArr[i].isSorted = false
            setArray(randArr.slice())
        }

        for (let i = arraySize - 1; i >= 0; i--) {
            randArr[i].isSorted = true
            setArray(randArr.slice())
            await sleep(0);
        }
        setArray(randArr.slice())
        setStart(false)
    }

    //HEAPSORT /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\


    async function maxHeap(input, i) {

        const left = 2 * i + 1
        const right = 2 * i + 2
        let max = i

        input[i].isCompared = false

        if ((left < tempLen)) {
            input[left].isSwitch = false
            if (input[left].value > input[max].value) {
                max = left
            }
        }
        if (right < tempLen) {
            input[right].isSwitch = false

            if (input[right].value > input[max].value) {
                max = right
            }
        }
        if (max != i) {

            [input[i], input[max]] = [input[max], input[i]]
            maxHeap(input, max)
        }
    }

    async function heapSort(input) {

        tempLen = input.length
        let heaped = false
        let temp

        for (let i = Math.floor(tempLen / 2); i >= 0; i = i - 1) {

            input[i].isCompared = true
            if (2 * i + 2 < tempLen) {
                input[2 * i + 2].isSwitch = true
            }
            if (2 * i + 1 < tempLen) {
                input[2 * i + 1].isSwitch = true
            }
            setArray(input.slice())

            await sleep(sortSpeed)
            maxHeap(input, i)
            setArray(input.slice())

        }

        heaped = true

        if (heaped) {

            for (let i = arraySize - 1; i > 0; i--) {

                input[i].isSwitch = true
                input[0].isCompared = true
                setArray(input.slice())

                temp = input[0]
                input[0] = input[i]
                input[i] = temp
                // [input[0], input[i]] = [input[i], input[0]]

                await sleep(sortSpeed)

                setArray(input.slice())
                await sleep(sortSpeed)
                input[0].isSwitch = false
                input[i].isCompared = false


                tempLen = tempLen - 1

                input[i].isSorted = true
                if (i === 1) { input[0].isSorted = true }
                setArray(input.slice())

                await sleep(sortSpeed)

                input[0].isCompared = true
                if (2 < tempLen) {
                    input[2].isSwitch = true
                }
                if (1 < tempLen) {
                    input[1].isSwitch = true
                }
                setArray(input.slice())
                await sleep(sortSpeed)
                maxHeap(input, 0)
                setArray(input.slice())
                await sleep(sortSpeed)

            }


        }
        setStart(false)
    }

    //MERGESORT -_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_


    function mergeSort(arr, l, r) {
        if (l < r) {

            let m = Math.floor((l + r) / 2);

            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);

            merge(arr, l, m, r);
        }

    }

    function merge(arr, l, m, r) {
        let i, j, k;
        let n1 = m - l + 1;
        let n2 = r - m;

        let L, R

        L = arr.slice(l, l + n1)
        R = arr.slice(m + 1, m + 1 + n2)

        i = 0; // Initial index of first subarray 
        j = 0; // Initial index of second subarray 
        k = l; // Initial index of merged subarray 
        while (i < n1 && j < n2) {
            if (L[i].value <= R[j].value) {
                animationArr.push({ changedIdx: k, length: L[i].value, isCompared: true })

                arr[k] = L[i];
                i++;
            }
            else {
                animationArr.push({ changedIdx: k, length: R[j].value, isCompared: true })
                arr[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            animationArr.push({ changedIdx: k, length: L[i].value, isCompared: true })
            arr[k] = L[i];
            i++;
            k++;
        }
        while (j < n2) {
            animationArr.push({ changedIdx: k, length: R[j].value, isCompared: true })

            arr[k] = R[j];
            j++;
            k++;
        }
    }



    function animateSort() {
        let i = 0;
        let tempArr = array.slice();
        // console.log(animationArr)

        let intervalId = setInterval(() => {
            if (i == animationArr.length - 1) {
                clearInterval(intervalId)
                tempArr[tempArr.length - 1].isCompared = false
                tempArr[tempArr.length - 1].isSorted = true
                setArray(tempArr.slice())

                let j = tempArr.length - 1
                let intervalId2 = setInterval(() => {
                    if (j == 0) {
                        clearInterval(intervalId2)
                    }
                    tempArr[j].isCompared = false
                    tempArr[j].isSorted = true
                    setArray(tempArr.slice())
                    j--;
                }, [sortSpeed])
                setStart(false)
            }

            if (i >= animationArr.length - tempArr.length) {
                tempArr[animationArr[i].changedIdx].isSorted = true
                setArray(tempArr.slice())
            }

            if (i != 0) {
                tempArr[animationArr[i - 1].changedIdx].isCompared = false
            }

            tempArr[animationArr[i].changedIdx].value = animationArr[i].length
            tempArr[animationArr[i].changedIdx].isCompared = animationArr[i].isCompared

            setArray(tempArr.slice())
            i++;
        }, [sortSpeed])



    }

    //QUICKSORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    function quickSort(arr, low, high) {

        if (low < high) {
            // pivot = right;
            let partitionIndex = partition(arr, low, high);
            animationArr.push({ changedIdx: partitionIndex, length: arr[partitionIndex].value, isSorted: true, isCompared: false })


            //sort left and right
            quickSort(arr, low, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, high);
        } else if (low == high) {
            animationArr.push({ changedIdx: low, length: arr[low].value, isSorted: true, isCompared: false })

        }
        // return arr;
    }

    function partition(arr, low, high) {
        let pivot = arr[high].value
        let i = low - 1
        let temp

        animationArr.push({ changedIdx: high, length: arr[high].value, isCompared: true })

        for (let j = low; j < high; j++) {
            animationArr.push({ changedIdx: j, length: arr[j].value, isCompared: true, isSwitch: false })

            if (arr[j].value < pivot) {
                i++
                // animationArr.push({ changedIdx: i, length: arr[i].value, isCompared: false, isSorted: false, isSwitch: true })

                if (i != j) {

                    animationArr.push({ changedIdx: i, length: arr[i].value, isCompared: false, isSorted: false, isSwitch: true })
                    // animationArr.push({ changedIdx: j, length: arr[j].value, isSorted: false, isCompared: true })

                    animationArr.push({ changedIdx: i, length: arr[j].value, isSorted: false, isSwitch: false, isCompared: false })
                    animationArr.push({ changedIdx: j, length: arr[i].value, isSorted: false, isCompared: false, isSwitch: false })

                    temp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = temp
                }

                // animationArr.push({ changedIdx: i, length: arr[j].value, isCompared: true })
                // [arr[i], arr[j]] = [arr[j], arr[i]]

            }

            animationArr.push({ changedIdx: j, length: arr[j].value, isCompared: false, isSwitch: false })


        }
        animationArr.push({ changedIdx: i + 1, length: arr[i + 1].value, isSwitch: false, isCompared: true, isSorted: false })
        animationArr.push({ changedIdx: high, length: arr[high].value, isSwitch: true, isCompared: false, isSorted: false })

        // animationArr.push({ changedIdx: i + 1, length: arr[i + 1].value, isSwitch: true })
        animationArr.push({ changedIdx: i + 1, length: arr[high].value, isSwitch: false, isCompared: false, isSorted: true })
        animationArr.push({ changedIdx: high, length: arr[i + 1].value, isSwitch: false, isCompared: false, isSorted: false })

        temp = arr[i + 1]
        arr[i + 1] = arr[high]
        arr[high] = temp

        // [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

        return (i + 1)
    }

    function quickAnimate() {
        let i = 0;
        let tempArr = array.slice();

        let intervalId = setInterval(() => {
            if (i >= animationArr.length - 1) {
                clearInterval(intervalId)
            }
            console.log(animationArr[i])
            tempArr[animationArr[i].changedIdx].value = animationArr[i].length
            tempArr[animationArr[i].changedIdx].isSorted = animationArr[i].isSorted
            tempArr[animationArr[i].changedIdx].isCompared = animationArr[i].isCompared
            tempArr[animationArr[i].changedIdx].isSwitch = animationArr[i].isSwitch

            // tempArr[animationArr[i].changedIdx].isCompared = animationArr[i].isCompared
            // tempArr[animationArr[i].changedIdx].isSorted = animationArr[i].isSorted
            setArray(tempArr.slice())

            // tempArr[animationArr[i].changedIdx].isCompared = false


            i++;
        }, [sortSpeed])


    }


    //__________________________________________________________
    function startSort() {
        if (!start) {
            setStart(true)

            if (sortType === "bubble") {
                bubbleSort()
            } else if (sortType === "selection") {
                selectionSort()
            } else if (sortType === "insertion") {
                insertionSort()
                // setStart(false)

            } else if (sortType === "heap") {
                const input = array.slice()
                heapSort(input)
            } else if (sortType === "merge") {
                setStart(true)
                let mergedArr = array.slice()
                mergeSort(mergedArr, 0, mergedArr.length - 1)
                animateSort()
                // setStart(false)
            }
            else if (sortType === "quick") {
                let quickArr = array.slice()
                animationArr = []
                quickSort(quickArr, 0, quickArr.length - 1);
                quickAnimate()
                // setArray(quickArr.slice())
                setStart(false)

            }


        }
    }

    function stopSort() {
        setStart(false)
        window.location.reload();
        // randomizeArray()
        // setArraySize(50)
    }


    return (
        <Context.Provider value={{ array, arraySize, setArraySize, setArray, start, setStart, startSort, stopSort, sortSpeed, setSortSpeed, sortType, setSortType, randomizeArray }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }