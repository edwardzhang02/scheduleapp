const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    class1:{
        type: String,
        default: null
    },
    class2:{
        type: String,
        default: null
    },
    class3:{
        type: String,
        default: null
    },
    class4:{
        type: String,
        default: null
    },
    class5:{
        type: String,
        default: null
    },
    class6:{
        type: String,
        default: null
    },
    class7:{
        type: String,
        default: null
    },
    class8:{
        type: String,
        default: null
    },
    class9:{
        type: String,
        default: null
    },
    class10:{
        type: String,
        default: null
    },
    class11:{
        type: String,
        default: null
    },
    class12:{
        type: String,
        default: null
    },
    class13:{
        type: String,
        default: null
    },
    class14:{
        type: String,
        default: null
    },
    class15:{
        type: String,
        default: null
    },
    class16:{
        type: String,
        default: null
    },
    class17:{
        type: String,
        default: null
    },
    class18:{
        type: String,
        default: null
    },
    class19:{
        type: String,
        default: null
    },
    class20:{
        type: String,
        default: null
    },
    class21:{
        type: String,
        default: null
    },
    class22:{
        type: String,
        default: null
    },
    class23:{
        type: String,
        default: null
    },
    class24:{
        type: String,
        default: null
    },
    grade:{
        type: Number,
        required: true
    },
    grade1:{
        type:String,
        default:null
    },
    grade2:{
        type:String,
        default:null
    },
    grade3:{
        type:String,
        default:null
    },
    grade4:{
        type:String,
        default:null
    },
    grade5:{
        type:String,
        default:null
    },
    grade6:{
        type:String,
        default:null
    },
    grade7:{
        type:String,
        default:null
    },
    grade8:{
        type:String,
        default:null
    },
    grade9:{
        type:String,
        default:null
    },
    grade10:{
        type:String,
        default:null
    },
    grade11:{
        type:String,
        default:null
    },
    grade12:{
        type:String,
        default:null
    },
    grade13:{
        type:String,
        default:null
    },
    grade14:{
        type:String,
        default:null
    },
    grade15:{
        type:String,
        default:null
    },
    grade16:{
        type:String,
        default:null
    },
    grade17:{
        type:String,
        default:null
    },
    grade18:{
        type:String,
        default:null
    },
    grade19:{
        type:String,
        default:null
    },
    grade20:{
        type:String,
        default:null
    },
    grade21:{
        type:String,
        default:null
    },
    grade22:{
        type:String,
        default:null
    },
    grade23:{
        type:String,
        default:null
    },
    grade24:{
        type:String,
        default:null
    },
    optionII1:{
        type:String,
        defult:null
    },
    optionII2:{
        type:String,
        default:null
    },
    optionII3:{
        type:String,
        default:null
    },
    optionII4:{
        type:String,
        default:null
    },
    eighthgradecourse:{
        type:String,
        default:null
    }

});

const User = mongoose.model('User', UserSchema);

module.exports=User;