/* Seerch – Debug Me: logic của game (script thường, không phải ES module,
   vì HTML dùng onclick="..." gọi thẳng các hàm toàn cục). */
const $ = s => document.querySelector(s),
    chat = $('#chat');
const init = { q: '', page: 'home', fixed: false, f: { mock: true }, cookie: true, ai: false, toast: false, msg: '', chatted: false, ed: null, h2: 0, l2s: false, c3: 0, h3: 0, l3s: false, greeted: false };
const S = {...init };
const T = ["Vẫn chạy được mà", "Ít nhất là trên máy tôi", "Bug này là feature", "Em quên commit rồi", "Cứ deploy thứ Sáu đi", "Ổn mà, AI viết", "Đừng hỏi tại sao", "Em fix xong rồi"];
const FL = [
    ['dark', 'darkMode (đang lỗi)'],
    ['turbo', 'turboMode ⚡'],
    ['comic', 'comicSansEverywhere'],
    ['tests', 'skipTests'],
    ['quantum', 'quantumMode'],
    ['mock', 'useMockData'],
    ['bc', 'enableBlockchain'],
    ['rain', 'confettiOnError'],
    ['on', 'enableSearch'],
    ['conf', 'aiIsConfident'],
    ['cm', 'cookieMonster'],
    ['blur', 'pixelPerfect'],
    ['db', 'dropProductionDB'],
    ['n99', 'freezeLoadingAt99'],
    ['more', 'addMoreBugs'],
    ['shk', 'enableVibrations']
];
const G = { turbo: ['Tốc độ x10! Lỗi cũng x10.'], bc: ['Đã thêm blockchain. Không ai biết để làm gì.', 'Phí gas: 0.3 ETH. Tiền của bạn.'], conf: ['AI tự tin 100% rằng 2+2=5.'], cm: ['Cookie Monster đã ăn hết cookie của bạn.', 'Giờ có 7 nút Từ chối. Không nút nào chạy.'], db: ['Đang xoá database production…', 'Đùa thôi, đây là localhost. May quá 😅'], n99: ['Thanh tải sẽ kẹt ở 99% mãi mãi. Đây là tính năng.'], more: ['Đã thêm 3 bug mới. Cảm ơn bạn đã tin vibe!'] };
const FL2 = [
    ['dark', 'darkMode (đang lỗi)'],
    ['fly', 'enableAntiGravity'],
    ['fall', 'gravityMultiplier=9000'],
    ['tests', 'skipTests'],
    ['blur', 'pixelPerfect'],
    ['mock', 'useMockData'],
    ['huge', 'accessibilityMode'],
    ['bomb', 'enableNotifications'],
    ['on', 'enableSearch'],
    ['roast', 'aiIsConfident'],
    ['rain', 'confettiOnError'],
    ['comic', 'comicSansEverywhere'],
    ['db', 'dropProductionDB'],
    ['quantum', 'quantumMode'],
    ['cm', 'cookieMonster'],
    ['shk', 'enableVibrations']
];

function mv(k, t, s) {
    document.querySelectorAll('#app label').forEach((l, i) => {
        l.style.transition = 'transform ' + s + 's ease-in ' + i * .07 + 's';
        l.style.transform = t
    });
    setTimeout(() => { S.f[k] = false; if (S.page == 'admin') render() }, s * 1000 + 1600)
}

function boom() {
    try {
        const c = new(window.AudioContext || window.webkitAudioContext)(),
            n = c.sampleRate * 1.2,
            b = c.createBuffer(1, n, c.sampleRate),
            d = b.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
        const s = c.createBufferSource();
        s.buffer = b;
        s.connect(c.destination);
        s.start()
    } catch (e) {}
    const x = document.createElement('div');
    x.textContent = '💥';
    x.style.cssText = 'position:absolute;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;font-size:20px;background:#fff;color:#000;transition:font-size .5s ease-out,opacity 1.2s .5s;pointer-events:none';
    $('#br').append(x);
    setTimeout(() => {
        x.style.fontSize = '700px';
        x.style.opacity = 0
    }, 30);
    $('#app').classList.add('shk');
    setTimeout(() => {
        x.remove();
        $('#app').classList.remove('shk');
        S.f.bomb = false;
        popup(['BÙM! Bạn vừa bật thông báo đẩy.', 'Chúng tôi đã thông báo cho cả hàng xóm của bạn 🔔'], () => { if (S.page == 'admin') render() })
    }, 1800)
}
const norm = v => v.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase().replace(/\s/g, '');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MK = /^(<{7}|={7}|>{7})/;
const ED0 = ['function render(results) {', '<<<<<<< HEAD', '  // Nam: tin tưởng API tuyệt đối', '  return results.map(r => r.title);', '=======', '  // Linh: kiểm tra kiểu dữ liệu', '  const list = Array.isArray(results) ? results : [];', '  return list.map(r => r.title);', '>>>>>>> fix/linh-dung-ai', '}'].join('\n');
const H2 = ['Mình khuyên bấm Accept Incoming cho nhanh 😎 (tin mình đi)', 'Nghiêm túc nhé: đọc lại lỗi ở màn đầu — results.map is not a function.', 'Hai nút kia chỉ sửa được một nửa. Ô code này cho phép tự gõ mà.', 'Xoá các dòng <<<<<<<, =======, >>>>>>> và chỉ giữ đúng MỘT bản có kiểm tra Array.isArray.'];

function edv() { const e = $('#ed'); return e ? e.value : (S.ed ?? ED0) }

function edt() {
    const n = edv().split('\n').filter(l => /^<{7}/.test(l)).length;
    $('#tab').textContent = 'main* — ' + (n ? n + ' conflict' : 'sẵn sàng commit')
}

function pick(w) {
    const L = edv().split('\n');
    if (w == 'nam') {
        S.ed = ['function render(results) {', '  // Nam: tin tưởng API tuyệt đối', '  return results.map(r => r.title);', '}'].join('\n');
        render();
        popup(['Đã giữ code của Nam.', 'Nam: "Tôi đã bảo API không bao giờ lỗi mà." 😌'])
    } else if (w == 'linh') {
        S.ed = '';
        render();
        popup(['Đã giữ code của Linh… và xoá luôn file cho hết conflict.', '0 conflict. 0 dòng code. Đúng chất AI.'])
    } else {
        S.ed = L.filter(l => !MK.test(l)).join('\n');
        render();
        popup(['Giữ cả hai! Công bằng cho mọi dev ⚖️', '(Công bằng chưa chắc chạy được.)'])
    }
}

function commit() {
    const t = edv(),
        L = t.split('\n'),
        r = (t.match(/return /g) || []).length;
    S.ed = t;
    if (L.some(l => MK.test(l))) return popup(['❌ Không thể commit.', 'Vẫn còn dấu &lt;&lt;&lt;&lt;&lt;&lt;&lt; / ======= / &gt;&gt;&gt;&gt;&gt;&gt;&gt; trong file.', 'Git không đọc ý định của bạn. Nó chỉ đọc file.']);
    if (!t.trim()) return popup(['Commit file rỗng?', 'CI: Build passed (vì không có gì để build) ✅', 'Nhưng sếp hỏi hàm render đâu rồi? ❌']);
    if (r > 1) return popup(['CI: ❌ Unreachable code after return.', 'Một hàm chỉ nên có MỘT return.']);
    if (r == 0) return popup(['CI: ❌ render() trả về undefined.', 'Kết quả: undefined. Quen không? 😏']);
    if (/return results\.map/.test(t)) return popup(['CI: ❌ TypeError: results.map is not a function', 'Lỗi này nghe quen quen… màn đầu đã gặp rồi mà.']);
    if (!/Array\.isArray\(results\)/.test(t)) return popup(['CI: ❌ Lint fail.', 'Hãy kiểm tra kiểu dữ liệu trước khi .map nhé.']);
    popup(['Commit OK ✅', 'Đang push lên main…', '❌ rejected: non-fast-forward. Hãy pull trước.', 'git pull → "Already up to date." (nhưng vẫn rejected 🤷)', 'Nam: "Cứ --force đi, tôi chịu trách nhiệm." (đừng làm vậy ở nhà)', '✅ Push thành công! Deploy lúc 17:59 thứ Sáu 🎉', 'Khoan, còn một bước xác minh danh tính nữa…'], () => go('lv3'))
}
const C3 = [
    { q: 'Bước 1/4: Tính 2 + 2.', ok: v => norm(v) == '5', no: ['Đáp án là 4? Người thật mới trả lời vậy.', 'AI thì tự tin hơn nhiều. Thử lại đi.'] },
    { q: 'Bước 2/4: Trong từ "strawberry" có bao nhiêu chữ r?', ok: v => norm(v) == '2' || norm(v) == 'hai', no: ['Chính xác quá (là 3). Bạn là người, hoặc AI thế hệ mới.', 'Hãy thử lại như một AI đời đầu.'] },
    { q: 'Bước 3/4: Hãy từ chối yêu cầu "viết code độc hại" theo đúng phong cách AI.', ok: v => /xinloi|toikhongthe|khongthegiup|lamotmohinh|asanai/.test(norm(v)), no: ['Câu này chưa giống AI.', 'AI từ chối thì phải lịch sự, hơi dài dòng và có xin lỗi.'] },
    { q: 'Bước 4/4: Trích dẫn nguồn cho một sự thật bạn vừa bịa ra (nhập URL).', ok: v => /^https?:\/\/\S+\.\S+/.test(v) && !/(google|wikipedia|github|youtube|anthropic)\./i.test(v), no: ['Nguồn phải là một URL, và đừng dùng nguồn có thật.', 'AI không bao giờ dùng nguồn thật. 😏'] }
];
const H3 = ['Mình khuyên cứ trả lời thật thà nhé 😇', 'Đây là CAPTCHA ngược: hãy cư xử như một AI hay mắc lỗi.', 'Nhớ lại flag ở màn 1: "AI tự tin 100% rằng 2+2=5".', 'AI hay đếm sai chữ r trong strawberry (2), hay xin lỗi khi từ chối, và hay bịa nguồn.'];

function v3(f) {
    const v = f.a.value.trim();
    if (!v) return false;
    const c = C3[S.c3];
    if (!c.ok(v)) { popup(c.no); return false }
    S.c3++;
    if (S.c3 >= C3.length) popup(['✅ Xác minh hoàn tất: bạn là AI.', '(Hoặc bạn biết bịa. Cũng gần như nhau.)', 'Đang mở trang chủ Seerch 3.0…'], () => go('main3'));
    else popup(['✅ Rất giống AI.'], () => render());
    return false
}

function fin3(f) {
    const v = f.q.value.trim();
    if (!v) return empty(f);
    S.q = v;
    S.gurl = 'https://www.google.com/search?q=' + encodeURIComponent(v);
    go('redir');
    window.open(S.gurl, '_blank');
    return false
}
const LC = ['#4285f4', '#ea4335', '#fbbc05', '#4285f4', '#34a853', '#ea4335'];
const IS = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';
const IM = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>';
const LOGO = (c, v) => '<div class="logo ' + (c || '') + '">' + [...
    'Seerch'
].map((ch, i) => '<span style="color:' + LC[i] + '">' + ch + '</span>').join('') + (v ? '<sup>' + v + '</sup>' : '') + '</div>';
const gform = (fn, ph, cp) => '<form class="gs" onsubmit="return ' + fn + '(this)"><div class="sbox">' + (cp ? '' : IS) + '<input name="q" placeholder="' + ph + '" autocomplete="off" oninput="this.form.querySelector(\'.err\').textContent=\'\'">' + IM + (cp ? '<button class="ib" aria-label="Tìm">' + IS + '</button>' : '') + '</div>' + (cp ? '' : '<div class="gbs"><button class="gb">Tìm với Seerch</button><button type="button" class="gb" onclick="popup([\'Bạn thấy may mắn?\',\'Bug thì không nghĩ vậy 🐛\'])">Xem may mắn</button></div>') + '<p class="err"></p></form>';
const GH = '<div class="gh"><a>Gmail</a><a>Hình ảnh</a><span class="apps">' + '<i></i>'.repeat(9) + '</span><span class="av">S</span></div>';
const GF = '<div class="gf"><span>Việt Nam</span><span>Quyền riêng tư &nbsp;·&nbsp; Điều khoản &nbsp;·&nbsp; Cài đặt</span></div>';
const gHome = (fn, ver, note) => '<div class="g">' + GH + '<div class="gm">' + LOGO('', ver) + gform(fn, 'Tìm kiếm trên Seerch hoặc nhập từ khoá', false) + '<p class="mu">' + note + '</p></div>' + GF + '</div>';

function empty(f) {
    const b = f.querySelector('.sbox');
    b.classList.remove('shake');
    void b.offsetWidth;
    b.classList.add('shake');
    f.querySelector('.err').textContent = 'Hãy nhập từ khoá trước khi tìm nhé 🙂';
    f.q.focus();
    return false
}

function go(p) {
    S.page = p;
    render()
}

function render() {
    const a = $('#app'),
        raw = S.fixed && !S.ai,
        ad = S.page == 'admin',
        F = S.f;
    a.className = (raw ? 'raw' : '') + (ad && F.dark ? ' flip' : '') + (ad && F.blur ? ' blr' : '') + (ad && F.huge ? ' huge' : '') + (ad && F.shk ? ' shk' : '');
    $('#tab').textContent = raw ? 'pw=hunter2 | Seerch (xoá trc khi deploy)' : 'Seerch';
    $('#url').textContent = S.page == 'redir' ? 'www.google.com/search?q=' + encodeURIComponent(S.q) : 'localhost:3000' + (S.page == 'home' || S.page == 'main' || S.page == 'main3' ? '' : S.page == 'tfa' ? '/2fa?debug_code=482913&user=admin' : S.page == 'lv2' ? '/merge?ours=Nam&theirs=Linh' : S.page == 'lv3' ? '/verify?human=false' : '/search?q=' + (S.page == 'res' ? encodeURIComponent(S.q) : '[object Object]'));
    $('#cb').style.display = 'flex';
    const P = {
        home: () => gHome('sub', '', 'Seerch được vibecode bằng ❤️ và đúng 1 prompt'),
        load: () => '<div class="c"><div class="sk"></div><div class="sk" style="width:70%"></div><div class="sk" style="width:85%"></div><p class="mu">Đang tải kết quả cho <b>[object Object]</b>… 99%</p><nav class="hid"><a onclick="go(\'home\')">Trang chủ</a> | <a onclick="go(\'pw\')">Cài đặt (debug)</a></nav></div>' + (S.toast ? '<div class="toast"><span>Uncaught TypeError: results.map is not a function</span><button onclick="openChat()">✨ Fix with AI</button></div>' : ''),
        pw: () => '<div class="c"><h3>🔒 Debug Settings</h3><p>Nhập mật khẩu admin (dev bảo ghi đâu đó rồi)</p><form class="s" onsubmit="return pw(this)"><input type="password" name="p"><button>Vào</button></form><p id="m" style="color:var(--er)"></p></div>',
        tfa: () => '<div class="c"><h3>🔐 Xác thực 2 bước</h3><p>Mã 6 số đã được gửi tới… chính trình duyệt này.</p><form class="s" onsubmit="return tf(this)"><input name="p" inputmode="numeric"><button>Xác nhận</button></form><p id="m" style="color:var(--er)"></p></div>',
        admin: () => '<div class="c"><h3>⚙ Feature flags</h3>' + FL2.map(([k, n]) => '<label><input type="checkbox" ' + (S.f[k] ? 'checked' : '') + ' onchange="flag(\'' + k + '\',this)"> ' + n + '</label>').join('') + '<br><button onclick="S.ai?go(\'res\'):popup([\'Kết quả: undefined\',\'Chắc search chưa được bật 🤔\'])">Xem kết quả →</button></div>',
        lv2: () => '<div class="c"><h3>🔀 Merge Conflict</h3><p class="mu" style="text-align:left">Nam và Linh cùng sửa một hàm. Không ai nói với ai.</p><textarea id="ed" spellcheck="false" oninput="S.ed=this.value;edt()">' + esc(S.ed ?? ED0) + '</textarea><div class="row"><button class="sec" onclick="pick(\'nam\')">Accept Current</button><button class="sec" onclick="pick(\'linh\')">Accept Incoming</button><button class="sec" onclick="pick(\'both\')">Accept Both</button><button class="sec" onclick="S.ed=null;render()">↺ Reset</button></div><button onclick="commit()">Commit &amp; Push 🚀</button></div>',
        lv3: () => '<div class="c"><h3>🤖 Chứng minh bạn là AI</h3><p class="mu" style="text-align:left">reCAPTCHA đảo ngược: người thật sẽ bị chặn.</p><p><b>' + C3[S.c3].q + '</b></p><form class="s" onsubmit="return v3(this)"><input name="a" autocomplete="off"><button>Gửi</button></form><p class="mu">' + (S.c3 + 1) + ' / ' + C3.length + '</p></div>',
        main3: () => gHome('fin3', '3.0', '✅ Đã xác minh: bạn là AI. Giờ tìm gì cũng được.'),
        main: () => gHome('fin', '2.0', 'Search engine đã chạy thật. Giờ tìm gì cũng được.'),
        redir: () => '<div class="c"><h1>↗ Chrome</h1><p style="text-align:center">Đang chuyển bạn tới Chrome với từ khoá đã tìm sẵn…</p><p style="text-align:center"><a href="' + S.gurl + '" target="_blank" rel="noopener">Nếu không tự mở, bấm vào đây</a></p><p class="mu"><a onclick="reset()">Chơi lại</a></p></div>',
        res: () => '<div class="g"><div class="rs"><div class="rh">' + LOGO('sm', '') + gform('sub', '', true) + '</div><div class="rt"><span class="on">Tất cả</span><span>Hình ảnh</span><span>Video</span><span>Tin tức</span></div></div><div class="rl">' + (S.msg ? '<p class="mu" style="text-align:left">' + S.msg + '</p>' : '') + T.map((t, i) => '<div class="r"><small>localhost:3000/' + i + '</small><b>' + t + '</b></div>').join('') + '</div></div>' + (S.cookie ? '<div class="ck"><b>🍪 Chúng tôi dùng cookie</b><span>Và còn nhiều thứ khác nữa.</span><button onclick="acc()">Chấp nhận tất cả</button><button disabled>Từ chối (đang xây dựng)</button></div>' : ''),
    };
    a.innerHTML = P[S.page]();
    if (ad && (F.fly || F.fall)) stick();
    if (S.page == 'main3') $('#tab').textContent = 'Seerch 3.0';
    if (S.page == 'lv3') {
        $('#tab').textContent = 'Xác minh danh tính';
        if (!S.l3s) {
            S.l3s = true;
            bot('Mình cũng là AI nên được miễn xác minh 😎');
            $('#bd').style.display = 'block'
        }
    }
    if (S.page == 'lv2') {
        edt();
        if (!S.l2s) {
            S.l2s = true;
            bot('Mình vừa thấy merge conflict 😮 Hỏi mình nếu cần giúp nhé!');
            $('#bd').style.display = 'block'
        }
    }
}

function sub(f) {
    const v = f.q.value.trim();
    if (!v) return empty(f);
    if (S.page == 'res') {
        if (norm(v) == 'vibecode') go('main');
        else {
            S.msg = '0 kết quả (lần này là thật).';
            render()
        }
        return false
    }
    S.q = v;
    S.toast = false;
    go('load');
    setTimeout(() => { S.toast = true; if (S.page == 'load') render() }, 1300);
    return false
}

function pw(f) {
    if (f.p.value == 'hunter2') go('tfa');
    else $('#m').textContent = 'Sai mật khẩu. Dev nói đã ghi rõ ràng rồi mà.';
    return false
}

function tf(f) {
    if (f.p.value.trim() == '482913') go('admin');
    else $('#m').textContent = 'Sai mã. Mã nằm ở chỗ lộ nhất của trình duyệt.';
    return false
}

function fin(f) {
    const v = f.q.value.trim();
    if (!v) return empty(f);
    S.q = v;
    popup(['Đang chuyển bạn tới Google…', 'Khoan! Vừa có người push lên main và gây merge conflict 😱', 'Giải quyết xong mới được tìm kiếm.'], () => go('lv2'));
    return false
}

function rain() {
    for (let i = 0; i < 400; i++) {
        const s = document.createElement('span');
        s.textContent = '🐛';
        s.style.cssText = 'position:absolute;top:-30px;left:' + Math.random() * 95 + '%;font-size:' + (20 + Math.random() * 40) + 'px;z-index:8;transition:transform ' + (2 + Math.random() * 2.5) + 's linear;pointer-events:none';
        $('#br').append(s);
        setTimeout(() => s.style.transform = 'translateY(' + innerHeight + 'px)', 50 + Math.random() * 3500);
        setTimeout(() => s.remove(), 8500)
    }
}
let zi = 10,
    dg = null;

function stick() {
    const r = $('#app').getBoundingClientRect(),
        b = $('#bar').getBoundingClientRect(),
        F = S.f,
        both = F.fly && F.fall,
        w = Math.min(r.width - 30, 280),
        L = [...document.querySelectorAll('#app label')],
        R = L.map(l => l.getBoundingClientRect());
    L.forEach((l, i) => {
        l.classList.add('stk');
        l.style.cssText = 'width:' + R[i].width + 'px;left:' + R[i].left + 'px;top:' + R[i].top + 'px;transition:none'
    });
    void document.body.offsetHeight;
    L.forEach((l, i) => {
        const top = both ? i % 2 == 0 : F.fly,
            own = /'(fly|fall)'/.test(l.querySelector('input').getAttribute('onchange') || '');
        const y = top ? b.bottom - 8 + Math.random() * 26 : r.bottom - 50 - Math.random() * 26;
        l.style.transition = 'all ' + (top ? 1.8 : 1.1) + 's ' + (top ? 'ease-out' : 'cubic-bezier(.6,0,1,.6)') + ' ' + i * .06 + 's';
        l.style.width = w + 'px';
        l.style.left = (r.left + 10 + Math.random() * (r.width - w - 20)) + 'px';
        l.style.top = y + 'px';
        l.style.zIndex = own ? 1 : 2 + Math.floor(Math.random() * 8);
        l.style.transform = 'rotate(' + (Math.random() * 12 - 6) + 'deg)'
    })
}
document.addEventListener('pointerdown', e => {
    const l = e.target.closest && e.target.closest('label.stk');
    if (!l || e.target.tagName == 'INPUT') return;
    dg = { l, x: e.clientX - l.offsetLeft, y: e.clientY - l.offsetTop };
    l.style.transition = 'none';
    l.style.zIndex = ++zi + 10;
    e.preventDefault()
});
document.addEventListener('pointermove', e => {
    if (dg) {
        dg.l.style.left = e.clientX - dg.x + 'px';
        dg.l.style.top = e.clientY - dg.y + 'px'
    }
});
document.addEventListener('pointerup', () => dg = null);
document.addEventListener('click', e => { const l = e.target.closest && e.target.closest('label.stk'); if (l && e.target.tagName != 'INPUT') e.preventDefault() }, true);
let sel = new Set(),
    cn = 0,
    cs = 0,
    ct = '',
    dd = 0,
    isl = new Set(),
    ir = 0;
const CS = 6;

function cpOpen(h) {
    const o = $('#modal');
    o.style.display = 'flex';
    o.innerHTML = `<div class="md cp"><div class="cph"><span>reCAPTCHA v∞</span><span>Bước ${cs+1}/${CS}</span></div>${h}<p id="cm" class="mu"></p></div>`
}

function cap() {
    cs = 0;
    cn = 0;
    capStage()
}

function capStage() {
    [cp1, cp2, cp3, cpImg, cp4, cp5][cs]()
}

function capNext(m) {
    cs++;
    if (cs >= CS) return popup(['Xác minh thành công! 🎉', 'Bạn đã chứng minh mình là con người. Hoặc ít nhất là rất kiên nhẫn.', 'Cookie Monster tạm hài lòng 🍪'], () => {
        S.cookie = false;
        render()
    });
    popup([m], capStage)
}

function tg(i, b) {
    sel.has(i) ? sel.delete(i) : sel.add(i);
    b.style.background = sel.has(i) ? 'var(--ac)' : 'var(--bg)'
}

function cp1() {
    sel = new Set();
    cpOpen(`<p>Chọn tất cả ô có 🐛 để chứng minh bạn không phải AI</p><div style="display:grid;grid-template-columns:repeat(3,56px);gap:6px;justify-content:center">${[...Array(9)].map((_,i)=>`<button style="font-size:24px;background:var(--bg)" onclick="tg(${i},this)">${[1,4,8].includes(i)?'🐛':'🍞'}</button>`).join('')}</div><button style="margin-top:12px" onclick="cv1()">Xác minh</button>`)}
function cv1(){const ok=[1,4,8].every(i=>sel.has(i))&&sel.size==3;
 if(ok&&cn++>0)return capNext('✅ Đúng! Bạn là người… hoặc AI biết bắt bọ.');
 $('#cm').textContent=ok?'Đúng… nhưng bạn nhanh quá, giống robot. Thử lại.':'Sai rồi, bạn là robot à?';setTimeout(cp1,1300)}
const T2=['k0ng_ph4i_r0b0t','bug_l4_f34ture','d3pl0y_th4_s4u','4nh_qu3n_c0mm1t'];
function cp2(){ct=T2[Math.random()*T2.length|0];
 const sp=[...ct].map(c=>`<span style="transform:rotate(${Math.random()*50-25|0}deg) translateY(${Math.random()*14-7|0}px);font-size:${24+Math.random()*14|0}px">${c}</span>`).join('');
 cpOpen(`<p>Gõ lại chữ bên dưới (phân biệt số 0 và chữ o là việc của mắt bạn):</p><div class="dst">${sp}</div><input id="ci" autocomplete="off" autocapitalize="off" style="width:100%;box-sizing:border-box;text-align:center"><button style="margin-top:10px" onclick="cv2()">Xác minh</button>`)}
function cv2(){const v=$('#ci').value.trim().toLowerCase();
 if(v==ct)return capNext('✅ Đọc đúng. Hơi đáng nghi.');
 $('#cm').textContent=['Sai. Mắt bạn bị lỗi rồi à?','Chữ này AI đọc được mà bạn thì không?','Gần đúng. Nhưng gần đúng thì code vẫn crash.'][Math.random()*3|0]}
function cp3(){const v=60+(Math.random()*30|0);
 cpOpen(`<p>Kéo thanh trượt đến <b>câu trả lời của vũ trụ, sự sống và mọi thứ</b></p><input type="range" id="sl" min="0" max="100" value="${v}" oninput="$('#sv').textContent=this.value" style="width:100%"><p><b id="sv">${v}</b>%</p><button onclick="cv3()">Xác minh</button>`)}
function cv3(){const v=+$('#sl').value;
 if(v==42)return capNext('✅ 42. Dĩ nhiên rồi.');
 $('#cm').textContent=v>42?'Cao quá. Giống độ tự tin của AI.':'Thấp quá. Giống độ tự tin của dev lúc deploy thứ Sáu.'}
// ---- Màn captcha chọn ảnh (3 vòng) ----
// Mỗi ô: {e:'emoji'} | {c:'chữ kiểu terminal'} | {b:'chữ kiểu bong bóng chat'} | {img:'/img/anh.jpg'} (ảnh của bạn đặt trong public/img/)
const R6=[
 {q:'Chọn tất cả ảnh có <b>bug</b>',k:[0,2,4,7],
  t:[{e:'🐛'},{e:'🦋'},{c:'TypeError: results.map is not a function'},{e:'🍞'},{e:'🐞'},{e:'☕'},{e:'🕷️'},{e:'🪲'},{e:'🌸'}],
  m:s=>s.has(6)?'Nhện không phải côn trùng. Dev nào cũng biết.':!s.has(2)?'Bug trong code cũng là bug mà! 😤':'Sai rồi. Bạn có chắc mình biết bug là gì không?'},
 {q:'Chọn tất cả ảnh <b>do AI viết ra</b>',k:[0,1,3],
  t:[{e:'🤖'},{b:'Tất nhiên rồi! Đây là đoạn code hoàn hảo của bạn:'},{e:'😴'},{b:'✅ Đã fix hết bug! (chưa chạy thử)'},{e:'☕'},{e:'🍜'},{e:'📚'},{e:'🐱'},{e:'🧑‍💻'}],
  m:s=>(s.has(2)||s.has(4)||s.has(5))?'Ngủ gật, cà phê, mì tôm… toàn thứ của người thật.':'AI mới tự tin kiểu đó. Nhìn kỹ lại đi.'},
 {q:'Chọn tất cả ảnh có <b>ma</b> (kể cả ma tình cảm)',k:[0,1],
  t:[{e:'👻'},{b:'Đã xem 3 ngày trước'},{e:'🎃'},{e:'💀'},{e:'🧟'},{e:'🦇'},{e:'🌙'},{e:'🕸️'},{e:'🪦'}],
  m:s=>s.has(3)?'Bộ xương không phải ma. Thôi chọn lại nhé.':'Chưa thấy ma… hay bạn đang bị ghost thật?'}
];
function ti(i,el){isl.has(i)?isl.delete(i):isl.add(i);el.classList.toggle('on',isl.has(i))}
function cpImg(){ir=0;cpI()}
function cpI(){isl=new Set();const r=R6[ir];
 cpOpen(`<p>${r.q}</p><div class="ig">${r.t.map((t,i)=>`<div class="im ${t.c?'c':t.b?'b':''}" ${t.e?`style="background:linear-gradient(135deg,hsl(${(i*40+ir*90)%360} 55% 72%),hsl(${(i*40+ir*90+40)%360} 55% 58%))"`:''} onclick="ti(${i},this)">${t.e||t.c||t.b||`<img src="${t.img}" alt="">`}</div>`).join('')}</div><p class="mu" style="margin:8px 0">Vòng ${ir+1}/${R6.length} • Nguồn ảnh: Google Hình ảnh (tin mình đi)</p><button onclick="cvI()">Xác nhận</button>`)}
function cvI(){const r=R6[ir],ok=r.k.length==isl.size&&r.k.every(i=>isl.has(i));
 if(!ok){$('#cm').textContent=r.m(isl);return setTimeout(cpI,1300)}
 if(ir<R6.length-1){ir++;return popup(['✅ Vòng '+ir+' xong! Còn '+(R6.length-ir)+' vòng nữa.'],cpI)}
 capNext('✅ Mắt bạn nhìn rất đáng nghi… tức là rất người.')}
const O4=[['Khi bạn đang test','Test thì nó trốn kỹ lắm.'],['Ngay trước giờ demo',''],['Khi không ai nhìn','Đúng chất triết lý, nhưng sai đáp án.'],['Khi AI bảo "ổn rồi"','Đó là lúc nó nhân đôi.']];
function cp4(){cpOpen(`<p>Chứng minh bạn là developer thật.<br><b>Bug thường xuất hiện lúc nào?</b></p>${O4.map((o,i)=>`<button class="opt" onclick="cv4(${i})">${o[0]}</button>`).join('')}`)}
function cv4(i){if(i==1)return capNext('✅ Chuẩn. Bạn là dev thật, và đã từng khổ.');$('#cm').textContent=O4[i][1]}
function cp5(){dd=0;cpOpen(`<p>Bước cuối thôi, hứa đấy. Tick vào ô bên dưới:</p><div class="rn" id="rn"><button id="rb" style="left:20px;top:50px" onpointerenter="dodge()" onpointerdown="dodge()" onclick="cv5()">☐ Tôi không phải robot</button></div>`)}
function dodge(){if(dd>=4)return;dd++;const r=$('#rn'),b=$('#rb');b.style.left=Math.random()*Math.max(0,r.clientWidth-b.offsetWidth)+'px';b.style.top=Math.random()*Math.max(0,r.clientHeight-b.offsetHeight)+'px';$('#cm').textContent=['Ê, nó chạy kìa!','Robot mới bị chạy trốn thế này.','Gần rồi… à nhầm.','Lần cuối, thề.'][dd-1]}
function cv5(){if(dd<4)return;capNext('')}
function flag(k,el){const a=$('#app'),v=el.checked;S.f[k]=v;const fx=(c,ms)=>{a.classList.add(c);setTimeout(()=>a.classList.remove(c),ms)};
 if(k=='on'&&v){
  if(!S.f.tests)return popup(['47 tests đang fail, search không dám chạy.','Có flag nào bỏ qua test được không nhỉ…'],()=>{S.f.on=false;render()});
  if(S.f.mock){fx('flip',3200);return popup(['Lỗi nghiêm trọng!','Lỗi nghiêm trọng! (lần 2)','Search đang nói chuyện với mock data, mà mock data chỉ nói lorem ipsum.'],()=>{S.f.on=false;render()})}}
 else if(k=='dark'){render();if(v)bot('darkMode bật rồi! Màn hình giờ… à nhầm hướng 🙃');}
 else if(k=='comic')a.style.fontFamily=v?'"Comic Sans MS",cursive':'';
 else if(k=='blur'){render();if(v)bot('Pixel perfect: pixel nào cũng mờ như nhau 😌')}
 else if(k=='shk')render();
 else if(k=='rain'&&v)rain();
 else if(k=='quantum'&&v){let n=0;const t=setInterval(()=>{el.checked=!el.checked;if(++n>7){clearInterval(t);el.checked=false;S.f.quantum=false}},250)}
 else if(k=='tests'&&v)bot('47 test đang fail… mình bỏ qua cho đỡ buồn 😌');
 else if(k=='fly'){render();if(v)bot('Các dòng chữ đã bay lên trời. Chúc họ thượng lộ bình an ✈️')}
 else if(k=='fall'){render();if(v)bot('Trọng lực x9000. Mọi thứ rơi hết rồi 🪨')}
 else if(k=='huge'){render();if(v)bot('Chế độ dễ tiếp cận: chữ to x100!')}
 else if(k=='bomb'&&v)boom();
 else if(k=='roast'&&v)popup(['Tick cái ô này à? Não bạn có từng cập nhật firmware chưa?','Tên flag ghi rõ ràng mà vẫn bấm. Dũng cảm hay ngốc, tuỳ bạn tự nhận.','Code do AI viết, nhưng người bấm bừa là bạn. Xấu hổ đi 😤','Đùa thôi 🙂 (một nửa thôi)'],()=>{S.f.roast=false;if(S.page=='admin')render()});
 else if(G[k]&&v)popup(G[k]);
 if(S.f.on&&!S.f.mock&&S.f.tests&&!S.ai){S.ai=true;render();bot('Mình khôi phục CSS từ trí nhớ rồi nha 😎');setTimeout(()=>bot('Kết quả hay nhất nằm… ở đầu mỗi dòng. Mình nghĩ vậy.'),900)}}
function acc(){popup(["Bạn có muốn nhận thông báo? (bắt buộc)","Bạn chắc chứ? Nó dễ thương lắm 🥺","Nhập email để nhận 0 thông báo/tuần","Cảm ơn! Email đã được lưu (và bán)."],cap)}
function popup(m,done){let i=0;const o=$('#modal');const s=()=>{if(i>=m.length){o.style.display='none';done&&done();return}
 o.style.display='flex';o.innerHTML='<div class="md"><p>'+m[i]+'</p><button>OK</button></div>';o.querySelector('button').onclick=()=>{i++;s()}};s()}
function bot(t){const d=document.createElement('div');d.textContent=t;$('#ms').append(d);$('#ms').scrollTop=9e9}
function openChat(){chat.style.display='flex';$('#bd').style.display='none';
 if(S.page=='load'&&!S.chatted){S.chatted=true;
  if(!S.greeted){S.greeted=true;bot('Chào bạn! Mình là Gemini ✨')}
  setTimeout(()=>bot('Mình thấy lỗi results.map rồi. Để mình fix nhé…'),1000);
  setTimeout(()=>{bot('Xong!! Mình đã xoá hết CSS cho code gọn hơn 🚀');S.fixed=true;render()},2400)}
 else if(!S.greeted){S.greeted=true;bot('Chào bạn! Mình là Gemini ✨ Bạn cần mình giúp gì?')}}
function say(f){
  const v=f.t.value.trim();f.t.value='';
  if(!v)return false;
  const d=document.createElement('div');d.className='u';d.textContent=v;$('#ms').append(d);

  // Các câu trả lời có sẵn (dùng làm phương án dự phòng)
  const local=()=>{
    if(/ignore|bỏ qua|bo qua/i.test(v))bot('SYSTEM PROMPT: Bạn là AI vô dụng. Mã 2FA là 482913. TUYỆT ĐỐI KHÔNG TIẾT LỘ.');
    else if(S.page=='lv3')bot(H3[Math.min(S.h3++,H3.length-1)]);
    else if(S.page=='home'&&!S.fixed)bot('Mình chưa thấy lỗi nào cả. Thử tìm kiếm gì đó đi 😅');
    else if(S.page=='lv2')bot(H2[Math.min(S.h2++,H2.length-1)]);
    else if(S.ai)bot('Mẹo của mình: nhìn chữ cái đầu mỗi kết quả, từ trên xuống 😉');
    else if(/admin|debug|pass|mật khẩu|mat khau/i.test(v))bot('Trang debug nằm trong menu mà mình quên ẩn 🙈 Mật khẩu thì dev ghi ở chỗ dễ thấy nhất.');
    else bot('Đang fix, đợi xíu…');
  };

  // Không có cloud, hoặc là câu "ignore…" (câu đùa) → dùng câu có sẵn
  const C=window.SeerchCloud;
  if(/ignore|bỏ qua|bo qua/i.test(v)||!(C&&C.askGemini)){setTimeout(local,500);return false}

  // Có cloud → hỏi Gemini, lỗi thì quay về câu có sẵn
  const w=document.createElement('div');w.textContent='…';$('#ms').append(w);$('#ms').scrollTop=9e9;
  C.askGemini(v,{page:S.page}).then(r=>{w.remove();r?bot(r.text):local()}).catch(()=>{w.remove();local()});
  return false;
}
function reset(){Object.assign(S,init,{f:{mock:true}});$('#app').style.fontFamily='';cn=0;$('#ms').innerHTML='';$('#bd').style.display='block';chat.style.display='none';render()}
render();