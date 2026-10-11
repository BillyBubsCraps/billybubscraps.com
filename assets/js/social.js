/* Billy Bubs social links: the ONE place to turn accounts on.
   Every account ships with enabled:false, so no dead links go live and no empty icon row shows.
   To turn X on once @billybubscraps exists: set enabled:true on the "x" entry and redeploy.
   Add other accounts ONLY once they exist, e.g. { id: "instagram", label: "Instagram", url: "https://www.instagram.com/<handle>/", enabled: true }. */
window.BB_SOCIAL = [
  { id: "x", label: "X", url: "https://x.com/billybubscraps", enabled: true },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/billybubscraps/", enabled: true },
  { id: "youtube", label: "YouTube", url: "https://www.youtube.com/@billybubscraps", enabled: true }
];
(function () {
  var on = window.BB_SOCIAL.filter(function (s) { return s.enabled; });
  if (!on.length) return; /* nothing enabled: the container stays hidden */
  /* generic glyphs, no platform logos */
  var G = {
    x: '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>',
    tiktok: '<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    youtube: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z"/>',
    facebook: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/>'
  };
  document.querySelectorAll("[data-social]").forEach(function (el) {
    el.innerHTML = on.map(function (s) {
      return '<a href="' + s.url + '" rel="me noopener" aria-label="Billy Bubs on ' + s.label + ' (@billybubscraps)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (G[s.id] || G.x) + '</svg></a>';
    }).join("") + '<span class="small" style="align-self:center;color:var(--gold-lt);font-weight:700;margin-left:6px">@billybubscraps</span>';
    el.hidden = false;
  });
})();
