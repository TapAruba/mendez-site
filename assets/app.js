(function(){
  'use strict';

  // ---- Villa galleries (self-hosted images in assets/img) ----
  var naimaAB = [
    ['dda90ca2-df9b-4cf3-b769-cfe870e90e01','Naïma Luxury Cottage'],
    ['f9e85b5f-1c13-44d5-8c82-cf8aa1b9e763','Naïma Luxury Cottage'],
    ['26d08873-c598-43eb-bb1a-536489c58be1','Naïma Luxury Cottage'],
    ['8cb2777f-07ea-4886-b277-309c062bc5f7','Naïma Luxury Cottage'],
    ['70396a73-1d70-4191-a7ff-0bf50b7ef4eb','Naïma Luxury Cottage'],
    ['b48bbdd4-095f-484a-b6c3-35b6ca12c570','Living space'],
    ['6dded5a4-ad66-45fe-a7ef-7b68f3ffbbb2','Full kitchen'],
    ['37b184b9-f0e0-4b5c-82ff-6ea4d48e585c','Dining area'],
    ['4e2f570a-490c-4f1c-8b0f-8ad2fbf04499','Smart-TV lounge'],
    ['9c0acf39-cf65-432e-b6d4-2ff33e2546ce','King-size bedroom'],
    ['33562a15-2d0d-4555-b903-dbc4131d40ee','Bathroom'],
    ['56568906-c4cc-4401-a1c8-be32c7a24a69','Rain-shower bathroom'],
    ['0b5b4a1c-7116-4655-a266-090eca3e4ace','Garden patio'],
    ['698a224a-119a-4d70-9fb8-fac4b7c71005','Garden patio'],
    ['a08a6a5f-682e-45cf-88f5-b317288e3342','Garden patio'],
    ['b293615d-8b4e-446c-b73a-75c9c6e8b678','Garden patio'],
    ['479fc450-de86-4cff-86bd-4aaf89ed3810','Garden patio'],
    ['9b4101d5-f992-444f-9a77-f384f482b725','Garden patio'],
    ['5e7fd7eb-5ee8-4848-ac81-98c6a3ca51de','Garden patio'],
    ['a10f2440-9e32-408f-af13-179cde99bbd1','Garden patio'],
    ['4bf004ca-4b74-46f8-8ec8-255f89d8cba4','Garden patio'],
    ['afff9923-a99c-452d-8099-532139e91f0e','Garden patio'],
    ['134aec55-6301-477b-ac0b-de3bd35909cf','The grounds'],
    ['1a69995d-f0cc-4d09-875d-8d18bd119f79','The grounds'],
    ['51295910-c2e7-4f00-8864-780f66fa0fa8','Naïma Luxury Cottage']
  ].map(function(p,i){ return { u: 'assets/img/naima-' + (i < 9 ? '0' : '') + (i+1) + '.jpg', a: p[1] }; });
  // extra Naïma photos from the Wix media library — appended after the Airbnb set (near-duplicates of Airbnb shots removed)
  var naimaWix = [26,27,28,29,30,31,32].map(function(n){ return { u: 'assets/img/naima-' + n + '.jpg', a: 'Villa photo' }; });
  var maxwellMV = ['998cf6a9_adde_4c01_a7da_2658bb9ff556_1741026050630','5076fb09_6001_4a64_9111_536fa2d08922_1741026050633','e962b0d3_a4fc_4a6e_af8e_ca9d398c2819_1741026050651','65a171a7_66ac_4042_905a_0f4dbc11db5b_1741026050667','1b64f24c_932e_456d_b74a_57714ce8c44d_1741026050632','18f27d0b_acea_41d2_8fc9_547e86aac349_1741026050634','0a0b2458_e8cb_4a43_9785_9a5d4ad97815_1741026050681','ce35d0b9_6e38_4847_b43b_cc5f91cdad99_1741026050631','397a40f2_8d14_4526_bfab_95dde1d97788_1741026050635','509bc0cb_a3b2_4a54_962d_7003299c208c_1741026050636','176bc713_be36_444a_8112_b797362f14ca_1741026050637','3446927d_542e_4c48_8b98_2120d5b40850_1741026050638','6c5209bd_209a_4b6a_a7a3_c50a3419e718_1741026050639','2b51523a_3ab8_4cfa_9513_80a7fcefd3d1_1741026050640','da67ede6_d5c4_496b_990e_1965b6f5c1b5_1741026050641','2270c9d2_88d6_4b22_922c_2358bceecea9_1741026050642','c8d9aeb0_b7a0_4550_b335_74e845f63fba_1741026050643','43eea244_8ed1_4c3d_80c8_b3f22b023729_1741026050644','1ee2bb5c_2400_4c43_9d69_385feb1460c0_1741026050645','602eca57_8517_48e5_85dd_b7a07a1f9227_1741026050646','52f8b8dc_1700_4de7_b84c_0fa5220e7b39_1741026050647','a55179fb_bda4_41c3_8754_9111fcc32112_1741026050648','ebf70c8d_f8a2_4449_9200_b6c2467ee607_1741026050649','7dc3848a_cf5e_468b_8f6a_da3a08f1eb5d_1741026050650','8c614907_4805_49c2_962e_6d238b6f92cd_1741026050652','0983ea58_6458_4253_8e5d_646e83c62752_1741026050653','dd2f6256_7111_460e_a051_77bd58a4d4ee_1741026050654','96e974cd_5ae2_4eda_967d_d957381c69e5_1741026050655','57f04a67_3729_4ed1_9c9a_1fde110f9bf9_1741026050656','aa455881_d2e0_4f7b_bbb8_0222f8b4450a_1741026050657','1c487190_333d_4992_84f6_f60845d963ee_1741026050658','998e4c40_696e_4638_a4dc_a65c797c377d_1741026050659','a3d12add_2cac_42b5_83ba_5a5565fe9b01_1741026050660','d59b42d5_3434_4164_8e14_f4c175f281e9_1741026050661','3e41ce59_e8f3_4415_ba02_0841b36975d0_1741026050662','1bd46bac_e255_4b8c_b277_f800f13de789_1741026050663'].map(function(id,i){ return { u: 'assets/img/maxwell-' + (i < 9 ? '0' : '') + (i+1) + '.jpg', a: 'Maxwell Luxury Villa' }; });
  var maxwellWix = [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51].map(function(n){ return { u: 'assets/img/maxwell-' + n + '.jpg', a: 'Maxwell Luxury Villa' }; });
  var G = {
    naima: naimaAB.concat(naimaWix),
    maxwell: maxwellMV.concat(maxwellWix)
  };
  function thumbSrc(item){ return item.u; }
  function fullSrc(item){ return item.u; }
  function altOf(item){ return item.a; }
  var GAL_LIMIT = 11;
  document.querySelectorAll('.gallery').forEach(function(el){
    var items = G[el.dataset.g] || [];
    items.forEach(function(item, idx){
      var fig = document.createElement('figure'); fig.className = 'gitem' + (idx >= GAL_LIMIT ? ' g-hide' : '');
      var im = new Image();
      im.src = thumbSrc(item); im.loading = 'lazy'; im.decoding = 'async'; im.alt = altOf(item);
      im.dataset.full = fullSrc(item); im.dataset.cap = altOf(item);
      fig.appendChild(im);
      var lbl = altOf(item);
      if (lbl && lbl !== 'Villa photo' && lbl !== 'Naïma Luxury Cottage' && lbl !== 'Maxwell Luxury Villa'){ var fc = document.createElement('figcaption'); fc.textContent = lbl; fig.appendChild(fc); }
      el.appendChild(fig);
    });
    if (items.length > GAL_LIMIT){
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'gallery-more';
      var expanded = false;
      btn.textContent = 'Show all ' + items.length + ' photos';
      btn.addEventListener('click', function(){
        expanded = !expanded;
        el.querySelectorAll('.gitem').forEach(function(g, i){ g.classList.toggle('g-hide', !expanded && i >= GAL_LIMIT); });
        btn.textContent = expanded ? 'Show less' : 'Show all ' + items.length + ' photos';
        if (!expanded) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      el.appendChild(btn);
    }
  });

  // ---- Lightbox (with caption) ----
  var lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg');
  if (lb && lbImg){
    var lbCap = document.createElement('div'); lbCap.className = 'lb-cap'; lb.appendChild(lbCap);
    document.addEventListener('click', function(e){
      if (e.target.matches('.gallery img')){ lbImg.src = e.target.dataset.full || e.target.src; lbCap.textContent = e.target.dataset.cap || ''; lb.classList.add('open'); }
    });
    lb.addEventListener('click', function(){ lb.classList.remove('open'); });
  }

  // ---- Simple auto image sliders (e.g. residents) ----
  document.querySelectorAll('.rslider').forEach(function(sl){
    var slides = [].slice.call(sl.querySelectorAll('.rslide'));
    var dots = [].slice.call(sl.querySelectorAll('.rdots span'));
    if (slides.length < 2) return;
    var i = 0, t;
    function go(n){
      i = (n + slides.length) % slides.length;
      slides.forEach(function(s,k){ s.classList.toggle('on', k === i); });
      dots.forEach(function(d,k){ d.classList.toggle('on', k === i); });
      clearTimeout(t); t = setTimeout(function(){ go(i + 1); }, 4200);
    }
    dots.forEach(function(d,k){ d.addEventListener('click', function(){ go(k); }); });
    go(0);
  });

  // ---- Read-more toggles ----
  document.querySelectorAll('.rm-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var box = btn.closest('.readmore'); if (!box) return;
      btn.textContent = box.classList.toggle('open') ? 'Read less' : 'Read more';
    });
  });

  // ---- Scroll reveal ----
  var io = new IntersectionObserver(function(es){
    es.forEach(function(x){ if (x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } });
  }, { threshold:.12 });
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  // ---- Header on scroll + hero logo hand-off (center → top-left) ----
  var hdr = document.getElementById('hdr');
  if (hdr){
    var heroInner = document.getElementById('heroInner');
    // drop the entrance animation once done so scroll-driven opacity/transform can apply
    if (heroInner) heroInner.addEventListener('animationend', function(){ heroInner.style.animation = 'none'; }, { once: true });
    var onScroll = function(){
      var y = window.scrollY;
      hdr.classList.toggle('scrolled', y > 60);
      if (heroInner){
        if (y > 0){
          var p = Math.min(y / 340, 1);
          heroInner.style.opacity = String(1 - p * 0.95);
          heroInner.style.transform = 'translateY(' + (-p * 36) + 'px)';
        } else {
          heroInner.style.opacity = '';
          heroInner.style.transform = '';
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
  }

  // ---- Hero slideshow (home only — brand lockup over crossfading photo/video) ----
  var heroBg = document.getElementById('heroBg');
  if (heroBg){
    var slides = Array.prototype.slice.call(heroBg.querySelectorAll('.slide'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('#heroDots span'));
    var vid = heroBg.querySelector('video');
    var cur = 0, timer;
    var go = function(i){
      cur = (i + slides.length) % slides.length;
      slides.forEach(function(s,n){ s.classList.toggle('on', n === cur); });
      dots.forEach(function(d,n){ d.classList.toggle('on', n === cur); });
      if (vid){ if (slides[cur] === vid){ vid.currentTime = 0; vid.play().catch(function(){}); } else vid.pause(); }
      clearTimeout(timer); timer = setTimeout(function(){ go(cur + 1); }, 6500);
    };
    dots.forEach(function(d){ d.addEventListener('click', function(){ go(+d.dataset.s); }); });
    if (slides.length > 1) go(0);

    // pause hero video once scrolled out of view
    var heroSec = document.getElementById('top');
    if (heroSec){
      new IntersectionObserver(function(entries){
        var e = entries[0];
        if (e.isIntersecting){ if (vid && slides[cur] === vid) vid.play().catch(function(){}); }
        else if (vid){ vid.pause(); }
      }, { threshold:.02 }).observe(heroSec);
    }
  }

  // ---- Mobile nav ----
  var mnav = document.getElementById('mnav'), menuBtn = document.getElementById('menuBtn'), mnavX = document.getElementById('mnavX');
  if (mnav && menuBtn){
    menuBtn.onclick = function(){ mnav.classList.add('open'); };
    if (mnavX) mnavX.onclick = function(){ mnav.classList.remove('open'); };
    mnav.querySelectorAll('a').forEach(function(a){ a.onclick = function(){ mnav.classList.remove('open'); }; });
  }

  // ---- Language: English only. Google Translate widget REMOVED entirely so its mobile
  // top-banner can never be injected again. Also clear any leftover googtrans cookie from
  // the old version so returning phones stop auto-translating & showing the browser bar.
  (function(){
    try {
      var ex = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = ex;
      var h = location.hostname;
      if (h){ document.cookie = ex + ';domain=' + h; document.cookie = ex + ';domain=.' + h; }
      localStorage.removeItem('me-lang');
    } catch(e){}
  })();

  // ---- Year ----
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- In-page booking modal (villa pages) — "Check dates" opens the booking
  // right here instead of navigating away; the links keep book-now.html as a
  // no-JS fallback ----
  var bkm = document.getElementById('bkm');
  if (bkm){
    var bkmPanel = bkm.querySelector('.bkm-panel');
    var bkmShow = function(){
      bkm.hidden = false;
      document.body.classList.add('bkm-lock');
      if (bkmPanel) bkmPanel.scrollTop = 0;
      requestAnimationFrame(function(){ bkm.classList.add('on'); });
    };
    var bkmHide = function(){
      bkm.classList.remove('on');
      document.body.classList.remove('bkm-lock');
      setTimeout(function(){ bkm.hidden = true; }, 380);
    };
    document.querySelectorAll('[data-bkm-open]').forEach(function(a){
      a.addEventListener('click', function(e){ e.preventDefault(); bkmShow(); });
    });
    bkm.querySelectorAll('[data-bkm-close]').forEach(function(x){
      x.addEventListener('click', bkmHide);
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && !bkm.hidden) bkmHide();
    });
  }

  // ---- Booking form: live Smoobu availability when the API is up, with a
  // graceful fall back to the pre-filled email/WhatsApp enquiry when it isn't ----
  var bookForm = document.getElementById('bookForm');
  if (bookForm){
    var fel = bookForm.elements;

    // pre-tick an extra when arriving from a service card (book-now.html?add=dinner)
    (function(){
      var add = new URLSearchParams(location.search).get('add');
      if (!add) return;
      var box = bookForm.querySelector('input[name="extra"][data-key="' + add + '"]');
      if (box){ box.checked = true; var w = box.closest('.chk'); if (w){ w.classList.add('chk-hi'); setTimeout(function(){ w.classList.remove('chk-hi'); }, 2400); } }
      setTimeout(function(){ bookForm.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 250);
    })();

    // --- modern controls: villa pills + guest stepper ---
    var seg = document.getElementById('villaSeg');
    var GUEST_MAX = { naima: 2, maxwell: 8 };
    if (seg && fel.villa){
      [].forEach.call(seg.querySelectorAll('button'), function(b){
        b.addEventListener('click', function(){
          [].forEach.call(seg.querySelectorAll('button'), function(x){ x.classList.toggle('on', x === b); });
          fel.villa.value = b.dataset.v;
          if (fel.guests){
            var mx = GUEST_MAX[villaKey()] || 8;
            fel.guests.max = mx;
            if ((parseInt(fel.guests.value, 10) || 2) > mx) fel.guests.value = mx;
          }
          fel.villa.dispatchEvent(new Event('change'));
        });
      });
    }
    var gm = document.getElementById('gMinus'), gp = document.getElementById('gPlus');
    if (gm && gp && fel.guests){
      var bump = function(d){
        var mx = parseInt(fel.guests.max, 10) || 8;
        var v = Math.max(1, Math.min(mx, (parseInt(fel.guests.value, 10) || 2) + d));
        fel.guests.value = v;
      };
      gm.addEventListener('click', function(){ bump(-1); });
      gp.addEventListener('click', function(){ bump(1); });
    }

    // --- Smoobu progressive enhancement ---
    var NAIMA_ID = 1218098; // known; Maxwell is auto-detected from /api/apartments
    var apiApts = null;     // [{id,name}] once the key authenticates
    var lastQuote = null;   // {available,total,nights,arrival,departure,apartmentId}
    var qBox = document.getElementById('quote'), qStatus = document.getElementById('qStatus'),
        qPrice = document.getElementById('qPrice'), qNote = document.getElementById('qNote');

    var calRefresh = null; // assigned by the calendar below; called once the API wakes up
    fetch('/api/apartments').then(function(r){ return r.json(); }).then(function(j){
      if (j && j.ok && j.apartments && j.apartments.length){
        apiApts = j.apartments; quoteCheck();
        if (calRefresh) calRefresh();
      }
    }).catch(function(){});

    function villaKey(){
      var v = (fel.villa && fel.villa.value || '').toLowerCase();
      if (v.indexOf('naïma') > -1 || v.indexOf('naima') > -1) return 'naima';
      if (v.indexOf('maxwell') > -1) return 'maxwell';
      return null;
    }
    function aptId(){
      var k = villaKey();
      if (!k || !apiApts) return null;
      for (var i = 0; i < apiApts.length; i++){
        var n = (apiApts[i].name || '').toLowerCase();
        if (k === 'maxwell' && n.indexOf('maxwell') > -1) return apiApts[i].id;
        if (k === 'naima' && (n.indexOf('naima') > -1 || n.indexOf('naïma') > -1 || n.indexOf('cottage') > -1)) return apiApts[i].id;
      }
      return k === 'naima' ? NAIMA_ID : null;
    }
    function stayDates(){
      var a = fel.arrival && fel.arrival.value;
      var n = parseInt(fel.nights && fel.nights.value, 10);
      if (!a || !n || n < 1) return null;
      var d = new Date(a + 'T00:00:00Z');
      d.setUTCDate(d.getUTCDate() + n);
      return { arrival: a, departure: d.toISOString().slice(0, 10), nights: n };
    }
    function showQuote(cls, status, price, note){
      if (!qBox) return;
      qBox.hidden = false;
      qBox.className = 'quote ' + cls;
      qStatus.textContent = status;
      qPrice.innerHTML = price || '';
      qNote.textContent = note || '';
    }
    var qTimer = null, qSeq = 0;
    function quoteCheck(){
      lastQuote = null;
      if (!qBox || !apiApts) return;                 // API offline -> stay silent
      var id = aptId(), stay = stayDates();
      if (!id || !stay){ qBox.hidden = true; return; }
      var seq = ++qSeq;
      showQuote('q-wait', 'Checking availability…', '', '');
      fetch('/api/availability?apartment=' + id + '&arrival=' + stay.arrival + '&departure=' + stay.departure)
        .then(function(r){ return r.json(); })
        .then(function(j){
          if (seq !== qSeq) return;                  // a newer check superseded this one
          if (!j || !j.ok){ qBox.hidden = true; return; }
          if (j.available && j.meetsMinStay){
            lastQuote = { available: true, total: j.total, estimate: j.estimate, nights: j.nights, arrival: stay.arrival, departure: stay.departure, apartmentId: id };
            var money = function(n){ return '$' + n.toLocaleString('en-US'); };
            showQuote('q-ok', 'Available for your dates',
              j.estimate ? money(j.estimate) + ' <small>est. total · ' + j.nights + ' night' + (j.nights > 1 ? 's' : '') + '</small>'
                         : 'Rate confirmed by Ana',
              j.estimate ? money(j.total) + ' stay + ' + money(j.cleaning) + ' cleaning + ' + money(j.taxes) + ' Aruba taxes — Ana personally confirms your final quote; longer stays may earn a discount.'
                         : 'Live from our calendar — your final quote is personally confirmed by Ana.');
          } else if (j.available && !j.meetsMinStay){
            showQuote('q-bad', 'Minimum stay is ' + j.minStay + ' nights', '', 'Add a night or two and check again.');
          } else {
            showQuote('q-bad', 'Those dates look taken', '', 'Try shifting your dates — or send the enquiry and Ana will suggest alternatives.');
          }
        }).catch(function(){ if (seq === qSeq) qBox.hidden = true; });
    }
    ['villa', 'arrival', 'nights'].forEach(function(n){
      if (fel[n]) fel[n].addEventListener('change', function(){ clearTimeout(qTimer); qTimer = setTimeout(quoteCheck, 350); });
    });

    // --- date-range calendar (Airbnb-style; booked days shade in once Smoobu is live) ---
    (function(){
      var cal = document.getElementById('cal'), btn = document.getElementById('datesBtn');
      if (!cal || !btn) return;
      var label = document.getElementById('datesLabel'), hint = document.getElementById('calHint');
      var t1 = document.getElementById('calT1'), t2 = document.getElementById('calT2');
      var m1 = document.getElementById('calM1'), m2 = document.getElementById('calM2');
      var MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      var WD = ['Su','Mo','Tu','We','Th','Fr','Sa'];
      var today = new Date(); today.setHours(0,0,0,0);
      var view = new Date(today.getFullYear(), today.getMonth(), 1);
      var selA = null, selB = null;
      var avail = {};        // iso -> true/false (only once the API is live)
      var loaded = {};       // 'aptId:iso-from' -> true

      function iso(d){ return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
      function fromIso(s){ var p = s.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }

      function renderMonth(el, base){
        var html = WD.map(function(w){ return '<span class="wd">' + w + '</span>'; }).join('');
        var first = new Date(base.getFullYear(), base.getMonth(), 1);
        var days = new Date(base.getFullYear(), base.getMonth()+1, 0).getDate();
        for (var i = 0; i < first.getDay(); i++) html += '<button type="button" class="cal-d off" tabindex="-1"></button>';
        for (var d = 1; d <= days; d++){
          var dt = new Date(base.getFullYear(), base.getMonth(), d);
          var k = iso(dt), cls = 'cal-d';
          if (dt < today) cls += ' past';
          else if (avail[k] === false) cls += ' booked';
          if (selA && k === iso(selA)) cls += ' a';
          if (selB && k === iso(selB)) cls += ' b';
          if (selA && selB && dt > selA && dt < selB) cls += ' in';
          html += '<button type="button" class="' + cls + '" data-d="' + k + '">' + d + '</button>';
        }
        el.innerHTML = html;
      }
      function build(){
        t1.textContent = MN[view.getMonth()] + ' ' + view.getFullYear();
        var v2 = new Date(view.getFullYear(), view.getMonth()+1, 1);
        t2.textContent = MN[v2.getMonth()] + ' ' + v2.getFullYear();
        renderMonth(m1, view); renderMonth(m2, v2);
      }
      function fetchMonths(){
        if (!apiApts) return;
        var id = aptId(); if (!id) return;
        var from = iso(view);
        var key = id + ':' + from;
        if (loaded[key]) return;
        loaded[key] = true;
        var to = iso(new Date(view.getFullYear(), view.getMonth()+2, 1));
        fetch('/api/calendar?apartment=' + id + '&from=' + from + '&to=' + to)
          .then(function(r){ return r.json(); })
          .then(function(j){
            if (j && j.ok && j.days){ Object.keys(j.days).forEach(function(k){ avail[k] = j.days[k]; }); build(); }
          }).catch(function(){});
      }
      calRefresh = fetchMonths;

      function nightsFree(a, b){
        var d = new Date(a);
        while (d < b){ if (avail[iso(d)] === false) return false; d.setDate(d.getDate()+1); }
        return true;
      }
      function sync(){
        if (selA && selB){
          var n = Math.round((selB - selA) / 86400000);
          fel.arrival.value = iso(selA);
          fel.nights.value = n;
          var f = function(d){ return d.toLocaleDateString('en-US', { month:'short', day:'numeric' }); };
          label.textContent = f(selA) + ' → ' + f(selB) + ' · ' + n + ' night' + (n > 1 ? 's' : '');
          btn.classList.remove('empty','attn');
          fel.arrival.dispatchEvent(new Event('change'));
          setTimeout(function(){ cal.hidden = true; }, 420);
        } else {
          fel.arrival.value = ''; fel.nights.value = '';
          label.textContent = selA
            ? selA.toLocaleDateString('en-US', { month:'short', day:'numeric' }) + ' → select check-out'
            : 'Add your dates';
          btn.classList.toggle('empty', !selA);
          var q = document.getElementById('quote'); if (q) q.hidden = true;
        }
        if (hint) hint.textContent = !selA ? 'Select your check-in day' : (!selB ? 'Now pick your check-out day' : 'Looks good — you can adjust any time');
      }
      cal.addEventListener('click', function(e){
        var b = e.target.closest('.cal-d');
        if (!b || !b.dataset.d || b.classList.contains('past') || b.classList.contains('off')) return;
        var d = fromIso(b.dataset.d);
        if (b.classList.contains('booked')){
          // a booked day is still a valid CHECK-OUT: guests leave the morning that booking starts
          if (selA && !selB && d > selA && nightsFree(selA, d)){ selB = d; sync(); build(); }
          return;
        }
        if (!selA || (selA && selB)){ selA = d; selB = null; }
        else if (d <= selA){ selA = d; }
        else if (nightsFree(selA, d)){ selB = d; }
        else { selA = d; selB = null; }
        sync(); build();
      });
      btn.addEventListener('click', function(){
        cal.hidden = !cal.hidden;
        if (!cal.hidden){ build(); fetchMonths(); }
      });
      document.getElementById('calPrev').addEventListener('click', function(){
        var prev = new Date(view.getFullYear(), view.getMonth()-1, 1);
        if (prev < new Date(today.getFullYear(), today.getMonth(), 1)) return;
        view = prev; build(); fetchMonths();
      });
      document.getElementById('calNext').addEventListener('click', function(){
        view = new Date(view.getFullYear(), view.getMonth()+1, 1); build(); fetchMonths();
      });
      document.getElementById('calClear').addEventListener('click', function(){ selA = selB = null; sync(); build(); });
      if (fel.villa) fel.villa.addEventListener('change', function(){
        avail = {}; loaded = {}; build(); if (!cal.hidden) fetchMonths();
      });
      btn.classList.add('empty');
      sync(); build();
    })();

    function showSent(direct){
      var title = document.getElementById('bsTitle'), text = document.getElementById('bsText'),
          actions = document.getElementById('bsActions');
      if (direct){
        if (title) title.textContent = 'Request sent — you’re almost there!';
        if (text) text.textContent = 'Your dates are reserved as a request in our calendar. Ana will confirm personally by email with a secure payment link — nothing is charged until then.';
        if (actions) actions.style.display = 'none';
      } else {
        if (title) title.textContent = 'Your enquiry is ready';
        if (text) text.textContent = 'Send it straight to Ana — she replies personally to confirm availability.';
        if (actions) actions.style.display = '';
      }
      bookForm.hidden = true;
      var sent = document.getElementById('bookSent');
      if (sent){ sent.hidden = false; sent.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    }

    bookForm.addEventListener('submit', function(e){
      e.preventDefault();
      var el = this.elements;
      // dates come from the calendar — nudge it open if the guest skipped it
      if (!el.arrival || !el.arrival.value){
        var db = document.getElementById('datesBtn'), c = document.getElementById('cal');
        if (c) c.hidden = false;
        if (db){ db.classList.add('attn'); setTimeout(function(){ db.classList.remove('attn'); }, 2200); db.scrollIntoView({ behavior:'smooth', block:'center' }); }
        return;
      }
      var g = function(n){ var v = el[n] ? String(el[n].value).trim() : ''; return v || '—'; };
      var extras = [].slice.call(this.querySelectorAll('input[name="extra"]:checked')).map(function(c){ return c.value; });

      var composeFallback = function(){
        var subject = 'Booking enquiry — ' + g('villa');
        var body = [
          'Hi Ana, I would like to check availability for a stay at Méndez Estates.',
          '',
          'Villa: ' + g('villa'),
          'Arrival: ' + g('arrival'),
          'Nights: ' + g('nights'),
          'Guests: ' + g('guests'),
          'Extras: ' + (extras.length ? extras.join(', ') : 'None'),
          'Name: ' + g('name'),
          'Email: ' + g('email'),
          'Phone: ' + g('phone'),
          'Country: ' + g('country'),
          'Notes: ' + g('msg'),
          '',
          'Thank you!'
        ].join('\n');
        var mail = document.getElementById('bsMail'), wa = document.getElementById('bsWa');
        if (mail) mail.href = 'mailto:mendezestatesaruba@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        if (wa) wa.href = 'https://wa.me/2975922325?text=' + encodeURIComponent(body);
        showSent(false);
      };

      // direct request-to-book when the live calendar confirmed the dates
      if (lastQuote && lastQuote.available && lastQuote.apartmentId){
        var btn = bookForm.querySelector('button[type="submit"]');
        if (btn){ btn.disabled = true; btn.textContent = 'Sending…'; }
        fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apartmentId: lastQuote.apartmentId,
            arrival: lastQuote.arrival,
            departure: lastQuote.departure,
            guests: el.guests ? el.guests.value : 2,
            name: g('name'), email: g('email'),
            phone: g('phone'), country: g('country'),
            estimate: lastQuote.estimate || null,
            extras: extras, message: el.msg ? el.msg.value : ''
          })
        }).then(function(r){ return r.json(); }).then(function(j){
          if (btn){ btn.disabled = false; btn.textContent = 'Request availability'; }
          if (j && j.ok) showSent(true); else composeFallback();
        }).catch(function(){
          if (btn){ btn.disabled = false; btn.textContent = 'Request availability'; }
          composeFallback();
        });
        return;
      }
      composeFallback();
    });

    var back = document.getElementById('bsBack');
    if (back) back.addEventListener('click', function(){
      var sent = document.getElementById('bookSent'); if (sent) sent.hidden = true;
      bookForm.hidden = false; bookForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();

// ---- clickable hero stats: smooth scroll to their section ----
(function(){
  var links = document.querySelectorAll('.stats a[href^="#"]');
  for (var i = 0; i < links.length; i++) (function(a){
    a.addEventListener('click', function(e){
      var el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      e.preventDefault();
      var y = el.getBoundingClientRect().top + window.pageYOffset - 66;
      window.scrollTo({ top: y, behavior: 'smooth' });
      if (a.getAttribute('href') === '#leave-review'){
        var t = document.querySelector('#leave-review [data-bkm-open]');
        if (t) setTimeout(function(){ t.click(); }, 550);
      }
    });
  })(links[i]);
})();

// ---- car cards: prefill the quotation form with the chosen car ----
(function(){
  var links = document.querySelectorAll('a[data-car]');
  for (var i = 0; i < links.length; i++) (function(a){
    a.addEventListener('click', function(){
      var inp = document.querySelector('#quote input[name="car"]');
      if (inp) inp.value = a.getAttribute('data-car');
    });
  })(links[i]);
})();


// ---- services page: compact inquiry section with a service switcher ----
(function(){
  var seg = document.getElementById('svcSeg');
  if (!seg) return;
  var btns = seg.querySelectorAll('button');
  function show(key){
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('on', btns[i].getAttribute('data-svc') === key);
    var forms = document.querySelectorAll('form[data-svc-form]');
    for (var j = 0; j < forms.length; j++) forms[j].hidden = forms[j].getAttribute('data-svc-form') !== key;
  }
  for (var i = 0; i < btns.length; i++) (function(b){
    b.addEventListener('click', function(){ show(b.getAttribute('data-svc')); });
  })(btns[i]);
  function fromHash(){
    var h = (location.hash || '').replace('#','');
    if (h === 'chef' || h === 'massage' || h === 'tours') show(h);
  }
  fromHash();
  window.addEventListener('hashchange', fromHash);
})();

// ---- service inquiry forms (Private Chef / Massage / Island Tours) ----
// Independent from the property booking flow: composes an email straight to Ana.
(function(){
  var LABELS = { name:'Name', email:'Email', phone:'Phone', date:'Preferred date',
                 occasion:'Occasion', msg:'Message', location:'Location',
                 tour:'Desired tour', guests:'Number of guests', requests:'Special requests',
                 villa:'Villa', rating:'Rating', car:'Preferred car', pickup:'Pick-up date', 'return':'Return date' };
  var forms = document.querySelectorAll('form[data-inquiry]');
  for (var i = 0; i < forms.length; i++) (function(fm){
    fm.addEventListener('submit', function(e){
      e.preventDefault();
      var need = fm.querySelectorAll('[required]');
      for (var r = 0; r < need.length; r++){
        if (!String(need[r].value).trim()){ need[r].focus(); return; }
      }
      var svc = fm.getAttribute('data-inquiry');
      var lines = [svc + ' inquiry — sent from mendezestatesaruba.com', ''];
      var seen = {};
      var fields = fm.querySelectorAll('input,textarea,select');
      for (var j = 0; j < fields.length; j++){
        var f = fields[j], k = f.name;
        if (!k || seen[k]) continue;
        if (f.type === 'radio'){
          var on = fm.querySelector('input[name="' + k + '"]:checked');
          if (on){ lines.push((LABELS[k] || k) + ': ' + on.value); seen[k] = 1; }
          continue;
        }
        if (String(f.value).trim()){ lines.push((LABELS[k] || k) + ': ' + f.value.trim()); seen[k] = 1; }
      }
      lines.push('', 'Thank you!');
      var body = lines.join('\n');
      var nameV = fm.querySelector('input[name="name"]');
      var subject = svc + ' inquiry' + (nameV && nameV.value.trim() ? ' — ' + nameV.value.trim() : '');
      var note = fm.querySelector('.inq-note'), wa = fm.querySelector('.inq-wa');
      if (wa) wa.href = 'https://wa.me/2975922325?text=' + encodeURIComponent(body);
      if (note) note.hidden = false;
      window.location.href = 'mailto:mendezestatesaruba@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  })(forms[i]);
})();
