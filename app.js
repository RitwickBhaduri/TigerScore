function App() {
    try {
        const [gameState, setGameState] = React.useState({
            isGameStarted: false,
            players: [],
            scores: [],
            currentPlayer: 0,
            settings: {
                startingScore: 501,
                legs: 3,
                sets: 1,
                startMode: 'straight',
                checkoutMode: 'double',
                isTeamMode: false,
                startingPlayer: 0
            },
            history: [],
            future: [],
            currentLegScores: [],
            legsWon: [],
            setsWon: [],
            initialState: null
        });

        const [victoryState, setVictoryState] = React.useState({
            type: null,
            winner: null
        });

        const handleStartGame = (players, settings) => {
            const flatPlayers = settings.isTeamMode 
                ? players.flat()
                : players;

            const initialState = {
                isGameStarted: true,
                players: flatPlayers,
                scores: flatPlayers.map(() => settings.startingScore),
                currentPlayer: settings.startingPlayer,
                settings,
                history: [],
                future: [],
                currentLegScores: flatPlayers.map(() => []),
                legsWon: flatPlayers.map(() => 0),
                setsWon: flatPlayers.map(() => 0),
                initialState: null
            };

            setGameState({
                ...initialState,
                initialState
            });
        };

        const handleNewGame = () => {
            setGameState({
                isGameStarted: false,
                players: [],
                scores: [],
                currentPlayer: 0,
                settings: {
                    startingScore: 501,
                    legs: 3,
                    sets: 1,
                    startMode: 'straight',
                    checkoutMode: 'double',
                    isTeamMode: false,
                    startingPlayer: 0
                },
                history: [],
                future: [],
                currentLegScores: [],
                legsWon: [],
                setsWon: [],
                initialState: null
            });
            setVictoryState({ type: null, winner: null });
        };

        const handleVictoryClose = () => {
            setVictoryState({ type: null, winner: null });
        };

        const handleScoreSubmit = async (score) => {
            if (!validateScore(score)) return;

            setGameState(prev => {
                const updatedScores = [...prev.scores];
                updatedScores[prev.currentPlayer] = calculateRemainingScore(
                    updatedScores[prev.currentPlayer],
                    score
                );

                const newCurrentLegScores = prev.currentLegScores.map((scores, index) => 
                    index === prev.currentPlayer ? [...scores, score] : scores
                );

                const newHistory = [...prev.history, {
                    scores: [...prev.scores],
                    currentPlayer: prev.currentPlayer,
                    currentLegScores: prev.currentLegScores.map(scores => [...scores]),
                    legsWon: [...prev.legsWon],
                    setsWon: [...prev.setsWon]
                }];

                let newLegsWon = [...prev.legsWon];
                let newSetsWon = [...prev.setsWon];
                let newCurrentPlayer = prev.currentPlayer;
                let resetScores = updatedScores;
                let isNewLeg = false;
                let isNewSet = false;

                if (isWinningScore(updatedScores[prev.currentPlayer])) {
                    // Player won the leg
                    newLegsWon[prev.currentPlayer] += 1;
                    isNewLeg = true;

                    // Show leg victory popup
                    setVictoryState({
                        type: 'leg',
                        winner: prev.players[prev.currentPlayer]
                    });

                    // Calculate legs needed to win a set (best of Y legs)
                    const legsToWinSet = Math.floor(prev.settings.legs / 2) + 1;
                    
                    // Check if player won the set
                    if (newLegsWon[prev.currentPlayer] >= legsToWinSet) {
                        newSetsWon[prev.currentPlayer] += 1;
                        // Reset legs for new set
                        newLegsWon = newLegsWon.map(() => 0);
                        isNewSet = true;

                        // Show set victory popup
                        setVictoryState({
                            type: 'set',
                            winner: prev.players[prev.currentPlayer]
                        });

                        // Calculate sets needed to win match (best of X sets)
                        const setsToWinMatch = Math.floor(prev.settings.sets / 2) + 1;

                        // Check if player won the match
                        if (newSetsWon[prev.currentPlayer] >= setsToWinMatch) {
                            // Show match victory popup
                            setVictoryState({
                                type: 'match',
                                winner: prev.players[prev.currentPlayer]
                            });

                            // Save final game state
                            saveGameState({
                                winner: prev.players[prev.currentPlayer],
                                players: prev.players,
                                finalScores: resetScores,
                                settings: prev.settings,
                                timestamp: new Date().toISOString(),
                                matchWinner: prev.players[prev.currentPlayer],
                                setsWon: newSetsWon,
                                legsWon: newLegsWon
                            });
                        }
                    }

                    // Reset scores for new leg
                    resetScores = resetScores.map(() => prev.settings.startingScore);

                    // Alternate starting player for next leg regardless of who won
                    if (isNewSet) {
                        // For a new set, alternate from the last set's starter
                        newCurrentPlayer = (prev.settings.startingPlayer + 1) % prev.players.length;
                        prev.settings.startingPlayer = newCurrentPlayer;
                    } else {
                        // For a new leg within the same set, alternate from the last leg's starter
                        newCurrentPlayer = (prev.settings.startingPlayer + 1) % prev.players.length;
                        prev.settings.startingPlayer = newCurrentPlayer;
                    }

                    // Save leg state
                    saveGameState({
                        winner: prev.players[prev.currentPlayer],
                        players: prev.players,
                        finalScores: resetScores,
                        settings: prev.settings,
                        timestamp: new Date().toISOString(),
                        legsWon: newLegsWon,
                        setsWon: newSetsWon
                    });
                } else {
                    // Move to next player
                    newCurrentPlayer = (prev.currentPlayer + 1) % prev.players.length;
                }

                return {
                    ...prev,
                    scores: resetScores,
                    currentPlayer: newCurrentPlayer,
                    history: newHistory,
                    future: [],
                    currentLegScores: isNewLeg ? resetScores.map(() => []) : newCurrentLegScores,
                    legsWon: newLegsWon,
                    setsWon: newSetsWon,
                    isNewLeg,
                    isNewSet,
                    settings: {
                        ...prev.settings,
                        startingPlayer: prev.settings.startingPlayer
                    }
                };
            });
        };

        const handleUndo = () => {
            setGameState(prev => {
                if (prev.history.length === 0) {
                    // Reset to initial game state
                    if (prev.initialState) {
                        return {
                            ...prev.initialState,
                            initialState: prev.initialState
                        };
                    }
                    return prev;
                }

                const lastState = prev.history[prev.history.length - 1];
                const newHistory = prev.history.slice(0, -1);
                const newFuture = [...prev.future, {
                    scores: [...prev.scores],
                    currentPlayer: prev.currentPlayer,
                    currentLegScores: prev.currentLegScores.map(scores => [...scores]),
                    legsWon: [...prev.legsWon],
                    setsWon: [...prev.setsWon]
                }];

                // If this is the last history entry, reset to initial state
                if (newHistory.length === 0) {
                    return {
                        ...prev.initialState,
                        initialState: prev.initialState,
                        future: newFuture
                    };
                }

                return {
                    ...prev,
                    scores: [...lastState.scores],
                    currentPlayer: lastState.currentPlayer,
                    history: newHistory,
                    future: newFuture,
                    currentLegScores: lastState.currentLegScores.map(scores => [...scores]),
                    legsWon: lastState.legsWon ? [...lastState.legsWon] : [...prev.legsWon],
                    setsWon: lastState.setsWon ? [...lastState.setsWon] : [...prev.setsWon]
                };
            });
        };

        const handleRedo = () => {
            setGameState(prev => {
                if (prev.future.length === 0) return prev;

                const nextState = prev.future[prev.future.length - 1];
                const newFuture = prev.future.slice(0, -1);
                const newHistory = [...prev.history, {
                    scores: [...prev.scores],
                    currentPlayer: prev.currentPlayer,
                    currentLegScores: prev.currentLegScores.map(scores => [...scores])
                }];

                return {
                    ...prev,
                    scores: [...nextState.scores],
                    currentPlayer: nextState.currentPlayer,
                    history: newHistory,
                    future: newFuture,
                    currentLegScores: nextState.currentLegScores.map(scores => [...scores])
                };
            });
        };

        return (
            <div className="min-h-screen bg-gray-900" data-name="app-container">
                <Header onNewGame={handleNewGame} />
                
                {!gameState.isGameStarted ? (
                    <GameSetup onStartGame={handleStartGame} />
                ) : (
                    <>
                        <Scoreboard
                            players={gameState.players}
                            scores={gameState.scores}
                            currentPlayer={gameState.currentPlayer}
                            onScoreSubmit={handleScoreSubmit}
                            gameState={gameState}
                            onUndo={handleUndo}
                            onRedo={handleRedo}
                        />
                        {victoryState.winner && (
                            <VictoryPopup
                                type={victoryState.type}
                                winner={victoryState.winner}
                                onClose={handleVictoryClose}
                                onHome={handleNewGame}
                            />
                        )}
                    </>
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
