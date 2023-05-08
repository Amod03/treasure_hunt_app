import {Registration} from "../models/model.js"
//post:http://localhost:8080/api/regitration
function create_Register(req, res) {
    const { firstName, lastName, email, password } = req.body;
    
    const Create = new Registration({
      firstName,
      lastName,
      email,
      password,
      score: 0,
      time: 0,
      timePerQuestion: Array(10).fill(0),
      storyReached: "NO",
    });
  
   Create.save()
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.status(400).json({message:`error while creating registration ${err}`});
  });

}
  

async function login(req, res) {
    const { email, password } = req.body;
    console.log(email,password);
    // Retrieve all the documents in the Registration collection
    const registrations = await Registration.find();
  
    // Find the registration document with the matching email and password
    const user = registrations.find((registration) => registration.email === email && registration.password === password);
  
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Return the user data
    res.json({ user });
  }

  async function update(req, res){
    const { id } = req.params;
    const { score, time,timePerQuestion ,storyReached} = req.body;
    
    try {
      const user = await Registration.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      user.score = score;
      user.time = time;
      user.timePerQuestion=timePerQuestion;
      user.storyReached=storyReached;
      await user.save();
      
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }


  async function fetchData(req,res) {
    try {
      const users = await Registration.find({});
      res.json(users);
    } catch (error) {
        throw new Error('Could not fetch registrations');
    }
  }


  export {
    create_Register,
    login,
    update,
    fetchData
  };
  