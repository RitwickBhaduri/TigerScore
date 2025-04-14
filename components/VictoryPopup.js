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

        // Generate confetti pieces with different styles based on victory type
        const renderConfetti = () => {
            const confettiColors = {
                leg: ['#E5931B', '#fcd34d', '#fbbf24'],
                set: ['#E5931B', '#fcd34d', '#fbbf24', '#f97316', '#ea580c'],
                match: ['#E5931B', '#fcd34d', '#fbbf24', '#f97316', '#ea580c', '#ffffff', '#fef3c7']
            };

            const shapes = ['confetti-square', 'confetti-circle', 'confetti-triangle'];
            const pieces = [];
            const numPieces = type === 'leg' ? 30 : type === 'set' ? 50 : 70;
            const colors = confettiColors[type];

            for (let i = 0; i < numPieces; i++) {
                const style = {
                    left: `${Math.random() * 100}%`,
                    top: `-10px`,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    animationDelay: `${Math.random() * 2}s`
                };

                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                pieces.push(
                    <div 
                        key={i} 
                        className={`confetti confetti-${type} ${shape}`} 
                        style={style}
                    ></div>
                );
            }

            return pieces;
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 victory-popup" data-name="victory-popup">
                {renderConfetti()}
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full text-center victory-content">
                    <h2 className="text-2xl font-bold text-primary mb-4 victory-text">{getMessage()}</h2>
                    
                    {type === 'match' ? (
                        <button
                            onClick={onHome}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors transform hover:scale-105"
                            data-name="home-button"
                        >
                            Back to Home
                        </button>
                    ) : (
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors transform hover:scale-105"
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