module.exports = function (app, sendSuccessResponse, sendError,urlencodedParser, jsonParser,VerifyToken) {
    var mongoose = require('mongoose'); 
    var Items = require('../models/Items');
    var jwt = require('jsonwebtoken'); 
    var config = require('../config');

    app.get('/api/itemlist', function (req, res) { 
        Items.find({}, function (err, result) {
            if (err)
                sendError(err, res);
            else
                sendSuccessResponse(result, '', res);
        });       
    });  
    app.get('/api/getItem/:_id', function (req, res) { 
        var Id = req.params._id;
        Items.find({ _id: Id }, function (err, result) {
            if (err)
                sendError(err, res);
            else
                sendSuccessResponse(result, '', res);
        });         
    });   
    // Update
    app.put('/api/updateRecord', jsonParser, function (req, res) {
        if (req.body != null && req.body != undefined) {

            if (req.body._id != null && req.body._id != undefined && req.body._id != '') {

                var updateItems = new Items();

                updateItems._id = req.body._id;
                updateItems.Name = req.body.Name;
                updateItems.Designation=req.body.Designation;
                updateItems.Salary=req.body.Salary;

                Items.update({ "_id": req.body._id }, updateItems, function (err, result) {
                    if (err != null) {
                        sendError(err, res);
                    }
                    else {
                            sendSuccessResponse(result, 'Updated Successfully', res);                        
                    }
                });
            }
            else {
                sendError({ message: 'For update item _id is required' }, res);
            }

        } else {
            sendError({ message: 'Request body is null' }, res);
        }
    }); 

    // Post Api
    app.post('/api/insertRecord', jsonParser, function (req, res) {
        if (req.body != null && req.body != undefined) {
            var newItem = new Items({
                _id: new mongoose.Types.ObjectId,
                Name: req.body.Name,
                Designation:req.body.Designation,
                Salary:req.body.Salary,
            });

            newItem.save(function (err, result) {
                if (err != null) {
                    sendError(err, res);
                }
                else {
                    if (result != null) {
                        sendSuccessResponse(result, 'Added Successfully', res);
                    }
                    else {
                        sendError({ message: 'Failed to save User Info' }, res);
                    }
                }
            });
        } else {
            sendError({ message: 'Request body is null' }, res);
        }
    });

    // Delete 
    app.delete('/api/deleteRecord/:_id', function (req, res) {
        var Id = req.params._id;
        Items.findOneAndDelete({ _id: Id }, function (err, result) {
            if (err)
                sendError(err, res);
            else
                sendSuccessResponse(result, 'Deleted Successfully', res);
        });
    });

    // Login
    app.post('/api/login', jsonParser, function (req, res) {
        var name = req.body.Name;
        Items.find({ "Name" : name }, function (err, result) {
            if (err != null) {
                sendError(err, res);
            } else {
                if (result != null) {
                    var count = result.length;
                    if (count > 0) {
                        console.log(result);
                        var token = jwt.sign({ id: result[0]._id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        let response = {
                            status: 200,
                            data: result[0],
                            token: token,
                            message: 'User login Successfully'
                        };
                        res.status(200).json(response);
                    
                    }           
                    else {
                        sendError({ message: 'No user found' }, res);
                        console.log("Login Failed");
                    }
                }
                else {
                    sendError({ message: 'No user found with this details' }, res);
                }
            }
        })
    });
}
