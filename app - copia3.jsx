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
  {
    name: "Rafael Risco",
    score: 28,
    id: 4,
  },
];

var nextId = 5;

function Stats (props) {

  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  return (
    <div>
      <table className="stats">
        <tbody>
          <tr>
            <td>Total players</td>
            <td>{totalPlayers}</td>
          </tr>
          <tr>
            <td>Total points</td>
            <td>{totalPoints}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

Stats.PropTypes = {
  players: React.PropTypes.array.isRequired,
}

function Stopwatch (props) {
  return (
  <div className="stopwatch">
    <h2>stopwatch</h2>
    <div className="stopwatch-time">10</div>
    <button>Start</button>
    <button>Resert</button>
  </div>
  )
}

function Header(props) {
  return (
    <div className="header">
        <Stats players={props.players} />
        <h1>{props.title}</h1>
        <Stopwatch />
    </div>
  )
}

Header.PropTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
}

function Counter (props) {
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
  onChange: React.PropTypes.func.isRequired,
}

function Player(props) {
  return (
    <div>
      <div className="player">
        <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>X</a>
        {props.name}
        </div>
          <Counter score={props.score} onChange={props.onScoreChange}/>
      </div>
    </div>
  )
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired
}

var AddPlayerForm = React.createClass({

  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
      return {
        name: ""
      }
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name:""});
  },

  onNameChange: function(e) {
    this.setState({name:e.target.value});
    console.log(this.state);
  },

  render: function () {
    return (
    <form onSubmit={this.onSubmit}>
      <input type="text" value={this.state.name} onChange={this.onNameChange}/>
      <input type="submit" value="Add Player"/>
    </form>
    )
  }
})

var Application = React.createClass ({

propTypes: {
    title: React.PropTypes.string.isRequired,
    InitialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function(){
    return {
      title: "Scoreboard"
      }
  },

  getInitialState: function (){
    return {
      players: this.props.InitialPlayers
      }
  },

  onScoreChange: function(delta, index){
    this.state.players[index].score += delta;
    this.setState(this.state)
  },

  onPlayerAdd: function(name) {
    console.log("Player added", name);
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    nextId += 1;
    this.setState(this.state);
  },

  onRemovePlayer: function(index){
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

render: function() {
  return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players}/>
          <div className="players">
            {this.state.players.map(function(player, index) {
             return (
              <Player
                onScoreChange={function(delta) {this.onScoreChange(delta, index)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                name={player.name}
                score={player.score}
                key={player.id}/>
                )
            }.bind(this))}
          </div>
        <div className="add-player-form">
          <AddPlayerForm onAdd={this.onPlayerAdd}/>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<Application InitialPlayers={PLAYERS}/>, document.getElementById('container'));
