---
title: "Installer Quote Estimator"
description: "Select your province and room type to get an instant estimated cost for a custom indoor golf simulator build."
template: "tool-page"
status: "published"
---

<form id="tool-estimator" class="space-y-8">
  <div>
    <label for="est-province" class="block text-xs text-secondary font-medium mb-1">Province *</label>
    <select id="est-province" class="w-full p-3 bg-base border border-color-border rounded text-white text-sm" required>
      <option value="" disabled selected>Select your province...</option>
      <option value="ON">Ontario (ON)</option>
      <option value="BC">British Columbia (BC)</option>
      <option value="AB">Alberta (AB)</option>
      <option value="QC">Quebec (QC)</option>
      <option value="default">Other Provinces</option>
    </select>
  </div>

  <div>
    <label for="est-room" class="block text-xs text-secondary font-medium mb-1">Room Type *</label>
    <select id="est-room" class="w-full p-3 bg-base border border-color-border rounded text-white text-sm" required>
      <option value="" disabled selected>Select room type...</option>
      <option value="garage">Garage (Unfinished or Heated)</option>
      <option value="basement">Basement (Standard ceiling)</option>
      <option value="dedicated">Dedicated Room / Custom Outbuilding</option>
    </select>
  </div>

  <div>
    <label for="est-completion" class="block text-xs text-secondary font-medium mb-1">Finish Level *</label>
    <select id="est-completion" class="w-full p-3 bg-base border border-color-border rounded text-white text-sm" required>
      <option value="" disabled selected>Select desired finish...</option>
      <option value="rough">Rough / Functional (Basic framing & enclosure)</option>
      <option value="full">Full Premium (Custom millwork, turf, lighting)</option>
    </select>
  </div>

  <button type="submit" class="btn btn--primary btn--lg w-full">Calculate Estimate →</button>
</form>

<div id="est-output" class="mt-8 pt-8 border-t border-color-border"></div>
