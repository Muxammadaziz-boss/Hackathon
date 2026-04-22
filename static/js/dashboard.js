// Dashboard JavaScript functionality

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize real-time updates if enabled
    if (typeof ENABLE_REAL_TIME_UPDATES !== 'undefined' && ENABLE_REAL_TIME_UPDATES) {
        startRealTimeUpdates();
    }
    
    // Initialize activity feed
    initializeActivityFeed();
    
    // Initialize stat animations
    animateStats();
}

// Animate statistics on page load
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'slideIn 0.5s ease forwards';
        }, index * 100);
    });
}

// Real-time updates
function startRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
        updateDashboardStats();
    }, 30000);
}

function updateDashboardStats() {
    fetch('/dashboard/api/stats/')
        .then(response => response.json())
        .then(data => {
            updateStatCards(data);
        })
        .catch(error => console.error('Error updating stats:', error));
}

function updateStatCards(data) {
    // Update stat values with animation
    Object.keys(data).forEach(key => {
        const element = document.querySelector(`[data-stat="${key}"]`);
        if (element) {
            const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, ''));
            const newValue = data[key];
            animateValue(element, currentValue, newValue, 1000);
        }
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = formatNumber(end);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.round(current));
        }
    }, 16);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Activity feed
function initializeActivityFeed() {
    // Add click handlers to activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            // Handle activity item click
            console.log('Activity item clicked:', this);
        });
    });
}

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #1e293b;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    // Store reference for cleanup
    element._tooltip = tooltip;
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            handleSearch(searchTerm);
        });
    }
}

function handleSearch(searchTerm) {
    if (searchTerm.length < 2) {
        clearSearch();
        return;
    }
    
    // Search users table
    const userRows = document.querySelectorAll('.data-table tbody tr');
    userRows.forEach(row => {
        const userName = row.querySelector('.user-name')?.textContent.toLowerCase() || '';
        const userEmail = row.querySelector('.user-email')?.textContent.toLowerCase() || '';
        
        if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // Search activity items
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        const title = item.querySelector('.activity-title')?.textContent.toLowerCase() || '';
        const description = item.querySelector('.activity-description')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
    
    console.log('Searching for:', searchTerm);
}

function clearSearch() {
    // Reset all rows to visible
    const userRows = document.querySelectorAll('.data-table tbody tr');
    userRows.forEach(row => row.style.display = '');
    
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => item.style.display = '');
}

// Button handlers
function initializeButtons() {
    // Refresh button
    const refreshBtn = document.querySelector('.btn-refresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            refreshDashboard();
        });
    }
    
    // Export button
    const exportBtn = document.querySelector('.btn-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportData();
        });
    }
}

function refreshDashboard() {
    // Show loading state
    document.body.classList.add('loading');
    
    // Update stats
    updateDashboardStats();
    
    // Remove loading state after delay
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 1000);
}

function exportData() {
    console.log('Exporting data...');
    // Implement data export functionality
}

// Utility functions
function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

function getStatusBadge(status) {
    const badges = {
        'active': '<span class="status-badge active">Active</span>',
        'inactive': '<span class="status-badge inactive">Inactive</span>',
        'pending': '<span class="status-badge pending">Pending</span>'
    };
    return badges[status] || '<span class="status-badge">Unknown</span>';
}

// Export functions for global access
window.dashboardFunctions = {
    updateDashboardStats,
    refreshDashboard,
    exportData,
    getRelativeTime,
    getStatusBadge
};

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeButtons();
});
