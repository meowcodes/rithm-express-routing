const express = require('express');
const ExpressError = require('./expressError');
const { mean, median, mode } = require('./operations');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/:operation", function(req, res, next){
    try {
        // handle error if input missing
        if(!req.query.nums){
            throw new ExpressError("Inputs are required.", "400")
        }

        const nums = req.query.nums.split(',').map(Number);

        // handle error if input invlid
        if(!nums.every(Number.isInteger)){
            throw new ExpressError("Inputs should be numbers.", "400")
        }

        const operation = req.params.operation;
        let value;
        
        // send mean if invalid operation param given
        switch(operation) {
            case "median":
                value = median(nums);
                break;
            case "mode":
                value = mode(nums);
                break;
            default:
                value = mean(nums);
        }
    
        return res.json({response: { operation, value }});
    }catch(err) {
        return next(err);
    }
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

// start server
app.listen(3000, function(){
    console.log('listening on 3000')
})