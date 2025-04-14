function VictoryPopup({ type, winner, onClose, onHome }) {
    try {
        if (!winner) return null;

        const getMessage = () => {
            switch (type) {
                case 'leg':
                    return `${winner} wins the leg!`;
                case 'set':
                    return `${winner} wins the set!`;
                case 'match':
                    return `${winner} wins the match!`;
                default:
                    return '';
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="victory-popup">
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full text-center animate-bounce-once">
                    <h2 className="text-2xl font-bold text-amber-500 mb-4">{getMessage()}</h2>
                    
                    {type === 'match' ? (
                        <button
                            onClick={onHome}
                            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                            data-name="home-button"
                        >
                            Back to Home
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                            data-name="continue-button"
                        >
                            Continue
                        </button>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('VictoryPopup component error:', error);
        reportError(error);
        return null;
    }
} 