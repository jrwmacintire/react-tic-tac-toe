import React, { Component } from 'react';

class Scoreboard extends Component {

    
    render() {
        return (
            <div className='Scoreboard'>
                <div id='player1' className='player'>
                    <p>
                        <b>
                            Player 1 Score
                        </b>
                    </p>
                    <p>
                        P1 Score
                    </p>
                </div>
                <div id='player2' className='player'>
                    <p>
                        <b>
                        Player 2 Score
                        </b>
                    </p>
                    <p>
                        P2 Score
                    </p>
                </div>
            </div>
        )
    }
}

export default Scoreboard;