var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware")
//create new campground form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//show campgrounds
router.get("/", function(req, res){
    //get campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err)
        } else {
            res.render("campgrounds/campground", {campgrounds: allCampgrounds});
        }
    });
});
//campground logic
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data from form then add to database
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    //create new campground save to database
    Campground.create(newCampground, function(err, newlyCampground){
        if(err){
            console.log(err);
        }else{
            //redirect to campground page
            req.flash("success", "Successfully added new campground")
            res.redirect("/campgrounds");
        }
    });

});
//show campground details
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
     Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
     });
});

//update campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds")
        }
    });
});

module.exports = router;