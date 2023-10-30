
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AgentHeader from "./components/AgentHeader"; // Ensure the correct import
import MyMessages from "./screens/MyMessages/MyMessages";

import AgentSingleMessage from "./screens/SingleMessage/AgentSingleMessages";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateMessage from "./screens/SingleMessage/CreateMessage";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import Homepage from "./screens/Homepage/Homepage";

import AgentRegisterScreen from "./screens/AgentRegisterScreen/AgentRegisterScreen";
import AgentLoginScreen from "./screens/AgentLoginScreen/AgentLoginScreen";
import AgentMyMessages from "./screens/AgentMyMessages/AgentMyMessages";
import AgentProfileScreen from "./screens/AgentProfileScreen/AgentProfileScreen";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <main className="App">
        <Route
          exact
          path="/"
          render={() => <Header setSearch={setSearch} />}
        />
        <Route
          path="/login"
          render={() => <Header setSearch={setSearch} />}
        />
        <Route
          path="/register"
          render={() => <Header setSearch={setSearch} />}
        />
        <Route
          path="/profile"
          render={() => <Header setSearch={setSearch} />}
        />
        <Route
          path="/mymessages"
          render={() => <Header setSearch={setSearch} />}
        />
        
        <Route
          path="/createmessage"
          render={() => <Header setSearch={setSearch} />}
        />

        <Route
          path="/agentlogin"
          render={() => <AgentHeader setSearch={setSearch} />}
        />
        <Route
          path="/agentregister"
          render={() => <AgentHeader setSearch={setSearch} />}
        />
        <Route
          path="/notes/respon/:id"
          render={() => <AgentHeader setSearch={setSearch} />}
        />
        <Route
          path="/Agentprofile"
          render={() => <AgentHeader setSearch={setSearch} />}
        />
        <Route
          path="/Agentmymessages"
          render={() => <AgentHeader setSearch={setSearch} />}
        />

       <Route
          path="/messages/respon/:id"
          render={() => <AgentHeader setSearch={setSearch} />}
        />

        <Route path="/" component={Homepage} exact />

     
        <Route path="/login" component={LoginScreen} />

        <Route path="/register" component={RegisterScreen} />


        <Route path="/profile" component={ProfileScreen} />

   

        <Route
          path="/mymessages"
          component={({ history }) => (
            <MyMessages search={search} history={history} />
          )}
        />


        <Route path="/createmessage" component={CreateMessage} />

      
        <Route
          path="/messages/respon/:id"
          component={AgentSingleMessage}
        />
 
        <Route path="/agentlogin" component={AgentLoginScreen} />

      
        <Route path="/agentregister" component={AgentRegisterScreen} />

     
        <Route path="/Agentprofile" component={AgentProfileScreen} />

        
        <Route
          path="/Agentmymessages"
          component={({ history }) => (
            <AgentMyMessages search={search} history={history} />
          )}
        />
      </main>
      <Footer />
    </Router>
  );
}

export default App;









