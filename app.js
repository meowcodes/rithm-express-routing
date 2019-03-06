const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get("/mean", function(req, res, next){
//     const nums = req.query.nums.split(',').map(Number);

//     let mean = nums.reduce((a, b) => a + b, 0) / nums.length;

//     return res.json({response: {
//                         operation: "mean",
//                         value: mean
//                         }
//                     });
// });

function mean(arr){
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

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

app.get("/:operation", function(req, res, next){
    const nums = req.query.nums.split(',').map(Number);
    const operation = req.params.operation;

    let value;

    if(operation === "mean"){
        value = mean(nums);
    }
    else if(operation === "median"){
        nums.sort((a, b) => a - b);
        if(nums.length % 2 === 1){
            value = nums[Math.floor(nums.length / 2)];
        }
        else{
            value = mean([nums[nums.length / 2], nums[nums.length / 2 - 1]]);
        }
    }
    else if(operation === "mode"){
            value = mode(nums);
    }

    return res.json({response: {
                        operation,
                        value
                        }
                    });
})



// 404 handler
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});

// generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;

    // set the status and alert the user
    return res.status(status).json({
        error: {
        message: err.message,
        status: status
        }
    });
});

// strat server
app.listen(3000, function(){
    console.log('We made it to port 3000!')
})