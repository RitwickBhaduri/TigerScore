function GameControls({ onUndo, onRedo, canUndo, canRedo }) {
    try {
        return (
            <div className="flex justify-center gap-4 mb-4" data-name="game-controls">
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`px-4 py-2 rounded flex items-center ${
                        canUndo ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    data-name="undo-btn"
                >
                    <i className="fas fa-undo mr-2"></i>
                    Undo
                </button>
                <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className={`px-4 py-2 rounded flex items-center ${
                        canRedo ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    data-name="redo-btn"
                >
                    <i className="fas fa-redo mr-2"></i>
                    Redo
                </button>
            </div>
        );
    } catch (error) {
        console.error('GameControls component error:', error);
        reportError(error);
        return null;
    }
}
