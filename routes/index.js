const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const {ensureAuthenticated} = require('../config/auth');
//user model
const user = require('../models/User');
const User = require('../models/User');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//routes
router.get('/', function(req, res){
    if(req.isAuthenticated){
        res.render('index');
    }
    else{
        res.render('home')
    }


});

router.get('/signup', function(req, res){
    res.render('signup');
});

router.get('/gettingstartedpage', function(req,res){
    res.render('gettingstartedpage');
});

router.get('/login', (req,res) =>{
    res.render('login');
});

router.get('/home', ensureAuthenticated, (req, res) =>{
    res.render('home', {
        user: req.user
    });
});
router.get('/classdir', ensureAuthenticated, (req,res) =>{
    res.render('classdir', {
        user: req.user
    });
});

router.get('/pastcourses', ensureAuthenticated, (req,res) =>{
    res.render('pastcourses', {
        user:req.user
    });
});
router.get('/editcourse', ensureAuthenticated, (req,res) =>{
    res.render('editcourse',{
        user: req.user
    });
});
router.get('/currentcourse', ensureAuthenticated, (req,res) =>{
    res.render('currentcourse',{
        user:req.user
    });
});
router.get('/editcurrentcourse', ensureAuthenticated, (req,res) =>{
    res.render('editcurrentcourse', {
        user: req.user
    });
});
router.get('/optionii', ensureAuthenticated, (req,res) =>{
    res.render('optionii', {
        user:req.user
    });
});
router.get('/gradecalc', ensureAuthenticated, (req,res) =>{
    res.render('gradecalc', {
        user:req.user,
        requiredaverage: 0
    });
});
router.get('/gpacalc', ensureAuthenticated, (req,res) =>{
    res.render('gpacalc',{
        user:req.user
    } );
});
//finalschedule logic
router.get('/finalschedule', ensureAuthenticated, (req,res) =>{
    //Language Arts Grad Requirement Check
    var checklanguagearts = false
    var languageartscourses = ['Language Arts I', 'Language Arts I Honors', 'Language Arts II', 'Language Arts II Honors', 'Language Arts III', 'Language Arts III Honors', 
    'Language Arts IV', 'Language Arts IV Honors', 'AP Language and Composition', 'AP Literature and Composition'];
    var yourcourses = [req.user.eighthgradecourse, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, 
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var languageartscount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(languageartscourses.includes(yourcourses[i])){
            languageartscount++;
        }
    }
    if(languageartscount<4){
        checklanguagearts = false
    }else{
        checklanguagearts = true;
   }


       //Math Grad Requirement Check

       var checkmath = false
    var mathcourses = ['Algebra I', 'Geometry', 'Geometry Honors', 'Geometry Honors & Accelerated', 'Algebra II', 'Advanced Algebra II', 'Advanced Algebra II Honors', 'Algebra & Trigonometry', 'Pre-Calculus',
                        'Pre-Calculus Honors', 'Pre-Calculus Honors & Accelerated', 'Calculus Honors', 'AP Calculus AB', 'AP Calculus BC', 'Multivariable Calculus Honors', 'Statistics', 'AP Statistics'];
    var yourcourses = [req.user.eighthgradecourse, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, 
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var mathcount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(mathcourses.includes(yourcourses[i])){
            mathcount++;
        }
    }
    if(mathcount<4){
        checkmath = false
    }else{
        checkmath = true;
   }
 
       //science Grad Requirement Check
 
       var checkscience = false
    var sciencecourses = ['Biology', 'Biology Honors', 'AP Biology', 'Chemistry', 'Chemistry Honors', 'AP Chemistry', 'Physics', 'Physics Honors', 'AT Phyiscs', 'Environmental Science',
                            'AP Environmental Science', 'Forensic Sciences', 'Human Anatomy & Phisiology', 'Descriptive Astronomy', 'Genetics'];
    var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var sciencecount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(sciencecourses.includes(yourcourses[i])){
            sciencecount++;
        }
    }
    if(sciencecount<3){
        checkscience = false
    }else{
        checkscience = true;
   }
       //history Grad Requirement Check
 
       var checkhistory = false
    var historycourses = ['World History', 'World History Honors', 'American Studies I', 'American Studies I Honors', 'American Studies II', 'American Studies II Honors', 'AP United States History'];
    var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var historycount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(historycourses.includes(yourcourses[i])){
            historycount++;
        }
    }
    if(historycount<3){
        checkhistory = false
    }else{
        checkhistory = true;
   }
 

       //worldlanguage Grad Requirement Check
 
       var checkworldlanguage = false
    var worldlanguagecourses = ['An Intro to Spanish Communication & Culture', 'Spanish Language & Cultural Study', 'Spanish 1', 'Spanish 2', 'Spanish 3', 'Spanish 3 Honors', 'Spanish 4', 'Spanish 4 Honors', 'Spanish 5', 
    'Conversations in Spanish', 'Honors Spanish Cultural Studies', 'AP Spanish Language', 'AP Spanish Literature','French 1', 'French 2', 'French 3', 'French 3 Honors', 'French 4', 'French 4 Honors', 'French 5', 'AP French Language',
    'German 1', 'German 2', 'German 3', 'German 4', 'German 5 Honors', 'AP German Language', 'Chinese 1', 'Chinese 2', 'Chinese 3', 'Chinese 4', 'Chinese 5 Honors', 'AP Chinese Language'];
    var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var worldlanguagecount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(worldlanguagecourses.includes(yourcourses[i])){
            worldlanguagecount++;
        }
    }
    if(worldlanguagecount<2){
        checkworldlanguage = false
    }else{
        checkworldlanguage = true;
   }
 

       //art Grad Requirement Check
 
       var checkart = false
    var artcourses = ['Art Foundation', 'Drawing & Painting I', 'Drawing & Painting II', 'Sculpture & Ceramics', 'Printmaking', 'Computer Art & Design I', 'Computer Art & Design II', 'Photography', 'AP Studio Art', 'AP Art History', 'Music Theory I', 'Music Theory II', 'Music Technology', 'Chorale', 'Concert Choir','Chamber Choir', 'Concert Band', 'Symphonic Band', 'Wind Ensemble', 'String Ensemble', 'Symphony Orchestra', 'Philharmonic Orchestra','Theatre Arts'];
    var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var artcount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(artcourses.includes(yourcourses[i])){
            artcount++;
        }
    }
    if(artcount<1){
        checkart = false
    }else{
        checkart = true;
   }
 
       //century Grad Requirement Check
 
       var checkcentury = false
    var centurycourses = ['Accounting', 'Marketing', 'Digital Communication', 'Digital Media', 'Introduction to Computer Programming', 'AP Computer Science A', 'AP Computer Science Principles', 'Advanced Topics in Computer Science Honors', 'Creative Design', 'Advanced Creative Design', 'Culinary Arts', 'International Foods', 'Creative Cooking & Catering', 'Child Growth & Development', 'Youth Teaching Youth', 'Principles of Engineering', 'Engineering Design & Fabrication', 'Graphic Engineering', 'Robotics Engineering',
    'International Business and Cultures', 'Legal and Political Experiences', 'Economics/Social Problems in American Society', 'AP Microeconomics', 'Fundamentals of Sports Medicine', 'Broadcast Writing', 'Advanced Broadcast Writing', 'TV Production', 'Journalism', 'Advanced Journalism Honors' ];
    var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var centurycount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(centurycourses.includes(yourcourses[i])){
            centurycount++;
        }
    }
    if(centurycount<1){
        checkcentury = false
    }else{
        checkcentury = true;
   }
 
       //financial Grad Requirement Check
 
       var checkfinancial = false
    var financialcourses = ['International Business and Cultures', 'Economics/Social Problems in American Society', 'Financial Literacy', 'AP Microeconomics'];
    var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
        req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
         
    var financialcount = 0;
    for(var i =0;  i<yourcourses.length; i++){
        if(financialcourses.includes(yourcourses[i])){
            financialcount++;
        }
    }
    if(financialcount<1){
        checkfinancial = false
    }else{
        checkfinancial = true;
   }
 
   //prerequisite check

   //languageartsIIcheck
   var yourcourses = [req.user.eighthgradecourse, req.user.optionII1, req.user.class1, req.user.class2, req.user.class3, req.user.class4, req.user.class5, req.user.class6, req.user.optionII2, req.user.class7, req.user.class8, req.user.class9, req.user.class10, req.user.class11, req.user.class12, req.user.optionII3,
    req.user.class13, req.user.class14, req.user.class15, req.user.class16, req.user.class17, req.user.class18, req.user.optionII4, req.user.class19, req.user.class20, req.user.class21, req.user.class22, req.user.class23, req.user.class24];
    var la2honorscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Language Arts II' || yourcourses[i] =='Language Arts II Honors'){
            la2honorscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Language Arts I' || yourcourses[j] =='Language Arts I Honors'){
                    la2honorscheck = true;
                }
            }
        }
    }


    //languageartsIIIcheck
    var la3check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Language Arts III' || yourcourses[i] == 'Language Arts III Honors'|| yourcourses[i] == 'AP Language and Composition'){
            la3check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Language Arts II' || yourcourses[j] == 'Language Arts II Honors'){
                    la3check = true;
                }
            }
        }
    }
    //languageartsIVcheck
    var la4check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Language Arts IV ' || yourcourses[i] =='Language Arts IV Honors' || yourcourses[i] =='AP Literature and Composition'){
            la4check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Language Arts III ' ||yourcourses[j] == 'Language Arts III Honors' || yourcourses[j] =='AP Language and Composition'){
                    la4check = true;
                }
            }
        }
    }

    //Geometry check
    var geometrycheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Geometry'){
            geometrycheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Algebra II' ||yourcourses[j] == 'Advanced Algebra II' ||yourcourses[j] == 'Advanced Algebra II Honors'){
                    geometrycheck = true;
                }
            }
        }
    }

    //Geometry honorscheck
    var geometryhnscheck = true;
    for(var i = (user.grade-8) * 6; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Geometry Honors'){
            geometryhnscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Advanced Algebra II' ||yourcourses[j] == 'Advanced Algebra II Honors'){
                    geometryhnscheck = true;
                }
            }
        }
    }
    //algebra & trigcheck
    var algtrigcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Algebra and Trigonometry'){
            algtrigcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Geometry '){
                    algtrigcheck = true;
                }
            }
        }
    }
    //precalccheck
    var precalccheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Pre-calculus'){
            precalccheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Geometry' ||yourcourses[j] == 'Geometry Honors' || yourcourses[j] =='Algebra and Trigonometry'){
                    precalccheck = true;
                }
            }
        }
    }
    //precalchonorscheck
    var precalchonorscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Pre-calculus Honors'){
            precalchonorscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Geometry' || yourcourses[j] =='Geometry Honors'){
                    precalchonorscheck = true;
                }
            }
        }
    }
    //Calculus Honors
    var calchonorscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Calculus Honors'){
            calchonorscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Pre-calculus' || yourcourses[j] =='Pre-calculus Honors'){
                    calchonorscheck = true;
                }
            }
        }
    }

    //AP Calculus AB
    var APcalcABcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Calculus AB'){
            APcalcABcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Pre-calculus' || yourcourses[j] =='Pre-calculus Honors' || yourcourses[j] =='Calculus Honors'){
                    APcalcABcheck = true;
                }
            }
        }
    }
    //AP Calculus BC
    var APcalcBCcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Calculus BC'){
            APcalcBCcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'AP Calculus AB'||yourcourses[j] == 'Calculus Honors' || yourcourses[j] =='Pre-calculus Honors & Accelerated'|| yourcourses[j] =='Pre-calculus Honors' ){
                    APcalcBCcheck = true;
                }
            }
        }
    }

    //Multivariable Calc
    var Multivariablecheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Multivariable Calculus Honors'){
            Multivariablecheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'AP Calculus AB'||yourcourses[j] == 'AP Calculus BC'){
                    Multivariablecheck = true;
                }
            }
        }
    }
    //Statistics
    var statscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Statistics'){
            statscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Geometry' || yourcourses[j] =='Geometry Honors'){
                    statscheck = true;
                }
            }
        }
    }
    //AP Statistics
    var APstatscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Statistics'){
            APstatscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Pre-calculus'||yourcourses[j] =='Pre-calculus Honors'){
                    APstatscheck = true;
                }
            }
        }
    }
    //AP Biology
    var APBiologycheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Biology'){
            APBiologycheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Biology'|| yourcourses[j] =='Biology Honors'){
                    for(var a = 0; a<i;a++){
                        if(yourcourses[a] == 'Chemistry' || yourcourses[a] =='Chemistry Honors'){
                            APBiologycheck = true;
                        }
                    }
                }
            }
        }
    }

    //AP Chemistry
    var APChemcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Chemistry'){
            APChemcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Chemistry' ||yourcourses[j] == 'Chemistry Honors'){
                    APChemcheck = true;
                }
            }
        }
    }

    //Physics
    var physicscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Physics'){
            physicscheck = false;
            var index = Math.floor(i/6) +1;
            for(var j = 0; j<index ; j++){
                if(yourcourses[j] == 'Algebra II'|| yourcourses[j] =='Advanced Algebra II' || yourcourses[j] =='Advanced Algebra II Honors'){
                    physicscheck = true;
                }
            }
        }
    }

    //PhysicsHonors
        var physicshnscheck = true;
        for(var i = 0; i<yourcourses.length; i++){
            if(yourcourses[i] ==('Physics Honors')){
                physicshnscheck=false;
                var index = (Math.floor(i/6) +1) * 6;
                for(var j = 0;j<index; j++){
                    if(yourcourses[j] == "Pre-calculus" || yourcourses[j] =="Pre-calculus Honors" || yourcourses[j] =="Calculus Honors"){
                        physicshnscheck=true;
                    }
                }
            }
        }
    //AT Physics
    var ATPhysicscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Advanced Topics in Physics Honors'){
            ATPhysicscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == ('Physics Honors' || yourcourses[j] =='Physics')){
                    for(var a = 0; a<(req.user.grade-8) * 6; a++){
                        if(yourcourses[a] == 'Calculus Honors' ||yourcourses[a] == 'AP Calculus AB' || yourcourses[a] =='AP Calculus BC'){
                            ATPhysicscheck = true;
                        }
                    }
                    
                }
            }
        }
    }
    //Human Anatomy
    var humananatomycheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == ('Human Anatomy & Physiology')){
            humananatomycheck = false;

            for(var j = 0; j<i; j++){
                if(yourcourses[j] ===('Biology' || yourcourses[j] =='Biology Honors')){
                    for(var a = 0; a<i; a++){
                        if(yourcourses[a] == ('Chemistry'|| yourcourses[a] =='Chemistry Honors')){
                            humananatomycheck = true;
                        }
                    }
                }
            }
        }
    }


    //AP Environmental Science
    var APEnvironmentalcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Environmental Science'){
            APEnvironmentalcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] =='Biology' || yourcourses[j] =='Biology Honors'){
                    for(var a = 0; a<i; a++){
                        if(yourcourses[a] == 'Chemistry'|| yourcourses[a] =='Chemistry Honors'){
                            APEnvironmentalcheck = true;
                        }
                    }
                }
            }
        }
    }

    //ASI

    for(var i = 0; i<yourcourses.length; i++){
        var ASIcheck = true;
        if(yourcourses[i] == 'American Studies I' || yourcourses[i] =='American Studies I Honors'){
            ASIcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'World History' ||yourcourses[j] == 'World History Honors'){
                    ASIcheck = true;
                }
            }
        }

    }
    
    //ASII
    var ASIIcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'American Studies II' || yourcourses[i] =='American Studies II Honors' || yourcourses[i] =='AP United States History' ||yourcourses[i] =='AP European History' || yourcourses[i] =='AP American Government' || yourcourses[i] =='AP Comparative Government and Global Studies' || yourcourses[i] =='AP Psychology' || yourcourses[i] =='AP Art History'){
            ASIIcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'American Studies I' || yourcourses[j] =='American Studies I Honors'){
                    ASIIcheck = true;
                }
            }
        }
    }
    //Spanish Language & Cultural Study
    var Spanishlanguageculturestudycheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Spanish Language & Cultural Study'){
            Spanishlanguageculturestudycheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'An Intro to Spanish Communication & Culture'){
                    Spanishlanguageculturestudycheck = true;
                }
            }
        }
    }
    //Spanish 4
    var Spanish4check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Spanish 4' || yourcourses[i] =='Spanish 4 Honors'){
            Spanish4check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Spanish 3' || yourcourses[j] =='Spanish 3 Honors'){
                    Spanish4check = true;
                }
            }
        }
    }
    //Spanish 5
    var Spanish5check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Spanish 5'){
            Spanish5check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Spanish 4' ||yourcourses[j] == 'Spanish 4 Honors'){
                    Spanish5check = true;
                }
            }
        }
    }
    //Conversations in Spanish
    var Conversationsinspanishcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Conversations in Spanish' ){
            Conversationsinspanishcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Spanish 5'){
                    Conversationsinspanishcheck = true;
                }
            }
        }
    }
    //Honors Spanish Cultural Studies
    var hnsspanishculturalstudiescheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Honors Spanish Cultural Studies'){
            hnsspanishculturalstudiescheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Spanish 5' || yourcourses[j] =='Spanish 4 Honors'){
                    hnsspanishculturalstudiescheck = true;
                }
            }
        }
    }
    //AP Spanish
    var APSpanishcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Spanish Language'){
            APSpanishcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Spanish 4 Honors' || yourcourses[j] =='Spanish 5 Honors' ||yourcourses[j] == 'Honors Spanish Cultural Studies'){
                    APSpanishcheck = true;
                }
            }
        }
    }
    //AP Spanish LIterature
    var APSpanishLitcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Spanish Literature' ){
            APSpanishLitcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'AP Spanish Language' ){
                    APSpanishLitcheck = true;
                }
            }
        }
    }
    //French 4
    var French4check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'French 4' || yourcourses[i] =='French 4 Honors'){
            French4check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'French 3' || yourcourses[j] =='French 3 Honors'){
                    French4check = true;
                }
            }
        }
    }
    //French 5
    var French5check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'French 5' ){
            French5check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'French 4' || yourcourses[j] =='French 4 Honors'){
                    French5check = true;
                }
            }
        }
    }
    //AP French Language
    var APFrenchcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP French Language'){
            APFrenchcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'French 4' || yourcourses[j] =='French 4 Honors'){
                    APFrenchcheck = true;
                }
            }
        }
    }
    //German 4 Honors
    var German4hnscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'German 4 Honors'){
            German4hnscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'German 3' ){
                    German4hnscheck = true;
                }
            }
        }
    }
    //German 5 Honors
    var German5hnscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'German 5 Honors'){
            German5hnscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'German 4 Honors' ){
                    German5hnscheck = true;
                }
            }
        }
    }
    //AP German Honors
    var APGermancheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP German Language'){
            APGermancheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'German 4 Honors' || yourcourses[j] =='German 5 Honors' ){
                    APGermancheck = true;
                }
            }
        }
    }

    //Chinese 4 Honors
    var Chinese4hnscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Chinese 4 Honors'){
            Chinese4hnscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Chinese 3' ){
                    Chinese4hnscheck = true;
                }
            }
        }
    }
    //Chinese 5 Honors
    var Chinese5hnscheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Chinese 5 Honors'){
            Chinese5hnscheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Chinese 4 Honors' ){
                    Chinese5hnscheck = true;
                }
            }
        }
    }
    //AP Chinese Honors
    var APChinesecheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Chinese Language'){
            APChinesecheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Chinese 4 Honors' || yourcourses[j] =='Chinese 5 Honors' ){
                    APChinesecheck = true;
                }
            }
        }
    }
    //Drawing & painting I
    var Drawingandpainting1check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Drawing & Painting I'){
            Drawingandpainting1check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Art Foundation' ){
                    Drawingandpainting1check = true;
                }
            }
        }
    }
    //Drawing & painting II
    var Drawingandpainting2check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Drawing & Painting II'){
            Drawingandpainting2check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Drawing & Painting I' ){
                    Drawingandpainting2check = true;
                }
            }
        }
    }
    //Computer Art & Design II
    var Computerartdesign2check = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Computer Art & Design II'){
            Computerartdesign2check = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Computer Art & Design I' ){
                    Computerartdesign2check = true;
                }
            }
        }
    }
    //AP Studio Art
    var APstudioartcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'AP Studio Art'){
            APstudioartcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Art Foundation' ){
                    for(var a = 0; a<i; a++){
                        if(yourcourses[a] =='Drawing & Painting I'){
                            for(var b = 0; b<i; b++){
                                if(yourcourses[b] == 'Drawing & Painting II'){
                                    APstudioartcheck = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //AP Computer Science
    var APcompscicheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == ('AP Computer Science A' || yourcourses[i] =='AP Computer Science Principles')){
            APcompscicheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == ('Introduction to Computer Programming' )){
                    APcompscicheck = true;
                }
            }
        }
    }
    //AT Comp Sci
    var ATcompscicheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Advanced Topics in Computer Science Honors' ){
            ATcompscicheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'AP Computer Science A' ){
                    for(var a = 0; a<i; a++){
                        if(yourcourses[a] == 'Algebra II' || yourcourses[a] =='Advanced Algebra II' || yourcourses[a] =='Advanced Algebra II Honors')
                        ATcompscicheck = true;
                    }
                }
            }
        }
    }
        //Engineering Design and Fabrication
        var Engineeringdesignfabricationcheck = true;
        for(var i = 0; i<yourcourses.length; i++){
            if(yourcourses[i] == 'Engineering Design and Fabrication' ){
                Engineeringdesignfabricationcheck = false;
                for(var j = 0; j<i; j++){
                    if(yourcourses[j] == 'Principles of Engineering' ){
                        Engineeringdesignfabricationcheck = true;
                    }
                }
            }
        }
    //Advanced Creative Design
    var advancedcreativedesigncheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Advanced Creative Design'){
            advancedcreativedesigncheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Creative Design' ){
                    advancedcreativedesigncheck = true;
                }
            }
        }
    }
    //Cooking
    var cookingcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == ('Creative Cooking and Catering'|| yourcourses[i] =='International Foods')){
            cookingcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == ('Culinary Arts' )){
                    cookingcheck = true;
                }
            }
        }
    }
     //Advanced Journalism Honors
     var advancedjouranlismhonorscheck = true;
     for(var i = 0; i<yourcourses.length; i++){
         if(yourcourses[i] == 'Advanced Journalism Honors'){
            advancedjouranlismhonorscheck = false;
             for(var j = 0; j<i; j++){
                 if(yourcourses[j] == 'Journalism' ){
                    advancedjouranlismhonorscheck = true;
                 }
             }
         }
     }
    //Music Theory II
    var musictheoryIIcheck = true;
    for(var i = 0; i<yourcourses.length; i++){
        if(yourcourses[i] == 'Music Theory II'){
            musictheoryIIcheck = false;
            for(var j = 0; j<i; j++){
                if(yourcourses[j] == 'Music Theory I' ){
                    musictheoryIIcheck = true;
                }
            }
        }
    }

    res.render('finalschedule', {
        user: req.user,
        checklanguagearts: checklanguagearts,
        languageartscount: languageartscount,
        checkmath:checkmath,
        mathcount:mathcount,
        checkscience:checkscience,
        sciencecount: sciencecount,
        checkhistory: checkhistory,
        historycount: historycount,
        checkworldlanguage: checkworldlanguage,
        worldlanguagecount: worldlanguagecount,
        checkart:checkart,
        artcount:artcount,
        checkcentury: checkcentury,
        centurycount: centurycount,
        checkfinancial: checkfinancial,
        financialcount: financialcount,
        la2honorscheck:la2honorscheck,
        la3check:la3check,
        la4check:la4check,
        la3check:la3check,
        la4check:la4check,
        geometrycheck:geometrycheck,
        geometryhnscheck:geometryhnscheck,
        algtrigcheck:algtrigcheck,
        precalccheck:precalccheck,
        precalchonorscheck:precalchonorscheck,
        calchonorscheck:calchonorscheck,
        APcalcABcheck:APcalcABcheck,
        APcalcBCcheck:APcalcBCcheck,
        Multivariablecheck:Multivariablecheck,
        statscheck:statscheck,
        APstatscheck:APstatscheck,
        APBiologycheck:APBiologycheck,
        APChemcheck:APChemcheck,
        physicscheck:physicscheck,
        physicshnscheck:physicshnscheck,
        ATPhysicscheck:ATPhysicscheck,
        humananatomycheck:humananatomycheck,
        APEnvironmentalcheck:APEnvironmentalcheck,
        ASIcheck:ASIcheck,
        ASIIcheck:ASIIcheck,
        Spanishlanguageculturestudycheck:Spanishlanguageculturestudycheck,
        Spanish4check:Spanish4check,
        Spanish5check:Spanish5check,
        Conversationsinspanishcheck:Conversationsinspanishcheck,
        hnsspanishculturalstudiescheck:hnsspanishculturalstudiescheck,
        APSpanishcheck:APSpanishcheck,
        APSpanishLitcheck:APSpanishLitcheck,
        French4check:French4check,
        French5check:French5check,
        APFrenchcheck:APFrenchcheck,
        German4hnscheck:German4hnscheck,
        German5hnscheck:German5hnscheck,
        APGermancheck:APGermancheck,
        Chinese4hnscheck:Chinese4hnscheck,
        Chinese5hnscheck:Chinese5hnscheck,
        APChinesecheck:APChinesecheck,
        Drawingandpainting1check:Drawingandpainting1check,
        Drawingandpainting2check:Drawingandpainting2check,
        Computerartdesign2check:Computerartdesign2check,
        APstudioartcheck:APstudioartcheck,
        APcompscicheck:APcompscicheck,
        ATcompscicheck:ATcompscicheck,
        Engineeringdesignfabricationcheck:Engineeringdesignfabricationcheck,
        advancedcreativedesigncheck:advancedcreativedesigncheck,
        cookingcheck:cookingcheck,
        advancedjouranlismhonorscheck:advancedjouranlismhonorscheck,
        musictheoryIIcheck:musictheoryIIcheck


    });



});
//routes for post routes
router.get('/10thgradepastcourse', ensureAuthenticated, (req,res) =>{
    res.render('10thgradepastcourse', {
        user:req.user
    });
});
router.get('/11thgradepastcourse', ensureAuthenticated, (req,res) =>{
    res.render('11thgradepastcourse', {
        user:req.user
    });
});
router.get('/9thgradecurrentcourse', ensureAuthenticated, (req,res) =>{
    res.render('9thgradecurrentcourse', {
        user:req.user
    });
});
router.get('/10thgradecurrentcourse', ensureAuthenticated, (req,res) =>{
    res.render('10thgradecurrentcourse', {
        user:req.user
    });
});
router.get('/11thgradecurrentcourse', ensureAuthenticated, (req,res) =>{
    res.render('11thgradecurrentcourse', {
        user:req.user
    });
});
//post request
router.post('/signup', (req, res) =>{ 
    const { name, email, password, password2, grade } = req.body;
    let errors = [];
    //check required fields
    if(!name  || !email || !password || !password2 || !grade){
        errors.push({msg: 'Please fill in all fields'});

    }
    //check passwords match
    if(password  !== password2){
        errors.push({msg: 'Passwords do not match'});
    }
    //check pass length
    if(password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'})
    }

    if(errors.length > 0){
        res.render('signup', {
            errors,
            name,
            email,
            password,
            password2,
            grade
        });
    }
        User.findOne({email: email})
        .then(user => {
            if(user){
                errors.push({ msg: 'email is already registered'});
                res.render('signup', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    grade
                }); 
            } else{
                const newUser = new User({
                    name,
                    email,
                    password,
                    password2,
                    grade
                });
                //hash password

                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        //set password to hashed 
                        newUser.password = hash;
                        //save user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'Welcome, ' + newUser.name + '! You are now registered.');
                            res.redirect('/gettingstartedpage')
                        })
                        .catch(err => console.log(err));
                }));
            }
        }); 
    }


);
//Handle Post for past courses
router.post('/10thgradepastcourse', ensureAuthenticated, (req,res) =>{
    const { class1, class2, class3, class4, class5, class6, grade1, grade2, grade3, grade4, grade5, grade6} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {class1: class1,
        class2: class2,
        class3: class3,
        class4: class4,
        class5: class5,
        class6: class6,
        grade1: grade1,
        grade2: grade2,
        grade3: grade3,
        grade4: grade4, 
        grade5: grade5,
        grade6: grade6,


     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/pastcourses'))
    .catch(err => console.log(err));
});
//Handle Post for 11th grade past courses
router.post('/11thgradepastcourse', ensureAuthenticated, (req,res) =>{
    const { class1, class2, class3, class4, class5, class6, 
        class7, class8, class9, class10, class11, class12, grade1, grade2, grade3, grade4, grade5, grade6, grade7, grade8, grade9, grade10, grade11, grade12} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {class1: class1,
        class2: class2,
        class3: class3,
        class4: class4,
        class5: class5,
        class6: class6,
        class7: class7,
        class8: class8,
        class9: class9,
        class10: class10,
        class11: class11,
        class12: class12,
        grade1: grade1,
        grade2: grade2,
        grade3: grade3,
        grade4: grade4, 
        grade5: grade5,
        grade6: grade6,
        grade7: grade7,
        grade8: grade8,
        grade9: grade9,
        grade10: grade10,
        grade11: grade11,
        grade12: grade12

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/pastcourses'))
    .catch(err => console.log(err));
});

//Handle Post for 9th grade current
router.post('/9thgradecurrentcourse', ensureAuthenticated, (req,res) =>{
    const { class1, class2, class3, class4, class5, class6} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {class1: class1,
        class2: class2,
        class3: class3,
        class4: class4,
        class5: class5,
        class6: class6

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/currentcourse'))
    .catch(err => console.log(err));
});

//Handle Post for 10th grade current
router.post('/10thgradecurrentcourse', ensureAuthenticated, (req,res) =>{
    const {class7, class8, class9, class10, class11, class12} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {
        class7: class7,
        class8: class8,
        class9: class9,
        class10: class10,
        class11: class11,
        class12: class12

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/currentcourse'))
    .catch(err => console.log(err));
});


//Handle Post for 11th grade current
router.post('/11thgradecurrentcourse', ensureAuthenticated, (req,res) =>{
    const {class12, class13, class14, class15, class16, class17, class18} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {
        class13: class13, 
        class14: class14, 
        class15: class15,
        class16: class16, 
        class17: class17,
        class18: class18

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/currentcourse'))
    .catch(err => console.log(err));
});
//Handle post for 8th grade final
router.post('/8thfinalschedule', ensureAuthenticated, (req,res) =>{
    const {class1, class2, class3, class4, class5, class6, class7, class8, class9, class10, class11, class12, class13, class14, class15, class16, class17, class18,
    class19, class20, class21, class22, class23, class24, optionII1, optionII2, optionII3, optionII4, eighthgradecourse} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {
            class1:class1,
            class2:class2,
            class3:class3,
            class4:class4,
            class5:class5,
            class6:class6,
            class7:class7,
            class8:class8,
            class9:class9,
            class10:class10,
            class11:class11,
            class12:class12,
            class13:class13,
            class14:class14,
            class15:class15,
            class16:class16,
            class17:class17,
            class18:class18,
            class19:class19,
            class20:class20,
            class21:class21,
            class22:class22,
            class23:class23,
            class24:class24,
            optionII1:optionII1,
            optionII2:optionII2,
            optionII3:optionII3,
            optionII4:optionII4,
            eighthgradecourse:eighthgradecourse

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/finalschedule'))
    .catch(err => console.log(err));
});

//Handle post for 9th grade final
router.post('/9thfinalschedule', ensureAuthenticated, (req,res) =>{
    const {class7, class8, class9, class10, class11, class12, class13, class14, class15, class16, class17, class18,
    class19, class20, class21, class22, class23, class24, optionII1, optionII2, optionII3, optionII4, eighthgradecourse} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {
            class7:class7,
            class8:class8,
            class9:class9,
            class10:class10,
            class11:class11,
            class12:class12,
            class13:class13,
            class14:class14,
            class15:class15,
            class16:class16,
            class17:class17,
            class18:class18,
            class19:class19,
            class20:class20,
            class21:class21,
            class22:class22,
            class23:class23,
            class24:class24,
            optionII1:optionII1,
            optionII2:optionII2,
            optionII3:optionII3,
            optionII4:optionII4,
            eighthgradecourse:eighthgradecourse

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/finalschedule'))
    .catch(err => console.log(err));
});

//Handle post for 10th grade final
router.post('/10thfinalschedule', ensureAuthenticated, (req,res) =>{
    const {class13, class14, class15, class16, class17, class18,
    class19, class20, class21, class22, class23, class24, optionII1, optionII2, optionII3, optionII4,eighthgradecourse} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {
            class13:class13,
            class14:class14,
            class15:class15,
            class16:class16,
            class17:class17,
            class18:class18,
            class19:class19,
            class20:class20,
            class21:class21,
            class22:class22,
            class23:class23,
            class24:class24,
            optionII1:optionII1,
            optionII2:optionII2,
            optionII3:optionII3,
            optionII4:optionII4,
            eighthgradecourse:eighthgradecourse

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/finalschedule'))
    .catch(err => console.log(err));
});
//Handle post for 8th grade final
router.post('/11thfinalschedule', ensureAuthenticated, (req,res) =>{
    const {class19, class20, class21, class22, class23, class24, optionII1, optionII2, optionII3, optionII4,eighthgradecourse} = req.body;

    User.findByIdAndUpdate(
        {_id: req.user._id},
        {
            class19:class19,
            class20:class20,
            class21:class21,
            class22:class22,
            class23:class23,
            class24:class24,
            optionII1:optionII1,
            optionII2:optionII2,
            optionII3:optionII3,
            optionII4:optionII4,
            eighthgradecourse:eighthgradecourse

     },
        function(err, result){
            if(err){
                res.send(err);
            }else{
                console.log(result);
            }
        }

    )
    .then(res.redirect('/finalschedule'))
    .catch(err => console.log(err));
});


//Handle post for gradecalc
router.post('/gradecalc', ensureAuthenticated, (req,res) =>{
    const {gradecalc1, gradecalc2, gradecalc3, targetgrade, } = req.body;
    var gradetarget
    if(targetgrade == 'A') gradetarget = 89.5;
    else if(targetgrade=='B') gradetarget = 79.5;
    else if(targetgrade == 'C') gradetarget = 69.5;
    else if (targetgrade == 'D') gradetarget = 59.5;
    var average;
    var requiredaverage = 0;
    if( gradecalc2== null){
        requiredaverage = ((gradetarget*4)-Math.round(gradecalc1))/3;
    }
    else if(gradecalc3 == null){
        requiredaverage = ((gradetarget * 4) - (Math.round(gradecalc1) + Math.round(gradecalc2))/2)
    }
    else {
        requiredaverage = ((gradetarget*4) - (Math.round(gradecalc1) + Math.round(gradecalc2) + Math.round(gradecalc3)))
    }
    res.render('gradecalc', {requiredaverage:requiredaverage});
});
//Login Handle
router.post('/login',  (req,res, next) =>{
    passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


//Logout Handle
router.get('/logout', (req,res) => {
    req.logout();
    req.flash('success_msg', 'You have been logged out.');
    res.redirect('/login')
})
module.exports = router;