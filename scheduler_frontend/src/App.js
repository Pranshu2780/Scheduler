// import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { Schedule } from "./Schedule";
import { Candidate } from "./Candidate";
import { Navigation } from "./Navigation";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container ">
        <h1 className="m-3 d-flex justify-content-center" > Interview Scheduler </h1>
      </div>

      <Navigation />
      <Switch>
         <Route  path="/" component={Home} exact/>
         <Route path="/Schedule" component={Schedule} />  
         <Route path="/Candidate" component={Candidate} />  
      </Switch> 
    </BrowserRouter>
  );
}

export default App;
