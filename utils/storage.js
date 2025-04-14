async function saveGameState(gameData) {
    try {
        const gameObject = await trickleCreateObject('darts_game', gameData);
        return gameObject;
    } catch (error) {
        console.error('Failed to save game state:', error);
        throw error;
    }
}

async function loadGameHistory() {
    try {
        const { items } = await trickleListObjects('darts_game', 10, true);
        return items;
    } catch (error) {
        console.error('Failed to load game history:', error);
        throw error;
    }
}
