/* ==========================================================================
   GolfSimCanada.site — Interactive Tools (Phase 16)
   SSOT Reference: 10-cms-dev-spec.md §8
   Logic: 100% Client-side. Zero backend APIs. Lazy-initialized.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRoomSizeChecker();
  initBudgetCalculator();
  initProductComparator();
  initInstallerQuoteEstimator();
  initSoftwareMatchmaker();
});

/* --------------------------------------------------------------------------
   1. Room Size Checker
   -------------------------------------------------------------------------- */
function initRoomSizeChecker() {
  const form = document.getElementById('tool-room-size');
  if (!form) return;

  const minRequirements = { width: 12, height: 9, length: 15 };
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const w = parseFloat(document.getElementById('rs-width').value);
    const h = parseFloat(document.getElementById('rs-height').value);
    const l = parseFloat(document.getElementById('rs-length').value);
    const output = document.getElementById('rs-output');

    if (!w || !h || !l) {
      output.innerHTML = `<div class="badge badge--error">Please enter all dimensions.</div>`;
      return;
    }

    let issues = [];
    if (w < minRequirements.width) issues.push(`Width is tight (Min: ${minRequirements.width}ft)`);
    if (h < minRequirements.height) issues.push(`Ceiling is low (Min: ${minRequirements.height}ft)`);
    if (l < minRequirements.length) issues.push(`Length is short (Min: ${minRequirements.length}ft)`);

    if (issues.length === 0) {
      output.innerHTML = `<div class="tldr-box" style="border-color: var(--color-success)">
        <h4 class="tldr-box__heading" style="color: var(--color-success)">Great Space!</h4>
        <p>Your room exceeds the minimum requirements for a standard simulator setup.</p>
      </div>`;
    } else {
      output.innerHTML = `<div class="tldr-box" style="border-color: var(--color-warning)">
        <h4 class="tldr-box__heading" style="color: var(--color-warning)">Tight but Possible</h4>
        <ul style="color: var(--color-text-primary); margin-top: 8px;">
          ${issues.map(iss => `<li>${iss}</li>`).join('')}
        </ul>
        <p style="margin-top: 12px; font-size: var(--text-small); color: var(--color-text-secondary);">Consider radar units mounted behind the golfer, or offset hitting mats.</p>
      </div>`;
    }
  });
}

/* --------------------------------------------------------------------------
   2. Budget Calculator
   -------------------------------------------------------------------------- */
function initBudgetCalculator() {
  const form = document.getElementById('tool-budget');
  if (!form) return;

  // Embedded mocked product data for pure client-side functionality
  const products = [
    { name: "Garmin Approach R10", price: 800, rating: 8.5, value_score: 9.5, slug: "garmin-r10" },
    { name: "SkyTrak+", price: 4000, rating: 9.0, value_score: 9.2, slug: "skytrak-plus" },
    { name: "Bushnell Launch Pro", price: 5500, rating: 9.3, value_score: 8.8, slug: "bushnell-launch-pro" },
    { name: "Foresight GC3", price: 9500, rating: 9.4, value_score: 8.5, slug: "foresight-gc3" },
    { name: "Uneekor EYE XO2", price: 14000, rating: 9.6, value_score: 8.2, slug: "uneekor-eye-xo2" },
    { name: "Foresight GCQuad", price: 18500, rating: 9.8, value_score: 7.5, slug: "foresight-gcquad" }
  ];

  const slider = document.getElementById('bc-budget');
  const sliderVal = document.getElementById('bc-budget-val');
  
  if(slider && sliderVal) {
    slider.addEventListener('input', () => {
      sliderVal.textContent = `$${parseInt(slider.value).toLocaleString()} CAD`;
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const budget = parseInt(document.getElementById('bc-budget').value);
    const priority = document.getElementById('bc-priority').value;
    const output = document.getElementById('bc-output');

    let valid = products.filter(p => p.price <= budget);
    
    if (priority === 'accuracy') {
      valid.sort((a, b) => b.rating - a.rating);
    } else {
      valid.sort((a, b) => b.value_score - a.value_score);
    }

    const top = valid.slice(0, 3);

    if (top.length === 0) {
      output.innerHTML = `<p>Budget is too low for current launch monitors. Minimum recommended is ~$800 CAD.</p>`;
      return;
    }

    output.innerHTML = `<div style="display: grid; gap: 16px; margin-top: 16px;">
      ${top.map((p, i) => `
        <div class="product-card" style="padding: 16px;">
          <h4 style="margin: 0; color: #fff;">#${i+1} ${p.name}</h4>
          <p style="margin: 4px 0 0 0; color: var(--color-accent); font-weight: bold;">Est. $${p.price.toLocaleString()} CAD</p>
          <a href="/products/${p.slug}/" class="btn btn--sm btn--ghost" style="margin-top: 12px; width: 100%;">View Details</a>
        </div>
      `).join('')}
    </div>`;
  });
}

/* --------------------------------------------------------------------------
   3. Product Comparator
   -------------------------------------------------------------------------- */
function initProductComparator() {
  const container = document.getElementById('tool-comparator');
  if (!container) return;

  // Data driven by data-* attributes on the selects, or embedded JSON block
  const dataBlock = document.getElementById('comparator-data');
  const comparisons = dataBlock ? JSON.parse(dataBlock.textContent) : [];
  
  const form = document.getElementById('compare-form');
  const output = document.getElementById('compare-output');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const p1 = document.getElementById('comp-p1').value;
      const p2 = document.getElementById('comp-p2').value;
      
      if (!p1 || !p2 || p1 === p2) {
        output.innerHTML = `<p style="color: var(--color-warning);">Please select two different products to compare.</p>`;
        return;
      }

      // Find verdict if exists
      const match = comparisons.find(c => 
        (c.product_a === p1 && c.product_b === p2) || 
        (c.product_a === p2 && c.product_b === p1)
      );

      if (match) {
        output.innerHTML = `
          <div class="tldr-box">
            <h4 class="tldr-box__heading">Editor's Verdict</h4>
            <p>${match.verdict}</p>
            <div style="margin-top: 12px;">
              <span class="badge badge--editors-choice">Winner: ${match.verdict_winner}</span>
              <p style="font-size: 14px; margin-top: 8px; color: var(--color-text-secondary);">Context: ${match.verdict_context}</p>
            </div>
            <a href="/vs/${match.slug}/" class="btn btn--primary btn--sm" style="margin-top: 16px;">Read Full Comparison</a>
          </div>
        `;
      } else {
        output.innerHTML = `<p>No direct comparison verdict available yet for these two products. Check their individual reviews.</p>`;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Installer Quote Estimator
   -------------------------------------------------------------------------- */
function initInstallerQuoteEstimator() {
  const form = document.getElementById('tool-estimator');
  if (!form) return;

  const PRICING_TIERS = {
    garage: { rough: [3000, 5000], full: [8000, 15000] },
    basement: { rough: [4000, 7000], full: [12000, 25000] },
    dedicated: { rough: [5000, 10000], full: [20000, 50000] }
  };
  
  // Province multiplier (mock logic for regional cost diffs)
  const PROVINCE_MULT = {
    ON: 1.1, BC: 1.15, AB: 1.0, QC: 0.95, default: 1.0
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const province = document.getElementById('est-province').value;
    const room = document.getElementById('est-room').value;
    const completion = document.getElementById('est-completion').value;
    const output = document.getElementById('est-output');

    if(!province || !room || !completion) return;

    const baseRange = PRICING_TIERS[room][completion];
    const mult = PROVINCE_MULT[province] || PROVINCE_MULT.default;

    const low = Math.round((baseRange[0] * mult) / 500) * 500;
    const high = Math.round((baseRange[1] * mult) / 500) * 500;

    output.innerHTML = `
      <div class="tldr-box" style="text-align: center; margin-top: 16px;">
        <p style="color: var(--color-text-secondary); margin: 0; font-size: 14px; text-transform: uppercase;">Estimated Cost (Labor + Build Materials)</p>
        <h3 style="color: var(--color-accent); font-size: 32px; margin: 8px 0; font-family: var(--font-mono);">$${low.toLocaleString()} – $${high.toLocaleString()}</h3>
        <p style="font-size: 14px; color: var(--color-text-secondary); margin-bottom: 16px;">*Excludes launch monitor & software costs.</p>
        <a href="/installers/${province.toLowerCase()}/" class="btn btn--primary">Find Installers in ${province}</a>
      </div>
    `;
  });
}

/* --------------------------------------------------------------------------
   5. Software Matchmaker
   -------------------------------------------------------------------------- */
function initSoftwareMatchmaker() {
  const form = document.getElementById('tool-software');
  if (!form) return;

  const matrix = {
    casual: {
      budget: { name: "E6 Connect", desc: "Great arcade modes and family friendly. Runs on lower spec PCs or iOS." },
      premium: { name: "FSX Play", desc: "Stunning graphics, mostly restricted to Foresight hardware. Requires beefy PC." }
    },
    compete: {
      budget: { name: "GSPro", desc: "The gold standard for realism and online tours. Subscription model. Highly recommended." },
      premium: { name: "GSPro", desc: "Even with unlimited budget, GSPro is currently the community favorite for competitive play." }
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const style = document.getElementById('sw-style').value; // casual, compete
    const budget = document.getElementById('sw-budget').value; // budget, premium
    const output = document.getElementById('sw-output');

    if(!style || !budget) return;

    const rec = matrix[style][budget];

    output.innerHTML = `
      <div class="tldr-box" style="margin-top: 16px;">
        <h4 style="margin: 0 0 8px 0; color: #fff;">Top Match: ${rec.name}</h4>
        <p style="margin: 0; font-size: 16px; color: var(--color-text-secondary);">${rec.desc}</p>
        <a href="/products/software/" class="btn btn--ghost btn--sm" style="margin-top: 16px;">View All Software</a>
      </div>
    `;
  });
}
