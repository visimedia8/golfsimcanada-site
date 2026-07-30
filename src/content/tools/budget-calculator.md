---
title: "Golf Simulator Budget Calculator"
description: "Input your budget and instantly see the top 3 recommended launch monitors for your price range."
template: "tool-page"
status: "published"
---

<form id="tool-budget" class="space-y-8">
  <div>
    <h2 class="h3 text-white mb-4"><span class="badge badge--info text-xs">Step 1</span> Select Your Budget</h2>
    <label for="bc-budget" class="block text-xs text-secondary font-medium mb-2">Max Budget (CAD): <span id="bc-budget-val" class="text-white font-bold">$8,000 CAD</span></label>
    <input type="range" min="500" max="30000" step="500" value="8000" id="bc-budget" class="w-full cursor-pointer accent-accent">
  </div>
  
  <div>
    <h2 class="h3 text-white mb-4"><span class="badge badge--info text-xs">Step 2</span> What is your priority?</h2>
    <select id="bc-priority" class="w-full p-3 bg-base border border-color-border rounded text-white text-sm">
      <option value="accuracy" selected>Absolute Accuracy (Data & Realism)</option>
      <option value="value">Best Bang for Buck (Features per Dollar)</option>
    </select>
  </div>

  <button type="submit" class="btn btn--primary btn--lg w-full">Find My Setup →</button>
</form>

<div id="bc-output" class="mt-8 pt-8 border-t border-color-border"></div>
