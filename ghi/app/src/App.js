import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from "./PresentationForm";
import MainPage from "./MainPage";

function App(props) {
  if (props.attendees === undefined){
    return null
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="locations">
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="attendees">
          <Route index element={<AttendeesList attendees={props.attendees}/>} />
          <Route path="new" element={<AttendConferenceForm />} />
        </Route>
        <Route path="presentations">
          <Route path="new" element={<PresentationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
