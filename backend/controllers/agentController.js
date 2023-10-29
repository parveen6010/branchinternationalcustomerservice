import asyncHandler from "express-async-handler";
import Agent from "../models/agentModel.js";
import generateToken from "../utils/generateToken.js";

 

//@description     Auth the agent
//@route           POST /api/agents/login
//@access          Public
const agentauthUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const agent = await Agent.findOne({ email });

  if (agent && (await agent.matchPassword(password))) {
    res.json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      isAdmin: agent.isAdmin,
      pic: agent.pic,
      token: generateToken(agent._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});



//@description     Register new agent
//@route           POST /api/agents/
//@access          Public
const agentregisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //  res.json({
  //   name,
  //   email
  //  });

  //  console.log("ddddd");
  const agentExists = await Agent.findOne({ email });

  if (agentExists) {
    res.status(404);
    throw new Error("Agent already exists");
  }

  const agent = await Agent.create({
    name,
    email,
    password,
    pic,
  });

  if (agent) {
    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      isAdmin: agent.isAdmin,
      pic: agent.pic,
      token: generateToken(agent._id),
    });
  } else {
    res.status(400);
    throw new Error("Agent not found");
  }
});



// @desc    GET agent profile
// @route   GET /api/agent/profile
// @access  Private

const agentupdateUserProfile = asyncHandler(async (req, res) => {
  const agent = await Agent.findById(req.agent._id);

  if (agent) {
    agent.name = req.body.name || agent.name;
    agent.email = req.body.email || agent.email;
    agent.pic = req.body.pic || agent.pic;
    if (req.body.password) {
      agent.password = req.body.password;
    }

    const updatedAgent = await agent.save();

    res.json({
      _id: updatedAgent._id,
      name: updatedAgent.name,
      email: updatedAgent.email,
      pic: updatedAgent.pic,
      isAdmin: updatedAgent.isAdmin,
      token: generateToken(updatedAgent._id),
    });
  } else {
    res.status(404);
    throw new Error("Agent Not Found");
  }
}); 



export  { agentauthUser, agentupdateUserProfile, agentregisterUser };
