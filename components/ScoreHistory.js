function ScoreHistory({ isOpen, onClose, scores, playerName }) {
    try {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="score-history-modal">
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">{playerName}'s Scores</h3>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-white"
                            data-name="close-history"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div className="space-y-2" data-name="score-list">
                        {scores.map((score, index) => (
                            <div 
                                key={index}
                                className="flex justify-between p-3 bg-gray-700 rounded"
                                data-name={`score-item-${index}`}
                            >
                                <span>#{scores.length - index}</span>
                                <span className="font-semibold">{scores[scores.length - 1 - index]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ScoreHistory component error:', error);
        reportError(error);
        return null;
    }
}
