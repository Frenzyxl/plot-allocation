// DOM Elements
const plots = document.querySelectorAll(".plot");
const plotDetails = document.getElementById("plotDetails");
const closeDetails = document.getElementById("closeDetails");
const actionModal = document.getElementById("actionModal");
const closeModal = document.getElementById("closeModal");
const cancelAction = document.getElementById("cancelAction");
const actionForm = document.getElementById("actionForm");
const notification = document.getElementById("notification");
const closeNotification = document.getElementById("closeNotification");
const randomizeBtn = document.getElementById("randomizeBtn");

// Plot detail elements
const plotId = document.getElementById("plotId");
const plotSize = document.getElementById("plotSize");
const plotPrice = document.getElementById("plotPrice");
const plotStatus = document.getElementById("plotStatus");
const reserveBtn = document.getElementById("reserveBtn");
const purchaseBtn = document.getElementById("purchaseBtn");
const modalTitle = document.getElementById("modalTitle");
const confirmAction = document.getElementById("confirmAction");

// Current selected plot
let selectedPlot = null;
let currentAction = "";

// Configuration: Blocks to exclude (grey out and make non-interactive)
const excludedBlocks = [
  // Add the block IDs you want to exclude here
  // Example: 'block-f', 'block-h', 'block-q'
  "block-h",
  "block-q",
  "block-f",
];

// All possible layout blocks
const allLayoutBlocks = [
  { id: "block-a", name: "Block A" },
  { id: "block-b", name: "Block B" },
  { id: "block-c", name: "Block C" },
  { id: "block-d", name: "Block D" },
  { id: "block-e", name: "Block E" },
  { id: "block-f", name: "Block F" },
  { id: "block-g", name: "Block G" },
  { id: "block-h", name: "Block H" },
  { id: "block-i", name: "Block I" },
  { id: "block-j", name: "Block J" },
  { id: "block-k", name: "Block K" },
  { id: "block-l", name: "Block L" },
  { id: "block-m", name: "Block M" },
  { id: "block-n", name: "Block N" },
  { id: "block-o", name: "Block O" },
  { id: "block-p", name: "Block P" },
  { id: "block-q", name: "Block Q" },
  { id: "block-r", name: "Block R" },
  { id: "block-s", name: "Block S" },
  { id: "block-t", name: "Block T" },
  { id: "block-u", name: "Block U" },
];

// Filter out excluded blocks to create the active blocks list
const layoutBlocks = allLayoutBlocks.filter(
  (block) => !excludedBlocks.includes(block.id)
);

// Layout block status map
const layoutBlockStatus = {};

// Initialize all event listeners
function initializeEventListeners() {
  // Close buttons
  closeDetails.addEventListener("click", hidePlotDetails);
  closeModal.addEventListener("click", hideModal);
  cancelAction.addEventListener("click", hideModal);
  closeNotification.addEventListener("click", hideNotification);

  // Action buttons
  reserveBtn.addEventListener("click", () => showActionModal("reserve"));
  purchaseBtn.addEventListener("click", () => showActionModal("purchase"));

  // Randomize button
  if (randomizeBtn) {
    randomizeBtn.addEventListener("click", randomizeAllStatuses);
  }

  // Form submission
  actionForm.addEventListener("submit", handleFormSubmission);

  // Close modal when clicking outside
  actionModal.addEventListener("click", (e) => {
    if (e.target === actionModal) {
      hideModal();
    }
  });

  // Close details when clicking outside
  document.addEventListener("click", (e) => {
    if (!plotDetails.contains(e.target) && !e.target.closest(".plot")) {
      hidePlotDetails();
    }
  });
}

// Hide plot details
function hidePlotDetails() {
  plotDetails.classList.remove("active");
  layoutBlocks.forEach((b) => {
    const e = document.getElementById(b.id);
    if (e) e.classList.remove("selected");
  });
  selectedPlot = null;
}

// Show action modal
function showActionModal(action) {
  if (!selectedPlot) {
    showNotification("Please select a block first.", "error");
    return;
  }

  currentAction = action;

  if (action === "reserve") {
    modalTitle.textContent = "Reserve Block";
    confirmAction.textContent = "Reserve Block";
    confirmAction.className = "btn btn-primary";
  } else {
    modalTitle.textContent = "Purchase Block";
    confirmAction.textContent = "Purchase Block";
    confirmAction.className = "btn btn-primary";
  }

  // Clear form
  actionForm.reset();

  // Show modal
  actionModal.classList.add("active");
}

// Hide modal
function hideModal() {
  actionModal.classList.remove("active");
  currentAction = "";
}

// Handle form submission
function handleFormSubmission(e) {
  e.preventDefault();

  const formData = new FormData(actionForm);
  const clientData = {
    name: document.getElementById("clientName").value,
    email: document.getElementById("clientEmail").value,
    phone: document.getElementById("clientPhone").value,
    id: document.getElementById("clientId").value,
    action: currentAction,
    plotId: selectedPlot ? selectedPlot.id : "Unknown",
  };

  // Validate form data
  if (
    !clientData.name ||
    !clientData.email ||
    !clientData.phone ||
    !clientData.id
  ) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  if (!isValidEmail(clientData.email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  if (!isValidPhone(clientData.phone)) {
    showNotification("Please enter a valid phone number.", "error");
    return;
  }

  // Process the action
  processPlotAction(clientData);
}

// Show notification
function showNotification(message, type = "info") {
  const notificationMessage = document.getElementById("notificationMessage");
  notificationMessage.textContent = message;

  // Set notification type
  notification.className = `notification ${type}`;

  // Show notification
  notification.classList.add("active");

  // Auto hide after 5 seconds
  setTimeout(() => {
    hideNotification();
  }, 5000);
}

// Hide notification
function hideNotification() {
  notification.classList.remove("active");
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
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal();
    hidePlotDetails();
  }
});

// Utility to randomize status
function randomStatus() {
  const statuses = ["available", "sold", "reserved"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];
  return status;
}

// Function to randomize all statuses
function randomizeAllStatuses() {
  layoutBlocks.forEach((block) => {
    const status = randomStatus();
    layoutBlockStatus[block.id] = status;

    // Try multiple ways to find the element
    let el =
      document.getElementById(block.id) ||
      document.querySelector(`path[id="${block.id}"]`) ||
      document.querySelector(`path[title="${block.name}"]`);

    if (el) {
      // Clear existing status classes
      el.classList.remove("available", "sold", "reserved");
      // Add new status
      el.classList.add(status);
    }
  });

  // Update statistics
  updateStatistics();

  // Show notification
  showNotification("All block statuses have been randomized!", "success");
}

// Handle layout block click
function handleLayoutBlockClick(block, el) {
  // Remove previous selection
  layoutBlocks.forEach((b) => {
    const e =
      document.getElementById(b.id) ||
      document.querySelector(`path[id="${b.id}"]`) ||
      document.querySelector(`path[title="${b.name}"]`);
    if (e) e.classList.remove("selected");
  });

  el.classList.add("selected");
  selectedPlot = el;

  showPlotDetailsForLayoutBlock(block, el);
}

// Show details for a layout block
function showPlotDetailsForLayoutBlock(block, el) {
  plotId.textContent = block.name;
  plotSize.textContent = "500 sqm - 1000 sqm";
  plotPrice.textContent =
    "₦" + (Math.floor(Math.random() * 5) * 500000 + 2000000).toLocaleString();
  const status = layoutBlockStatus[block.id];
  plotStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);

  // Show/hide action buttons
  if (status === "available") {
    reserveBtn.style.display = "flex";
    purchaseBtn.style.display = "flex";
    purchaseBtn.textContent = "Purchase Now";
  } else if (status === "reserved") {
    reserveBtn.style.display = "none";
    purchaseBtn.style.display = "flex";
    purchaseBtn.textContent = "Purchase Reserved Block";
  } else {
    reserveBtn.style.display = "none";
    purchaseBtn.style.display = "none";
  }

  plotDetails.classList.add("active");
}

// On DOMContentLoaded, randomize and color blocks
window.addEventListener("DOMContentLoaded", () => {
  // Initialize event listeners for modals and UI
  initializeEventListeners();

  // Debug: Check if SVG elements exist
  const allPaths = document.querySelectorAll('path[id^="block-"]');

  // Handle all blocks (both active and excluded)
  allLayoutBlocks.forEach((block) => {
    // Try multiple ways to find the element
    let el = document.getElementById(block.id);
    if (!el) {
      // Fallback: try querySelector
      el = document.querySelector(`path[id="${block.id}"]`);
    }
    if (!el) {
      // Fallback: try by title attribute
      el = document.querySelector(`path[title="${block.name}"]`);
    }

    if (el) {
      if (excludedBlocks.includes(block.id)) {
        // This is an excluded block - make it grey and non-interactive
        el.classList.add("excluded");
      } else {
        // This is an active block - assign random status and make interactive
        const status = randomStatus();
        layoutBlockStatus[block.id] = status;
        el.classList.add(status);

        // Add click event listener
        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          handleLayoutBlockClick(block, el);
        });
      }
    } else {
    }
  });

  updateStatistics();

  // Add a global click handler to debug any issues
  document.addEventListener("click", (e) => {
    if (
      e.target.tagName === "path" &&
      e.target.id &&
      e.target.id.startsWith("block-")
    ) {
    }
  });
});

// Update statistics for blocks
function updateStatistics() {
  const totalBlocks = layoutBlocks.length;

  let available = 0,
    sold = 0,
    reserved = 0;

  // Count blocks
  layoutBlocks.forEach((block) => {
    const status = layoutBlockStatus[block.id];
    if (status === "available") available++;
    else if (status === "sold") sold++;
    else if (status === "reserved") reserved++;
  });

  const statCards = document.querySelectorAll(".stat-content h3");
  if (statCards.length >= 4) {
    statCards[0].textContent = totalBlocks;
    statCards[1].textContent = available;
    statCards[2].textContent = sold;
    statCards[3].textContent = reserved;
  }
}

// Process plot action for blocks
function processPlotAction(clientData) {
  // Check if confirmAction element exists
  if (!confirmAction) {
    console.error("Confirm action element not found!");
    showNotification("Error: Form button not found", "error");
    return;
  }

  // Show loading state
  confirmAction.disabled = true;
  confirmAction.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Processing...';

  setTimeout(() => {
    // Get block name
    const itemName = selectedPlot.id.replace("block-", "").toUpperCase();

    // Show success notification
    if (currentAction === "reserve") {
      showNotification(
        `Block ${itemName} has been reserved successfully!`,
        "success"
      );
    } else {
      showNotification(
        `Block ${itemName} has been purchased successfully!`,
        "success"
      );
    }

    // Reset button and hide modal
    confirmAction.disabled = false;
    confirmAction.innerHTML =
      currentAction === "reserve" ? "Reserve Block" : "Purchase Block";
    hideModal();
  }, 1000);
}
