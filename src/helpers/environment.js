let APIURL = "";

switch (window.location.hostname) {
  //this is the local host name of your API
  case "localhost" || "127.0.0.1":
    // this is the local host name of your API
    APIURL = "http://localhost:3030";
    break;
  // this is the deployed react application
  case "trailflow.herokuapp.com": // client url
    // this is the full url of your deployed API
    APIURL = "https://tjr-trailflow.herokuapp.com/"; //server url
}

export default APIURL;
