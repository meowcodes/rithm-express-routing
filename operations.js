/** returns the mean of nums in array */
function mean(arr){
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

/** returns the mean of nums in array */
function median(arr){
    arr.sort((a, b) => a - b);
    
    if(arr.length % 2 === 1){
        value = arr[Math.floor(arr.length / 2)];
    }
    else{
        value = mean([arr[arr.length / 2], arr[arr.length / 2 - 1]]);
    }
    return value;
}

/** returns the mode of nums in array */
function mode(arr){
    let counter = {};
    let max = 0;
    let mode;

    for(ele of arr){
        counter[ele] = counter[ele] + 1 || 1;
        if(counter[ele] > max){
            max = counter[ele];
            mode = ele;
        }
    }

    return mode;
}


module.exports = {mean, median, mode}