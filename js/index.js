function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class App extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      users: [],
      isLoading: true,
      errors: null });}

  
  getUsers() {
    var pagen = sessionStorage.getItem("pagenum");
    axios.
    get("https://api.github.com/search/repositories?q=created:>2019-04-25&sort=stars&order=desc&page="+pagen).
    then((response) =>
    response.data.items.map(user => ({
      
      avatar: `${user.owner.avatar_url}`,
      repo: `${user.name}`,
      desc: `${user.description}`,
      nbStars: `${user.stargazers_count}`,
      timeInterval: `${user.updated_at}`,
      nbIssues: `${user.open_issues}`
    }))
    
   
    
    ).


    then(users => {
      this.setState({
        users,
        isLoading: false });

    }).
    catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      React.createElement(React.Fragment, null,
      React.createElement("h2", null, "Random User"),
      React.createElement("div", null,
      !isLoading ?
      users.map(user => {
        const { timeInterval, nbStars, desc,repo, avatar,nbIssues } = user;
        return (
          
          React.createElement("div", { class:"card mb-3 text-left"},
          React.createElement("div", {class:"row no-gutters"},
            React.createElement("div", {class:"col-md-4"},
                React.createElement("img", { src:avatar, class:"card-img" })),
            React.createElement("div", {class:"col-md-8 frame"},
              React.createElement("div", {class:"card-body"},
                React.createElement("h5", {class:"card-title"}, repo),
                React.createElement("p", {class:"card-text text-left",style:{height:"15rem"}}, desc),
                React.createElement("p", {class:"card-text d-flex align-items-start"},
                  React.createElement("button", {type:"button", class:"btn btn-primary"},"Stars ",
                    React.createElement("span", {class:"badge badge-light"},kFormatter(nbStars))),
                  React.createElement("button", {type:"button", class:"btn btn-primary"},"Issues ",
                    React.createElement("span", {class:"badge badge-light"},kFormatter(nbIssues))),
                  React.createElement("small", {class:"text-muted align-self-end"},formattedDate(timeInterval))))))));


      }) :

      React.createElement("p", null, "Loading..."))));




  }}



ReactDOM.render(React.createElement(App, null), document.getElementById("root"));




function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}
function formattedDate(lastTime){
let current_datetime = new Date(lastTime)
let formatted_date = current_datetime.getFullYear() + "-" +
 (current_datetime.getMonth() + 1) + "-" 
 + current_datetime.getDate() + " " 
 + current_datetime.getHours() + ":"
  + current_datetime.getMinutes() + ":"
   + current_datetime.getSeconds() 
   return formatted_date
}
