import { checkout_routes } from '../utils/checkoutRoutes';

function getCheckoutAdvice(score) {
    try {
        if (!score || score <= 1 || score > 170) return null;
        if (!window.checkout_routes) {
            console.warn("Checkout routes not loaded");
            return null;
        }
        
        const checkout = window.checkout_routes[score];
        if (!checkout || checkout === "No checkout possible") return null;
        
        return Array.isArray(checkout) ? checkout : null;
    } catch (error) {
        console.error("Error getting checkout advice:", error);
        return null;
    }
}

function PlayerScore({ 
    name, 
    score, 
    isActive, 
    stats, 
    lastScore, 
    onHistoryClick,
    currentTeamPlayer,
    isTeamMode
}) {
    const checkoutAdvice = getCheckoutAdvice(score);

    return (
        <div 
            className={`player-score p-4 rounded-lg ${isActive ? 'active' : ''}`}
            data-name="player-score-card"
            data-checkout-visible={!!checkoutAdvice}
            data-team-mode={isTeamMode}
        >
            <div className="text-center mb-1" data-name="turn-indicator">
                {isActive && (
                    <img 
                        src="https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/62b82d8d-219e-47d6-860d-ab8c5ba55d4a.svg"
                        alt="Turn Indicator"
                        className="h-6 w-6 mx-auto animate-bounce"
                    />
                )}
            </div>
            
            <h3 className="text-lg font-semibold mb-1 text-center" data-name="player-name">
                {name}
                {isTeamMode && currentTeamPlayer && (
                    <span className="block text-sm text-gray-400 mt-1">
                        Turn: {currentTeamPlayer.replace(/Team \d+ Player /, 'Player ')}
                    </span>
                )}
            </h3>
            
            <div className="text-4xl font-bold text-primary mb-1 text-center" data-name="player-score">
                {score}
            </div>

            {checkoutAdvice && (
                <div className="text-sm mb-2 text-center" data-name="checkout-advice">
                    <div className="flex justify-center items-center space-x-2 text-amber-400">
                        {checkoutAdvice.map((dart, index) => (
                            <span key={index} className="bg-gray-800 px-2 py-1 rounded border border-amber-400">
                                {dart}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-2 text-xs" data-name="game-progress">
                <div className="text-center p-1 bg-gray-700 rounded">
                    <div className="font-semibold">Sets</div>
                    <div>{stats?.setsWon || 0}</div>
                </div>
                <div className="text-center p-1 bg-gray-700 rounded">
                    <div className="font-semibold">Legs</div>
                    <div>{stats?.legsWon || 0}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2" data-name="stats-and-history">
                <div className="text-center p-2 bg-gray-700 rounded text-sm">
                    <div className="font-semibold">Leg Avg:</div>
                    <div>{typeof stats?.legAverage === 'number' ? stats.legAverage.toFixed(2) : '0.00'}</div>
                </div>
                {lastScore !== undefined && lastScore !== null && (
                    <div className="text-center p-2 bg-gray-700 rounded text-sm">
                        <div className="font-semibold">Last:</div>
                        <div className="flex items-center justify-center">
                            {lastScore}
                            <i className="fas fa-history ml-1 cursor-pointer" onClick={onHistoryClick}></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
