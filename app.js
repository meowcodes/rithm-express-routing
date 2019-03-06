const express = require('express');
const ExpressError = require('./expressError');
const { mean, median, mode } = require('./operations');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/:operation", function(req, res, next){

    console.log(req.params, req.query)
    try {
        if(!req.query.nums){
            throw new ExpressError("Nums are required.", "400")
        }
        const nums = req.query.nums.split(',').map(Number);

        if(!nums.every(Number.isInteger)){
            throw new ExpressError("Nums should be numbers.", "400")
        }

        const operation = req.params.operation;
    
        let value;
    
        if(operation === "mean"){
            value = mean(nums);
        }
        else if(operation === "median"){
            value = median(nums);
        }
        else if(operation === "mode"){
                value = mode(nums);
        }
    
        return res.json({response: {
                            operation,
                            value
                            }
                        });
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

// strat server
app.listen(3000, function(){
    console.log('We made it to port 3000!')
})