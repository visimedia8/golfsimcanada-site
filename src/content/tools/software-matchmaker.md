---
title: "Golf Simulator Software Matchmaker"
description: "Not sure which simulation software is best? Answer two questions and we'll match you with the perfect ecosystem."
template: "tool-page"
status: "published"
---

<form id="tool-software" class="space-y-8">
  <div>
    <h2 class="h3 text-white mb-4"><span class="badge badge--info text-xs">Question 1</span> How do you primarily want to play?</h2>
    <select id="sw-style" class="w-full p-3 bg-base border border-color-border rounded text-white text-sm" required>
      <option value="" disabled selected>Select play style...</option>
      <option value="casual">Casual / Family Friendly / Mini Games</option>
      <option value="compete">Competitive / Tournaments / High Realism</option>
    </select>
  </div>

  <div>
    <h2 class="h3 text-white mb-4"><span class="badge badge--info text-xs">Question 2</span> What is your software budget?</h2>
    <select id="sw-budget" class="w-full p-3 bg-base border border-color-border rounded text-white text-sm" required>
      <option value="" disabled selected>Select budget...</option>
      <option value="budget">Under $500/yr (or Free included)</option>
      <option value="premium">Premium ($1000+ or One-time Unlock)</option>
    </select>
  </div>

  <button type="submit" class="btn btn--primary btn--lg w-full">Find My Software Match →</button>
</form>

<div id="sw-output" class="mt-8 pt-8 border-t border-color-border"></div>
