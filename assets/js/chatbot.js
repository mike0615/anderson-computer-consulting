// Anderson Computer Consulting — Chatbot Widget
// Backend: Botpress Cloud (free tier) — https://botpress.com
//
// SETUP INSTRUCTIONS:
//  1. Sign up at https://botpress.com
//  2. Create a new bot → configure knowledge base and flows
//  3. Go to your bot → Share → Integrate → copy botId and clientId
//  4. Fill in BOTPRESS_BOT_ID and BOTPRESS_CLIENT_ID below
//  5. Push to GitHub — Botpress activates automatically
//
// While unconfigured the widget runs a local keyword-fallback mode.

const BOTPRESS_BOT_ID    = '';  // e.g. 'a1b2c3d4-...'
const BOTPRESS_CLIENT_ID = '';  // e.g. 'e5f6g7h8-...'

const BP_CONFIGURED = BOTPRESS_BOT_ID !== '' && BOTPRESS_CLIENT_ID !== '';

// ── Botpress Mode ─────────────────────────────────────────────────────────────
// When configured: load Botpress SDK, hide their default button,
// wire our mascot toggle to open/close the Botpress window.

if (BP_CONFIGURED) {
  // Load the Botpress webchat v2 inject script
  const script = document.createElement('script');
  script.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js';
  script.onload = () => {
    window.botpress.init({
      botId: BOTPRESS_BOT_ID,
      clientId: BOTPRESS_CLIENT_ID,
      configuration: {
        botName: 'ACC Assistant',
        botAvatar: document.querySelector('.chatbot-avatar')?.src || '',
        color: '#00e5ff',
        backgroundColor: '#0d1117',
        fontFamily: "'Courier New', monospace",
        borderRadius: 12,
        hideWidget: true,           // hide default Botpress button — we use our own
        closeOnEscape: true,
        composerPlaceholder: 'Ask me anything about ACC...',
        showPoweredBy: false,
      }
    });

    // Wire our mascot button to Botpress open/close
    const toggle = document.querySelector('.chatbot-toggle');
    const customWindow = document.querySelector('.chatbot-window');

    if (toggle) {
      toggle.addEventListener('click', () => {
        window.botpress.toggle();
      });
    }

    // Hide our custom fallback window — Botpress handles its own UI
    if (customWindow) customWindow.style.display = 'none';
  };
  document.head.appendChild(script);
}

// ── Fallback / Local Mode ─────────────────────────────────────────────────────
// When Botpress is NOT configured, the custom widget runs with
// keyword-based local responses so the site still has a working chatbot.

if (!BP_CONFIGURED) {
  document.addEventListener('DOMContentLoaded', () => {
    const toggle   = document.querySelector('.chatbot-toggle');
    const win      = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.chatbot-close');
    const sendBtn  = document.querySelector('.chatbot-send');
    const input    = document.querySelector('.chatbot-input');
    const body     = document.querySelector('.chatbot-body');

    if (!toggle) return;

    const GREETING = "Hi! I'm the ACC Assistant. Ask me about our services, experience, downloads, or how to reach the team.";

    toggle.addEventListener('click', () => {
      win.classList.toggle('open');
      if (win.classList.contains('open') && body.children.length === 0) {
        addBotMsg(GREETING);
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', () => win.classList.remove('open'));

    function send() {
      const text = input.value.trim();
      if (!text) return;
      addUserMsg(text);
      input.value = '';
      showTyping();
      setTimeout(() => { removeTyping(); respond(text); }, 700);
    }

    if (sendBtn) sendBtn.addEventListener('click', send);
    if (input)   input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });

    function addBotMsg(text) {
      const m = document.createElement('div');
      m.className = 'chat-msg bot';
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }

    function addUserMsg(text) {
      const m = document.createElement('div');
      m.className = 'chat-msg user';
      m.textContent = text;
      body.appendChild(m);
      body.scrollTop = body.scrollHeight;
    }

    function showTyping() {
      const t = document.createElement('div');
      t.className = 'chat-msg bot';
      t.id = 'typing-indicator';
      t.innerHTML = '<span style="letter-spacing:2px;color:var(--text2);">···</span>';
      body.appendChild(t);
      body.scrollTop = body.scrollHeight;
    }

    function removeTyping() {
      const t = document.getElementById('typing-indicator');
      if (t) t.remove();
    }

    const responses = [
      { pattern: /service|offer|what do you|what can/i,
        reply: "ACC offers Network Engineering, Managed IT, Cybersecurity, Cloud Services, Government Consulting, and Professional Services. Visit /services/ for details." },
      { pattern: /network|cisco|juniper|routing|switching|vlan/i,
        reply: "We design multi-site enterprise networks using Cisco (9300/8300) and Juniper SRX. Ask us about air-gapped network architecture, BGP, OSPF, or WAN design." },
      { pattern: /xcpng|xcp|kvm|virtual|hypervisor|vmware/i,
        reply: "We specialize in XCP-ng and KVM virtualization — including VMware-to-XCP-ng migrations. Check our Knowledge Base for guides." },
      { pattern: /freeipa|ldap|identity|kerberos|cert/i,
        reply: "FreeIPA is our go-to identity platform — LDAP, DNS, Kerberos, and PKI all in one. We handle complex replication and LDAP integration issues regularly." },
      { pattern: /ansible|automat|devops|gitlab|ci\/cd/i,
        reply: "We're Ansible-first. Every deployment we do is automated, git-tracked, and reproducible. Ask us about Ansible roles, GitLab CI/CD pipelines, or infrastructure-as-code." },
      { pattern: /security|cyber|siem|wazuh|graylog|icd|fisma|nist/i,
        reply: "We implement ICD 503, FISMA, and NIST 800-53 compliance with Wazuh SIEM and Graylog. Security is built into every design from day one." },
      { pattern: /air.gap|offline|air gap|classified/i,
        reply: "Air-gapped infrastructure is one of our core specialties. We design fully offline-capable environments including offline repo mirrors, private Docker registries, and local PKI." },
      { pattern: /government|gov|federal|program|dod|intelligence/i,
        reply: "Mike is currently Lead Systems Engineer on an active government program under ICD 503. We bring real government IT experience to every federal engagement." },
      { pattern: /price|cost|rate|quote|how much/i,
        reply: "Pricing depends on project scope. Contact us at /contact/ for a free consultation — we'll give you a straight answer." },
      { pattern: /contact|email|phone|reach|talk/i,
        reply: "Reach us at contact@andersoncomputerconsulting.com or through the contact form at /contact/. We respond within one business day." },
      { pattern: /download|tool|template|script|whitepaper/i,
        reply: "Our Downloads section at /downloads/ has tools, templates, scripts, and whitepapers — all free." },
      { pattern: /knowledge|kb|guide|how to|tutorial/i,
        reply: "The Knowledge Base at /knowledge-base/ has production-tested guides on networking, virtualization, FreeIPA, security, and automation." },
      { pattern: /code|snippet|playbook|script|ansible|python|bash/i,
        reply: "Browse production-ready code at /code-share/ — Ansible playbooks, Python tools, Bash scripts, Cisco IOS configs, and JunOS templates." },
      { pattern: /about|who are|experience|background|mike/i,
        reply: "Mike Anderson is a retired U.S. Navy Chief Information Systems Technician with 30+ years of enterprise IT experience. Currently Lead Systems Engineer on a government program." },
    ];

    function respond(text) {
      for (const r of responses) {
        if (r.pattern.test(text)) { addBotMsg(r.reply); return; }
      }
      addBotMsg("Good question — for a detailed answer, reach out at /contact/ or browse the Knowledge Base at /knowledge-base/. We're happy to help.");
    }
  });
}
