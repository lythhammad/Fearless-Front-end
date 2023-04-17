import Nav from "./Nav";

function App(props) {
  if (props.attendees === undefined){
    return null;
  }
  return (
    <>
    <Nav/>
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Conference</th>
          </tr>
        </thead>
        <tbody>
          {/* for (let attendees of props.attendees){
            <tr>
              <td>{attendees.name}</td>
              <td>{attendees.conference}</td>
            </tr>
          } */}
          {props.attendees.map(attendees => {
            return(
              <tr key={attendees.href}>
              <td>{attendees.name}</td>
              <td>{attendees.conference}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;
