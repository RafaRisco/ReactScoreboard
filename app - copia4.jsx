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

function Stats(props) {
  return (
    <div className="stats">
      <table>
        <tbody>
          <tr>
            <td>Total players</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Total points</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function Stopwatch(props) {
  return (
    <div className="stopwatch">
      <div className="stopwatch-time">10</div>
      <button>Start</button>
      <button>Reset</button>
    </div>
  )
}


function Header(props) {
  return (
    <div className="header">
      <Stats />
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  )
}

Header.PropTypes = {
  title: React.PropTypes.string.isRequired
}

function Counter(props) {
  return (
    <div className="counter">
      <button className="counter-action decrement">-</button>
      <div className="counter-score">{props.score}</div>
      <button className="counter-action increment">+</button>
    </div>
  )
}

Counter.PropTypes = {
  score: React.PropTypes.number.isRequired
}

function Player(props) {
  return (
  <div className="player">
    <div className="player-name">{props.name}</div>
    <Counter score={props.score}/>
  </div>
  )
}

Player.PropTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired
}

var Application = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired,
    InitialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function() {
    return {
      title: "Scoreboard"
    }
  },

  getInitialState: function() {
    return {
      players: this.props.InitialPlayers,
    }
  },

  render: function () {
    return (
      <div className="scoreboard">
        <Header title={this.props.title}/>
        <div className="players">
          {this.state.players.map(function(player){
            return (
              <Player
                name={player.name}
                score={player.score}
                key={player.id}
                />
              )}.bind(this))}
          <div className="add-player-form">
            <form>
              <input type="text" value=""/>
              <input type="submit" value="Add Player"/>
            </form>
          </div>
        </div>
      </div>
    )
  }
})


ReactDOM.render(<Application InitialPlayers={PLAYERS}/>, document.getElementById('container'));
