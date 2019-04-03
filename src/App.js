import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      userrepo: '',
    }
  }

  getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      return response;
     })
  }

  getUserRepo(username){
    return fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(jSONData => {
      console.log(jSONData)
      return(jSONData);
     })
  }  
  
  async handleSubmit(e) {
    e.preventDefault();

    let user = await this.getUser(this.refs.username.value);
    let repo = await this.getUserRepo(this.refs.username.value);

    this.setState({ avatar_url: user.avatar_url,
      username: user.login,
      id: user.id,
      url: user.url,
      message: user.message,
      reponame: repo,
    });
  }

  reposTable = () => {
    let table = []
    for (let i = 0; i < this.state.reponame.length; i++) {
      let repo = []
      let repourl = []

      table.push( <tr key={i}>{repo}{repourl}
                    <td key={this.state.reponame[i].name}>{this.state.reponame[i].name}</td>
                    <td key={this.state.reponame[i].html_url}>
                      <a href={this.state.reponame[i].html_url} target="_blank" rel="noopener noreferrer">{this.state.reponame[i].html_url}
                      </a>
                    </td>
                  </tr>)
    }
    return table
  }

  render() {
      let usuario;
      if(this.state.username){
        usuario =
        <div className="container center">
          <img className="circle" src={this.state.avatar_url} width="100px" alt="Avatar GitHub"></img>
          <table className="highlight centered">
          <thead>
            <tr>
            <th colSpan="2" className="center">
             Information:
            </th>
            </tr>
          </thead>
            <tbody>
              <tr>
                <td><b>Login:</b></td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td><b>ID:</b></td>
                <td>{this.state.id}</td>
              </tr>
              <tr>
                <td><b>Url User:</b></td>
                <td><a href={this.state.url}>{this.state.url}</a></td>
              </tr>
            </tbody>
          </table>
          <br></br>
         
        <div className="">
        <br></br>
          <table className="highlight centered">
            <thead>
              <tr id="head">
                <th>Repository Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
            {
              this.reposTable()
            }
          </tbody>
          </table>
        </div>
        </div>

      }
      
      else{
        usuario=
        <div className="container center">
          <p><b>{this.state.message}</b></p>
         </div>

      }
      return (
        <div className="container" >
          <h1>Find an user from GitHub</h1>
          <form onSubmit={e => this.handleSubmit(e)}>
             <input ref='username' type='text' placeholder='GitHub Username' required />
             <button className="waves-effect waves-light btn" type="submit">Search</button>
          </form> 
          <div>{usuario}</div>               
        </div>
);

    }
  }

export default App;
