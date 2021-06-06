const UserSchema = {
   id:null, 
   name:'',
   country:'',
   address:'',
   sex:'M',
   aboutUser:'',
   dob:null,
   email:'',
   username:'',
   phone:'',
   password:'',
   tsRegistration:'',
   projects:[], 
   avtar:null
};
Object.seal(UserSchema);
module.exports = UserSchema;