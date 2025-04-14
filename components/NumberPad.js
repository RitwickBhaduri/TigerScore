function NumberPad({ value, onChange, onSubmit }) {
    try {
        const handleNumberClick = (num) => {
            if (value.length < 3) {
                onChange(value + num);
            }
        };

        const handleBackspace = () => {
            onChange(value.slice(0, -1));
        };

        const handleSubmit = () => {
            if (value) {
                onSubmit(value);
            }
        };

        return (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg" data-name="number-pad">
                <div className="mb-4">
                    <input
                        type="text"
                        value={value}
                        readOnly
                        className="w-full p-3 text-2xl text-center bg-gray-700 rounded"
                        placeholder="Enter score"
                        data-name="score-display"
                    />
                </div>
                
                <div className="grid grid-cols-3 gap-2 number-pad" data-name="number-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button
                            key={num}
                            onClick={() => handleNumberClick(num)}
                            className="p-4 text-xl bg-gray-700 hover:bg-gray-600 rounded"
                            data-name={`num-${num}-btn`}
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={handleBackspace}
                        className="p-4 text-xl bg-gray-700 hover:bg-gray-600 rounded"
                        data-name="backspace-btn"
                    >
                        <i className="fas fa-backspace"></i>
                    </button>
                    <button
                        onClick={() => handleNumberClick(0)}
                        className="p-4 text-xl bg-gray-700 hover:bg-gray-600 rounded"
                        data-name="num-0-btn"
                    >
                        0
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="p-4 text-xl bg-amber-500 hover:bg-amber-600 rounded"
                        data-name="submit-btn"
                    >
                        <i className="fas fa-check"></i>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('NumberPad component error:', error);
        reportError(error);
        return null;
    }
}
