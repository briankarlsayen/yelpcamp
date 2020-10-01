var express     = require("express");
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    flash       = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campgrounds"),
    User        = require("./models/user"),
    Comment     = require("./models/comments"),
    seedDB      = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

//To fix all deprecation warnings
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

//connect to database
//mongoose.connect("mongodb://localhost:27017/yelp_camp_v12");
mongoose.connect("mongodb+srv://blu3fire89:0089@cluster0.eygh2.mongodb.net/<dbname>?retryWrites=true&w=majority");
//mongodb+srv://blu3fire89:0089@cluster0.eygh2.mongodb.net/<dbname>?retryWrites=true&w=majority

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
/*seedDB();*/ //seed the database

//====================//
//===PASSPORT AUTH====//
//====================//
app.use(require("express-session")({
    secret: "I'm the real Ironman",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use( "/campgrounds", campgroundRoutes);

//dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});