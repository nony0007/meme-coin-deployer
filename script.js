document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tokenForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('tokenName').value.trim();
        const symbol = document.getElementById('tokenSymbol').value.trim();
        const imageUrl = document.getElementById('tokenImage').value.trim();
        const description = document.getElementById('tokenDescription').value.trim();
        const supply = document.getElementById('tokenSupply').value.trim();

        if (!name || !symbol || !supply) {
            alert('Please fill in required fields.');
            return;
        }

        try {
            await connectAGWWallet();
            await deployMemeToken({ name, symbol, imageUrl, description, supply });
            alert(`Token "${name}" with symbol "${symbol}" has been deployed!`);
            form.reset();
        } catch (error) {
            console.error(error);
            alert('There was an error deploying the token. Please check your wallet and try again.');
        }
    });
});

async function connectAGWWallet() {
    // Attempt to connect to the AGW wallet injected in the browser (similar to MetaMask)
    if (typeof window.agw === 'undefined') {
        throw new Error('AGW wallet not detected. Please install or enable your AGW wallet extension.');
    }
    // Request account access
    await window.agw.request({ method: 'eth_requestAccounts' });
}

async function deployMemeToken({ name, symbol, imageUrl, description, supply }) {
    // Replace this with the actual method provided by Abstract/AGW wallet for token deployment.
    // This is a placeholder call demonstrating how to pass parameters.
    if (typeof window.agw === 'undefined') {
        throw new Error('AGW wallet not detected.');
    }
    const params = {
        name,
        symbol,
        image: imageUrl,
        description,
        supply
    };
    await window.agw.request({ method: 'abstract_createToken', params });
}
