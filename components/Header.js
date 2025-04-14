function Header({ onNewGame }) {
    try {
        return (
            <header className="bg-gray-800 shadow-lg p-4" data-name="header">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2" data-name="brand">
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/64d109f4-e371-498b-967e-d89d998c59c1.png"
                            alt="TigerScore Logo"
                            className="h-8"
                            data-name="brand-logo"
                        />
                    </div>
                    <nav data-name="nav-menu">
                        <button 
                            onClick={onNewGame}
                            className="text-gray-300 hover:text-primary transition-colors" 
                            data-name="new-game-btn"
                        >
                            <i className="fas fa-plus-circle mr-1"></i>
                            New Game
                        </button>
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
