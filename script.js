
        const miningButton = document.querySelector('.mining-button');
        const balanceDisplay = document.getElementById('balance');
        const hashDisplay = document.getElementById('hashDisplay');
        const miningBox = document.getElementById('miningBox');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const authModal = document.getElementById('authModal');
        const passphraseInput = document.getElementById('passphraseInput');
        const authActionBtn = document.getElementById('authActionBtn');
        const authMessage = document.getElementById('authMessage');

        let isMining = false;
        let balance = 0;
        let miningInterval;
        let hashInterval;
        const FIXED_PASSPHRASE = 'Brassetz1';

        function checkLoginStatus() {
            const savedLogin = localStorage.getItem('isLoggedIn');
            const savedBalance = localStorage.getItem('balance');
            if (savedLogin === 'true') {
                if (savedBalance !== null) {
                    balance = parseFloat(savedBalance);
                } else {
                    balance = 0;
                }
                balanceDisplay.textContent = balance.toFixed(1);
                enableMiningUI();
            }
        }

        // Check login status on page load
        checkLoginStatus();

        function updateBalance() {
            balance += 0.1;
            balanceDisplay.textContent = balance.toFixed(1);
            localStorage.setItem('balance', balance.toString());
        }

        function generateHash() {
            return [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        }

        function updateHash() {
            hashDisplay.textContent = `Trying hash: Difficulty level 1 ${generateHash()}`;
        }

        function enableMiningUI() {
            miningBox.classList.add('active');
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
            localStorage.setItem('isLoggedIn', 'true');
        }

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('active');
            authMessage.textContent = 'Enter mining key';
        });

        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            miningBox.classList.remove('active');
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
            if (isMining) {
                clearInterval(miningInterval);
                clearInterval(hashInterval);
                miningButton.textContent = 'Start Mining';
                isMining = false;
            }
            balanceDisplay.textContent = '0.0';
        });

        authActionBtn.addEventListener('click', () => {
            const enteredPassphrase = passphraseInput.value;
            if (enteredPassphrase === FIXED_PASSPHRASE) {
                authModal.classList.remove('active');
                enableMiningUI();
                const savedBalance = localStorage.getItem('balance');
                if (savedBalance !== null) {
                    balance = parseFloat(savedBalance);
                } else {
                    balance = 0;
                }
                balanceDisplay.textContent = balance.toFixed(1);
            } else {
                authMessage.textContent = 'Invalid passphrase. Please try again.';
            }
        });

        miningButton.addEventListener('click', () => {
            if (localStorage.getItem('isLoggedIn') !== 'true') {
                alert('Please login to start mining.');
                return;
            }

            if (isMining) {
                clearInterval(miningInterval);
                clearInterval(hashInterval);
                miningButton.textContent = 'Start Mining';
                isMining = false;
            } else {
                miningInterval = setInterval(updateBalance, 1000);
                hashInterval = setInterval(updateHash, 100);
                miningButton.textContent = 'Stop Mining';
                isMining = true;
            }
        });
       
   