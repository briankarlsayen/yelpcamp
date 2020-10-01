var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comments")
var data = [
    {
        name: "Calaguas Island, Bicol",
       image: "https://static.tripzilla.com/thumb/8/1/54657_700x.jpg",
       description: "The Mahabang Buhangin Beach in Calaguas Island can compete with Boracay’s white sands, but it’s less crowded. Need a place where you can truly enjoy privacy with your special someone? This is it!"
    },
    {
        name: "Nagsasa Cove, Zambales",
        image: "https://static.tripzilla.com/thumb/8/2/54658_700x.jpg",
        description: "If you don’t have a lot of time to go somewhere far, Nagsasa Cove is a great option close to Manila. It’s frequented by other campers but the awesome view from the beach and the mountains close by make it extremely romantic."
    },
    {
        name: "Anawangin Cove, Zambales",
        image: "https://static.tripzilla.com/thumb/8/3/54659_700x.jpg",
        description: "Another beautiful campsite you can get away to in Zambales is Anawangin Cove. The beach used to be rocky but it has been dumped with mountains of volcanic ash from the Mt. Pinatubo eruption. It turned out to be quite beautiful, though. And you also get to camp under a forest of agoho trees which pretty much look like pine trees."
    }
];

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        }
            console.log("campgrounds removed")
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err){
                        console.log(err)
                    } else {
                        console.log("campground created")
                        Comment.create(
                            {
                               text: "wow nice nice nice",
                               author: "Juan"
                            },
                            function(err, comment){
                                if (err){
                                    console.log(err)
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("comment created")
                                }
                        });
                    }
                });
            });
    });
};

module.exports = seedDB;