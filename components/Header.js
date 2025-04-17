function Header({ onNewGame, isGameStarted }) {
    try {
        const handleLogoClick = () => {
            // Reload the page to show splash screen
            window.location.reload();
        };

        const showDownloadInstructions = () => {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            const isAndroid = /Android/.test(navigator.userAgent);
            
            let instructions = '';
            if (isIOS) {
                instructions = 'To install TigerScore on iOS:\n\n' +
                    '1. Open Safari browser\n' +
                    '2. Tap the Share button (square with up arrow)\n' +
                    '3. Scroll down and tap "Add to Home Screen"\n' +
                    '4. Tap "Add" in the top right corner';
            } else if (isAndroid) {
                instructions = 'To install TigerScore on Android:\n\n' +
                    '1. Open Chrome browser\n' +
                    '2. Tap the three dots menu\n' +
                    '3. Select "Add to Home screen"\n' +
                    '4. Tap "Add" to install';
            } else {
                instructions = 'To install TigerScore:\n\n' +
                    '1. Click the three dots menu in your browser\n' +
                    '2. Select "Install TigerScore"\n' +
                    '3. Follow the prompts to install';
            }
            
            alert(instructions);
        };

        return (
            <header className="bg-gray-800 shadow-lg p-4" data-name="header">
                <div className="container mx-auto flex justify-between items-center">
                    <div 
                        className="flex items-center space-x-2 cursor-pointer" 
                        data-name="brand"
                        onClick={handleLogoClick}
                    >
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/64d109f4-e371-498b-967e-d89d998c59c1.png"
                            alt="TigerScore Logo"
                            className="h-8"
                            data-name="brand-logo"
                        />
                    </div>
                    <nav data-name="nav-menu">
                        {isGameStarted ? (
                            <button 
                                onClick={onNewGame}
                                className="text-gray-300 hover:text-primary transition-colors" 
                                data-name="new-game-btn"
                            >
                                <i className="fas fa-plus-circle mr-1"></i>
                                New Game
                            </button>
                        ) : (
                            <button 
                                onClick={showDownloadInstructions}
                                className="text-gray-300 hover:text-primary transition-colors" 
                                data-name="download-btn"
                            >
                                <i className="fas fa-download mr-1"></i>
                                Install App
                            </button>
                        )}
                    </nav>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
