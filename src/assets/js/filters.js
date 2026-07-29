/* ==========================================================================
   GolfSimCanada.site — Filters (Phase 16)
   SSOT Reference: 10-cms-dev-spec.md §7
   Logic: Client-side filtering with URL sync.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterForm = document.getElementById('filter-form');
  if (!filterForm) return;

  const filterInputs = filterForm.querySelectorAll('input[type="checkbox"]');
  const filterableCards = document.querySelectorAll('[data-filterable="true"]');
  const resultsCountLabel = document.getElementById('results-count');
  const noResultsMsg = document.getElementById('no-results');
  const filterChipsContainer = document.getElementById('filter-chips');

  // Initialize from URL
  const urlParams = new URLSearchParams(window.location.search);
  let activeFilters = {};

  // Parse URL params into activeFilters
  for (const [key, value] of urlParams.entries()) {
    activeFilters[key] = value.split(',');
  }

  // Set initial checkbox states based on URL
  filterInputs.forEach(input => {
    const group = input.dataset.group;
    const value = input.value;
    if (activeFilters[group] && activeFilters[group].includes(value)) {
      input.checked = true;
    }
    
    input.addEventListener('change', handleFilterChange);
  });

  function handleFilterChange() {
    activeFilters = {};
    
    filterInputs.forEach(input => {
      if (input.checked) {
        const group = input.dataset.group;
        if (!activeFilters[group]) activeFilters[group] = [];
        activeFilters[group].push(input.value);
      }
    });

    updateURL();
    applyFilters();
    renderChips();
  }

  function applyFilters() {
    let visibleCount = 0;

    filterableCards.forEach(card => {
      let isMatch = true;

      for (const group in activeFilters) {
        if (activeFilters[group].length === 0) continue;

        const cardDataAttr = `data-${group}`;
        const cardValues = (card.getAttribute(cardDataAttr) || '').split(' ');

        // OR match within group
        const groupMatch = activeFilters[group].some(val => cardValues.includes(val));
        
        // AND match between groups
        if (!groupMatch) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCountLabel) {
      resultsCountLabel.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''}`;
    }

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function updateURL() {
    const params = new URLSearchParams();
    for (const group in activeFilters) {
      if (activeFilters[group].length > 0) {
        params.set(group, activeFilters[group].join(','));
      }
    }
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, '', newUrl);
  }

  function renderChips() {
    if (!filterChipsContainer) return;
    filterChipsContainer.innerHTML = '';

    for (const group in activeFilters) {
      activeFilters[group].forEach(val => {
        const chip = document.createElement('button');
        chip.className = 'badge badge--info filter-chip';
        chip.innerHTML = `${val} &times;`;
        chip.title = "Remove filter";
        chip.onclick = () => {
          const input = filterForm.querySelector(`input[data-group="${group}"][value="${val}"]`);
          if (input) {
            input.checked = false;
            handleFilterChange();
          }
        };
        filterChipsContainer.appendChild(chip);
      });
    }
  }

  // Initial apply
  applyFilters();
  renderChips();
  
  // Mobile Filter Panel Toggle
  const filterToggleBtn = document.getElementById('mobile-filter-toggle');
  if (filterToggleBtn) {
    filterToggleBtn.addEventListener('click', () => {
      filterForm.classList.toggle('is-open');
    });
  }
});
