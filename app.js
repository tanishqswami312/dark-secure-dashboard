
// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const profileButton = document.getElementById('profileButton');
const dropdownContent = document.getElementById('dropdownContent');
const passwordGrid = document.getElementById('passwordGrid');
const addPasswordBtn = document.getElementById('addPasswordBtn');
const passwordModal = document.getElementById('passwordModal');
const passwordForm = document.getElementById('passwordForm');
const cancelBtn = document.getElementById('cancelBtn');
const modalTitle = document.getElementById('modalTitle');

// State
let passwords = [
    {
        id: 1,
        title: "Google Account",
        username: "john.doe",
        password: "securepass123",
        website: "google.com",
    },
    {
        id: 2,
        title: "GitHub",
        username: "johndoe",
        password: "devpass456",
        website: "github.com",
    },
    {
        id: 3,
        title: "Netflix",
        username: "john.doe@example.com",
        password: "netflixpass789",
        website: "netflix.com",
    }
];
let editingPasswordId = null;

// Toggle dropdown
profileButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileButton.contains(e.target)) {
        dropdownContent.classList.remove('show');
    }
});

// Show toast message
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    toast.style.background = type === 'success' ? 'hsl(142, 76%, 36%)' : 'hsl(0, 62.8%, 30.6%)';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Copy to clipboard
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text);
    showToast(`${type} copied to clipboard`);
}

// Create password card
function createPasswordCard(password) {
    const card = document.createElement('div');
    card.className = 'password-card glass';
    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${password.title}</h3>
                <p class="website">${password.website}</p>
            </div>
            <button class="button-icon" onclick="editPassword(${password.id})">
                <i data-lucide="edit-2"></i>
            </button>
        </div>
        <div class="password-row">
            <span class="label">Username</span>
            <div class="value-group">
                <span>${password.username}</span>
                <button class="button-icon" onclick="copyToClipboard('${password.username}', 'Username')">
                    <i data-lucide="copy"></i>
                </button>
            </div>
        </div>
        <div class="password-row">
            <span class="label">Password</span>
            <div class="value-group">
                <span class="password-value">${'•'.repeat(password.password.length)}</span>
                <button class="button-icon toggle-password-btn">
                    <i data-lucide="eye"></i>
                </button>
                <button class="button-icon" onclick="copyToClipboard('${password.password}', 'Password')">
                    <i data-lucide="copy"></i>
                </button>
            </div>
        </div>
    `;

    // Add toggle password functionality
    const toggleBtn = card.querySelector('.toggle-password-btn');
    const passwordValue = card.querySelector('.password-value');
    let isVisible = false;

    toggleBtn.addEventListener('click', () => {
        isVisible = !isVisible;
        passwordValue.textContent = isVisible ? password.password : '•'.repeat(password.password.length);
        toggleBtn.innerHTML = `<i data-lucide="${isVisible ? 'eye-off' : 'eye'}"></i>`;
        lucide.createIcons();
    });

    return card;
}

// Render password cards
function renderPasswords() {
    passwordGrid.innerHTML = '';
    passwords.forEach(password => {
        passwordGrid.appendChild(createPasswordCard(password));
    });
    lucide.createIcons();
}

// Show modal
function showModal(editing = false) {
    passwordModal.classList.add('show');
    modalTitle.textContent = editing ? 'Edit Password' : 'Add New Password';
    const submitBtn = passwordForm.querySelector('button[type="submit"]');
    submitBtn.textContent = editing ? 'Save Changes' : 'Add Password';
}

// Hide modal
function hideModal() {
    passwordModal.classList.remove('show');
    passwordForm.reset();
    editingPasswordId = null;
}

// Edit password
function editPassword(id) {
    const password = passwords.find(p => p.id === id);
    if (password) {
        editingPasswordId = id;
        const form = passwordForm;
        form.titleInput.value = password.title;
        form.usernameInput.value = password.username;
        form.websiteInput.value = password.website;
        form.passwordInput.value = password.password;
        form.confirmPasswordInput.value = password.password;
        showModal(true);
    }
}

// Event Listeners
addPasswordBtn.addEventListener('click', () => showModal(false));
cancelBtn.addEventListener('click', hideModal);

passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        title: e.target.titleInput.value,
        username: e.target.usernameInput.value,
        website: e.target.websiteInput.value,
        password: e.target.passwordInput.value,
    };
    
    if (formData.password !== e.target.confirmPasswordInput.value) {
        showToast("Passwords don't match!", 'error');
        return;
    }
    
    if (editingPasswordId) {
        passwords = passwords.map(p =>
            p.id === editingPasswordId ? { ...formData, id: p.id } : p
        );
        showToast('Password updated successfully!');
    } else {
        const newPassword = {
            ...formData,
            id: Math.max(...passwords.map(p => p.id)) + 1,
        };
        passwords.push(newPassword);
        showToast('Password added successfully!');
    }
    
    hideModal();
    renderPasswords();
});

// Initialize
renderPasswords();
