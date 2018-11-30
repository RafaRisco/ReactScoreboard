var PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Holligan",
    score: 42,
    id: 3,
  },
];

var nextId = 4;

function Stats(props) {
  return (
      <div className="stats">
        <table>
          <tbody>
            <tr>
              <td>Total players</td>
              <td>{props.players.length}</td>
            </tr>
            <tr>
              <td>Total points</td>
              <td>{props.players.reduce(function(total, player){
                return  total += player.score
              }, 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

Stats.PropTypes = {
  players: React.PropTypes.array.isRequired
}


var Stopwatch = React.createClass({

  getInitialState: function(){
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },

  componentDidMount: function(){
    this.interval = setInterval(this.onTick, 100);
  },

  componentWillUnmount: function(){
    clearInterval(this.interval);
  },

  onStart: function(){
    this.setState({
      running: true,
      previousTime: Date.now()
    })
  },

  onStop: function(){
      this.setState({
        running: false
      })
  },

  onTick: function(){
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      })
    }
  },

  onReset: function(){
    this.state.elapsedTime = 0;
  },

  render: function(){

  var seconds =  Math.floor(this.state.elapsedTime/1000);

    return (
        <div className="stopwatch">
          <div className="stopwatch-time">{seconds}</div>
          {this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
          }
          <button onClick={this.onReset}>Reset</button>
        </div>
    )
  }
})


function Header(props) {
  return (
      <div className="header">
        <Stats players={props.players}/>
        <h1>scoreboard</h1>
        <Stopwatch />
      </div>
  )
}

Header.PropTypes = {
  players: React.PropTypes.array.isRequired
}


function Counter(props){
  return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function(){props.onChange(-1)}}>-</button>
        <div className="counter-score">{props.score}</div>
        <button className="counter-action increment" onClick={function(){props.onChange(1)}}>+</button>
      </div>
  )
}

Counter.PropTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired
}

function Player(props) {
  return (
      <div className="player">
        <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
          {props.name}
        </div>
        <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
  )
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}

var AddPlayerform = React.createClass ({

  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },

  getInitialState: function(){
    return {
      name: "",
    }
  },

  onNameChange: function(e){
    this.setState({name: e.target.value});
    console.log(this.state.name);
  },

  onSubmit: function(e){
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },

  render: function(){
    return (
    <div className="add-player-form">
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.name} onChange={this.onNameChange}/>
        <input type="submit" value="Add Player"/>
      </form>
    </div>
    )
  }
})


var Application = React.createClass({

  propTypes: {
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired
    }))
  },

  getInitialState: function(){
    return {
      players: this.props.initialPlayers
    }
  },

  onScoreChange: function(delta, index){
    this.state.players[index].score += delta;
    this.setState(this.state)
  },

  onPlayerAdd: function(name){
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId
    });
    nextId += 1;
    this.setState(this.state)
  },

  onRemovePlayer: function(index){
    this.state.players.splice(index, 1);
    this.setState(this.state)
  },

  render: function(){
    return (
        <div className="scoreboard">
        <Header players={this.state.players}/>
          <div className="players">
            {this.state.players.map(function(player, index){
              return (
                <Player
                  onScoreChange={function(delta){this.onScoreChange(delta, index)}.bind(this)}
                  onRemove={function(){this.onRemovePlayer(index)}.bind(this)}
                  name={player.name}
                  score={player.score}
                  key={player.id}
                  />
              )}.bind(this))}
          </div>
          <AddPlayerform onAdd={this.onPlayerAdd} />
        </div>
    )
  }
})


ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'))
