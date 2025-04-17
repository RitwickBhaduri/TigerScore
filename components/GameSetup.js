function GameSetup({ onStartGame }) {
    try {
        const [isTeamMode, setIsTeamMode] = React.useState(false);
        const [team1Players, setTeam1Players] = React.useState(['']);
        const [team2Players, setTeam2Players] = React.useState(['']);
        const [team1Name, setTeam1Name] = React.useState('Team 1');
        const [team2Name, setTeam2Name] = React.useState('Team 2');
        const [singlePlayers, setSinglePlayers] = React.useState(['', '']);
        const [errors, setErrors] = React.useState({});
        const [gameSettings, setGameSettings] = React.useState({
            startingScore: '501',
            customScore: '',
            legs: '3',
            sets: '1',
            startMode: 'straight',
            checkoutMode: 'double',
            startingPlayer: 0  // 0 for first player/team, 1 for second player/team
        });

        const validateForm = () => {
            const newErrors = {};

            // Validate custom score
            if (gameSettings.startingScore === 'custom') {
                const score = parseInt(gameSettings.customScore);
                if (!gameSettings.customScore) {
                    newErrors.customScore = 'Custom score is required';
                } else if (isNaN(score) || score <= 0) {
                    newErrors.customScore = 'Custom score must be a positive number';
                }
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleStartGame = () => {
            if (!validateForm()) return;

            const players = isTeamMode 
                ? [
                    team1Players.map((p, i) => p.trim() || `Team 1 Player ${i + 1}`),
                    team2Players.map((p, i) => p.trim() || `Team 2 Player ${i + 1}`)
                ]
                : singlePlayers.map((p, i) => p.trim() || `Player ${i + 1}`);

            const settings = {
                ...gameSettings,
                startingScore: gameSettings.startingScore === 'custom' 
                    ? parseInt(gameSettings.customScore) 
                    : parseInt(gameSettings.startingScore),
                legs: parseInt(gameSettings.legs),
                sets: parseInt(gameSettings.sets),
                isTeamMode
            };
            
            onStartGame(players, settings);
        };

        const handleAddTeamPlayer = (teamIndex) => {
            const team = teamIndex === 0 ? team1Players : team2Players;
            const setTeam = teamIndex === 0 ? setTeam1Players : setTeam2Players;
            
            if (team.length < 5) {
                setTeam([...team, '']);
                setErrors(prev => ({
                    ...prev,
                    [`team${teamIndex + 1}`]: null
                }));
            }
        };

        const handleTeamPlayerChange = (teamIndex, playerIndex, value) => {
            const team = teamIndex === 0 ? team1Players : team2Players;
            const setTeam = teamIndex === 0 ? setTeam1Players : setTeam2Players;
            const newTeam = [...team];
            newTeam[playerIndex] = value;
            setTeam(newTeam);
            setErrors(prev => ({
                ...prev,
                [`team${teamIndex + 1}`]: null
            }));
        };

        const handleSinglePlayerChange = (index, value) => {
            const newPlayers = [...singlePlayers];
            newPlayers[index] = value;
            setSinglePlayers(newPlayers);
            setErrors(prev => ({
                ...prev,
                players: null
            }));
        };

        return (
            <div className="max-w-2xl mx-auto mt-4 p-6 bg-gray-800 rounded-lg shadow-xl" data-name="game-setup">
                <h2 className="text-xl font-bold mb-6 text-center text-primary" data-name="setup-title">New Game Setup</h2>
                
                <div className="mb-6" data-name="game-mode-toggle">
                    <label className="block mb-2">Game Mode</label>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsTeamMode(false)}
                            className={`flex-1 py-2 px-4 rounded ${!isTeamMode ? 'bg-primary' : 'bg-gray-700'}`}
                            data-name="single-mode-btn"
                        >
                            Single Players
                        </button>
                        <button
                            onClick={() => setIsTeamMode(true)}
                            className={`flex-1 py-2 px-4 rounded ${isTeamMode ? 'bg-primary' : 'bg-gray-700'}`}
                            data-name="team-mode-btn"
                        >
                            Team Mode
                        </button>
                    </div>
                </div>

                {isTeamMode ? (
                    <div className="space-y-6 mb-6" data-name="team-setup">
                        {[0, 1].map(teamIndex => (
                            <div key={teamIndex} className="p-4 bg-gray-700 rounded">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Team {teamIndex + 1}</h3>
                                    <input
                                        type="text"
                                        value={teamIndex === 0 ? team1Name : team2Name}
                                        onChange={(e) => teamIndex === 0 ? setTeam1Name(e.target.value) : setTeam2Name(e.target.value)}
                                        className="px-3 py-1 bg-gray-600 rounded border border-gray-500 focus:border-primary focus:outline-none text-sm"
                                        placeholder={`Team ${teamIndex + 1} name`}
                                        data-name={`team-${teamIndex + 1}-name-input`}
                                    />
                                </div>
                                <div className="space-y-3">
                                    {(teamIndex === 0 ? team1Players : team2Players).map((player, playerIndex) => (
                                        <input
                                            key={playerIndex}
                                            type="text"
                                            value={player}
                                            onChange={(e) => handleTeamPlayerChange(teamIndex, playerIndex, e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-600 rounded border border-gray-500 focus:border-primary focus:outline-none"
                                            placeholder={`Player ${playerIndex + 1} name`}
                                            data-name={`team-${teamIndex + 1}-player-${playerIndex + 1}`}
                                        />
                                    ))}
                                </div>
                                {errors[`team${teamIndex + 1}`] && (
                                    <p className="mt-2 text-red-400 text-sm" data-name={`team-${teamIndex + 1}-error`}>
                                        {errors[`team${teamIndex + 1}`]}
                                    </p>
                                )}
                                {(teamIndex === 0 ? team1Players : team2Players).length < 5 && (
                                    <button
                                        onClick={() => handleAddTeamPlayer(teamIndex)}
                                        className="mt-3 text-primary hover:text-primary/80"
                                        data-name={`add-team-${teamIndex + 1}-player`}
                                    >
                                        <i className="fas fa-plus-circle mr-1"></i>
                                        Add Player
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 mb-6" data-name="single-players">
                        {singlePlayers.map((player, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <label className="w-24">Player {index + 1}</label>
                                <input
                                    type="text"
                                    value={player}
                                    onChange={(e) => handleSinglePlayerChange(index, e.target.value)}
                                    className="flex-1 px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                                    placeholder={`Player ${index + 1} name`}
                                    data-name={`player-${index + 1}-input`}
                                />
                            </div>
                        ))}
                        {errors.players && (
                            <p className="text-red-400 text-sm" data-name="players-error">
                                {errors.players}
                            </p>
                        )}
                    </div>
                )}

                <div className="mb-6" data-name="first-throw-toggle">
                    <label className="block mb-2">First Throw</label>
                    <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                        <span className="text-white text-sm">
                            {isTeamMode 
                                ? (gameSettings.startingPlayer === 0 ? team1Name : team2Name)
                                : (gameSettings.startingPlayer === 0 
                                    ? (singlePlayers[0] || 'Player 1')
                                    : (singlePlayers[1] || 'Player 2')
                                )
                            }
                        </span>
                        <div 
                            className="relative inline-block w-12 h-6 cursor-pointer"
                            onClick={() => setGameSettings({
                                ...gameSettings,
                                startingPlayer: gameSettings.startingPlayer === 0 ? 1 : 0
                            })}
                        >
                            <div className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                                gameSettings.startingPlayer === 1 ? 'bg-primary' : 'bg-gray-600'
                            }`}>
                                <div className={`absolute h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-transform duration-200 ${
                                    gameSettings.startingPlayer === 1 ? 'translate-x-6' : ''
                                }`}></div>
                            </div>
                        </div>
                        <span className="text-white text-sm">
                            {isTeamMode 
                                ? (gameSettings.startingPlayer === 0 ? team2Name : team1Name)
                                : (gameSettings.startingPlayer === 0 
                                    ? (singlePlayers[1] || 'Player 2')
                                    : (singlePlayers[0] || 'Player 1')
                                )
                            }
                        </span>
                    </div>
                </div>

                <div className="space-y-4 mb-6" data-name="game-settings">
                    <div>
                        <label className="block mb-2">Game Type</label>
                        <select
                            value={gameSettings.startingScore}
                            onChange={(e) => setGameSettings({
                                ...gameSettings,
                                startingScore: e.target.value,
                                customScore: ''
                            })}
                            className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                            data-name="game-type-select"
                        >
                            <option value="201">201</option>
                            <option value="301">301</option>
                            <option value="501">501</option>
                            <option value="701">701</option>
                            <option value="custom">Custom</option>
                        </select>
                        {gameSettings.startingScore === 'custom' && (
                            <div className="mt-2">
                                <input
                                    type="number"
                                    value={gameSettings.customScore}
                                    onChange={(e) => setGameSettings({
                                        ...gameSettings,
                                        customScore: e.target.value
                                    })}
                                    className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                                    placeholder="Enter custom score"
                                    data-name="custom-score-input"
                                />
                                {errors.customScore && (
                                    <p className="mt-1 text-red-400 text-sm" data-name="custom-score-error">
                                        {errors.customScore}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Legs</label>
                            <select
                                value={gameSettings.legs}
                                onChange={(e) => setGameSettings({
                                    ...gameSettings,
                                    legs: e.target.value
                                })}
                                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                                data-name="legs-select"
                            >
                                {[1, 3, 5, 7].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Sets</label>
                            <select
                                value={gameSettings.sets}
                                onChange={(e) => setGameSettings({
                                    ...gameSettings,
                                    sets: e.target.value
                                })}
                                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                                data-name="sets-select"
                            >
                                {[1, 3, 5, 7].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Start Mode</label>
                            <select
                                value={gameSettings.startMode}
                                onChange={(e) => setGameSettings({
                                    ...gameSettings,
                                    startMode: e.target.value
                                })}
                                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                                data-name="start-mode-select"
                            >
                                <option value="straight">Straight In</option>
                                <option value="double">Double In</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2">Checkout Mode</label>
                            <select
                                value={gameSettings.checkoutMode}
                                onChange={(e) => setGameSettings({
                                    ...gameSettings,
                                    checkoutMode: e.target.value
                                })}
                                className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-primary focus:outline-none"
                                data-name="checkout-mode-select"
                            >
                                <option value="straight">Straight Out</option>
                                <option value="double">Double Out</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleStartGame}
                    className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded transition-colors"
                    data-name="start-game-btn"
                >
                    Start Game
                </button>
            </div>
        );
    } catch (error) {
        console.error('GameSetup component error:', error);
        reportError(error);
        return null;
    }
}
