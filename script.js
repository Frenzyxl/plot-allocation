// DOM Elements
const plots = document.querySelectorAll('.plot');
const plotDetails = document.getElementById('plotDetails');
const closeDetails = document.getElementById('closeDetails');
const actionModal = document.getElementById('actionModal');
const closeModal = document.getElementById('closeModal');
const cancelAction = document.getElementById('cancelAction');
const actionForm = document.getElementById('actionForm');
const notification = document.getElementById('notification');
const closeNotification = document.getElementById('closeNotification');

// Plot detail elements
const plotId = document.getElementById('plotId');
const plotSize = document.getElementById('plotSize');
const plotPrice = document.getElementById('plotPrice');
const plotStatus = document.getElementById('plotStatus');
const reserveBtn = document.getElementById('reserveBtn');
const purchaseBtn = document.getElementById('purchaseBtn');
const modalTitle = document.getElementById('modalTitle');
const confirmAction = document.getElementById('confirmAction');

// Current selected plot
let selectedPlot = null;
let currentAction = '';

// Nigeria state IDs and names
const nigeriaStates = [
  { id: 'NG-AB', name: 'Abia' },
  { id: 'NG-AD', name: 'Adamawa' },
  { id: 'NG-AK', name: 'Akwa Ibom' },
  { id: 'NG-AN', name: 'Anambra' },
  { id: 'NG-BA', name: 'Bauchi' },
  { id: 'NG-BE', name: 'Benue' },
  { id: 'NG-BO', name: 'Borno' },
  { id: 'NG-BY', name: 'Bayelsa' },
  { id: 'NG-CR', name: 'Cross River' },
  { id: 'NG-DE', name: 'Delta' },
  { id: 'NG-EB', name: 'Ebonyi' },
  { id: 'NG-ED', name: 'Edo' },
  { id: 'NG-EK', name: 'Ekiti' },
  { id: 'NG-EN', name: 'Enugu' },
  { id: 'NG-FC', name: 'Federal Capital Territory' },
  { id: 'NG-GO', name: 'Gombe' },
  { id: 'NG-IM', name: 'Imo' },
  { id: 'NG-JI', name: 'Jigawa' },
  { id: 'NG-KD', name: 'Kaduna' },
  { id: 'NG-KE', name: 'Kebbi' },
  { id: 'NG-KN', name: 'Kano' },
  { id: 'NG-KO', name: 'Kogi' },
  { id: 'NG-KW', name: 'Kwara' },
  { id: 'NG-LA', name: 'Lagos' },
  { id: 'NG-NA', name: 'Nassarawa' },
  { id: 'NG-NI', name: 'Niger' },
  { id: 'NG-OG', name: 'Ogun' },
  { id: 'NG-ON', name: 'Ondo' },
  { id: 'NG-OS', name: 'Osun' },
  { id: 'NG-OY', name: 'Oyo' },
  { id: 'NG-PL', name: 'Plateau' },
  { id: 'NG-RI', name: 'Rivers' },
  { id: 'NG-SO', name: 'Sokoto' },
  { id: 'NG-TA', name: 'Taraba' },
  { id: 'NG-YO', name: 'Yobe' },
  { id: 'NG-ZA', name: 'Zamfara' }
];

// State status map
const stateStatus = {};

// Initialize all event listeners
function initializeEventListeners() {
    // Close buttons
    closeDetails.addEventListener('click', hidePlotDetails);
    closeModal.addEventListener('click', hideModal);
    cancelAction.addEventListener('click', hideModal);
    closeNotification.addEventListener('click', hideNotification);

    // Action buttons
    reserveBtn.addEventListener('click', () => showActionModal('reserve'));
    purchaseBtn.addEventListener('click', () => showActionModal('purchase'));

    // Form submission
    actionForm.addEventListener('submit', handleFormSubmission);

    // Close modal when clicking outside
    actionModal.addEventListener('click', (e) => {
        if (e.target === actionModal) {
            hideModal();
        }
    });

    // Close details when clicking outside
    document.addEventListener('click', (e) => {
        if (!plotDetails.contains(e.target) && !e.target.closest('.plot')) {
            hidePlotDetails();
        }
    });
}

// Hide plot details
function hidePlotDetails() {
    plotDetails.classList.remove('active');
    nigeriaStates.forEach(s => {
        const e = document.getElementById(s.id);
        if (e) e.classList.remove('selected');
    });
    selectedPlot = null;
}

// Show action modal
function showActionModal(action) {
    if (!selectedPlot) {
        showNotification('Please select a state first.', 'error');
        return;
    }

    currentAction = action;
    
    if (action === 'reserve') {
        modalTitle.textContent = 'Reserve State';
        confirmAction.textContent = 'Reserve State';
        confirmAction.className = 'btn btn-primary';
    } else {
        modalTitle.textContent = 'Purchase State';
        confirmAction.textContent = 'Purchase State';
        confirmAction.className = 'btn btn-primary';
    }

    // Clear form
    actionForm.reset();
    
    // Show modal
    actionModal.classList.add('active');
}

// Hide modal
function hideModal() {
    actionModal.classList.remove('active');
    currentAction = '';
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(actionForm);
    const clientData = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        id: document.getElementById('clientId').value,
        action: currentAction,
        plotId: selectedPlot ? selectedPlot.id : 'Unknown'
    };

    // Validate form data
    if (!clientData.name || !clientData.email || !clientData.phone || !clientData.id) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    if (!isValidEmail(clientData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    if (!isValidPhone(clientData.phone)) {
        showNotification('Please enter a valid phone number.', 'error');
        return;
    }

    // Process the action
    processPlotAction(clientData);
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationMessage = document.getElementById('notificationMessage');
    notificationMessage.textContent = message;
    
    // Set notification type
    notification.className = `notification ${type}`;
    
    // Show notification
    notification.classList.add('active');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

// Hide notification
function hideNotification() {
    notification.classList.remove('active');
}

// Utility function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to validate phone number
function isValidPhone(phone) {
    // Nigerian phone number validation - accepts formats like:
    // 08026780157, +2348026780157, 2348026780157, 8026780157
    const phoneRegex = /^(\+?234|0)?[789][01]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideModal();
        hidePlotDetails();
    }
});

// Utility to randomize status
function randomStatus() {
  const statuses = ['available', 'sold', 'reserved'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Handle state click
function handleStateClick(state, el) {
  console.log('=== STATE CLICK DEBUG ===');
  console.log('State clicked:', state.name, state.id);
  console.log('Element:', el);
  
  // Remove previous selection
  nigeriaStates.forEach(s => {
    const e = document.getElementById(s.id);
    if (e) e.classList.remove('selected');
  });
  el.classList.add('selected');
  selectedPlot = el;
  console.log('Selected plot set to:', selectedPlot);
  
  showPlotDetailsForState(state, el);
}

// Show details for a state
function showPlotDetailsForState(state, el) {
  console.log('=== SHOW DETAILS DEBUG ===');
  console.log('Showing details for state:', state.name);
  
  // Check if DOM elements exist
  console.log('plotId element:', plotId);
  console.log('plotDetails element:', plotDetails);
  
  plotId.textContent = state.name;
  plotSize.textContent = 'N/A';
  plotPrice.textContent = '₦' + (Math.floor(Math.random() * 10) * 1000000 + 5000000).toLocaleString();
  const status = stateStatus[state.id];
  plotStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);

  // Show/hide action buttons
  if (status === 'available') {
    reserveBtn.style.display = 'flex';
    purchaseBtn.style.display = 'flex';
  } else if (status === 'reserved') {
    reserveBtn.style.display = 'none';
    purchaseBtn.style.display = 'flex';
    purchaseBtn.textContent = 'Purchase Reserved State';
  } else {
    reserveBtn.style.display = 'none';
    purchaseBtn.style.display = 'none';
  }
  
  console.log('Before adding active class - plotDetails classes:', plotDetails.className);
  plotDetails.classList.add('active');
  console.log('After adding active class - plotDetails classes:', plotDetails.className);
  
  // Check computed styles
  const computedStyle = window.getComputedStyle(plotDetails);
  console.log('Computed display:', computedStyle.display);
  console.log('Computed opacity:', computedStyle.opacity);
  console.log('Computed visibility:', computedStyle.visibility);
  console.log('Computed position:', computedStyle.position);
  console.log('Computed top:', computedStyle.top);
  console.log('Computed left:', computedStyle.left);
  console.log('Computed width:', computedStyle.width);
  console.log('Computed height:', computedStyle.height);
}

// On DOMContentLoaded, randomize and color states
window.addEventListener('DOMContentLoaded', () => {
  // Initialize event listeners for modals and UI
  initializeEventListeners();
  
  // Assign random status to each state
  nigeriaStates.forEach(state => {
    const status = randomStatus();
    stateStatus[state.id] = status;
    const el = document.getElementById(state.id);
    if (el) {
      el.classList.add(status);
      console.log(`Found element for ${state.id} (${state.name}):`, el);
      
      el.addEventListener('click', (e) => {
        console.log('=== CLICK EVENT FIRED ===');
        console.log('Event target:', e.target);
        console.log('State clicked:', state.name, state.id);
        console.log('Element:', el);
        e.preventDefault();
        e.stopPropagation();
        handleStateClick(state, el);
      });
      
      // Also add a simple test click to see if it's clickable
      el.addEventListener('mousedown', () => {
        console.log(`Mouse down on ${state.name}`);
      });
      
      console.log(`Added click listener to ${state.id} (${state.name})`);
    } else {
      console.log(`WARNING: Element not found for ${state.id} (${state.name})`);
    }
  });
  updateStatistics();
});

// Update statistics for states
function updateStatistics() {
  const total = nigeriaStates.length;
  let available = 0, sold = 0, reserved = 0;
  nigeriaStates.forEach(state => {
    const status = stateStatus[state.id];
    if (status === 'available') available++;
    else if (status === 'sold') sold++;
    else if (status === 'reserved') reserved++;
  });
  const statCards = document.querySelectorAll('.stat-content h3');
  if (statCards.length >= 4) {
    statCards[0].textContent = total;
    statCards[1].textContent = available;
    statCards[2].textContent = sold;
    statCards[3].textContent = reserved;
  }
}

// Process plot action for states
function processPlotAction(clientData) {
  console.log('Processing action for:', clientData);
  console.log('Confirm action element:', confirmAction);
  
  // Check if confirmAction element exists
  if (!confirmAction) {
    console.error('Confirm action element not found!');
    showNotification('Error: Form button not found', 'error');
    return;
  }
  
  // Show loading state
  confirmAction.disabled = true;
  confirmAction.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  console.log('Set loading state');
  
  setTimeout(() => {
    console.log('Timeout completed');
    // Show success notification
    if (currentAction === 'reserve') {
      showNotification(`State ${selectedPlot.id.replace('NG-', '')} has been reserved successfully!`, 'success');
    } else {
      showNotification(`State ${selectedPlot.id.replace('NG-', '')} has been purchased successfully!`, 'success');
    }
    
    // Reset button and hide modal
    confirmAction.disabled = false;
    confirmAction.innerHTML = currentAction === 'reserve' ? 'Reserve State' : 'Purchase State';
    hideModal();
    
    console.log('Transaction completed:', clientData);
  }, 1000);
} 