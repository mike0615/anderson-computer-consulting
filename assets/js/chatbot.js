// Anderson Computer Consulting — Chatbot Widget
// Backend: Botpress Cloud (free tier)
// To activate: replace BOTPRESS_EMBED_URL with your Botpress webchat URL
// Sign up at: https://botpress.com → Create bot → Share → Embed

const BOTPRESS_EMBED_URL = null; // Replace with your Botpress webchat URL

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.chatbot-toggle');
  const window_ = document.querySelector('.chatbot-window');
  const closeBtn = document.querySelector('.chatbot-close');
  const sendBtn = document.querySelector('.chatbot-send');
  const input = document.querySelector('.chatbot-input');
  const body = document.querySelector('.chatbot-body');

  if (!toggle) return;

  // Toggle open/close
  toggle.addEventListener('click', () => {
    window_.classList.toggle('open');
    if (window_.classList.contains('open') && body.children.length === 0) {
      addBotMsg("Hi there! I'm the ACC assistant. How can I help you today? I can answer questions about our services, certifications, or connect you with the team.");
    }
    // If Botpress is configured, load it instead
    if (BOTPRESS_EMBED_URL && window_.classList.contains('open')) {
      loadBotpress();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => window_.classList.remove('open'));
  }

  // Send message
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addUserMsg(text);
    input.value = '';
    // Simple local responses — replace with API call once Botpress is set up
    setTimeout(() => handleResponse(text), 600);
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  function addBotMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot';
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function addUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user';
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  // Simple keyword-based local fallback responses
  function handleResponse(text) {
    const t = text.toLowerCase();
    if (t.match(/service|offer|do you/)) {
      addBotMsg("We offer Network Engineering, Managed IT, Cybersecurity, Cloud Services, Government Consulting, and Professional Services. Visit /services/ to learn more.");
    } else if (t.match(/contact|phone|email|reach/)) {
      addBotMsg("You can reach us through our contact page at /contact/ or email contact@andersoncomputerconsulting.com.");
    } else if (t.match(/certif|qualified|experience/)) {
      addBotMsg("Mike Anderson has 30+ years of IT experience including U.S. Navy service. We operate under ICD 503 and NIST frameworks. See /about/certifications/ for details.");
    } else if (t.match(/price|cost|quote/)) {
      addBotMsg("Pricing varies by project scope. Contact us at /contact/ for a free consultation and quote.");
    } else if (t.match(/download|tool|resource/)) {
      addBotMsg("Check out our Downloads section at /downloads/ for tools, templates, and whitepapers.");
    } else if (t.match(/knowledge|kb|how to|guide/)) {
      addBotMsg("Our Knowledge Base at /knowledge-base/ has guides on networking, virtualization, identity management, and more.");
    } else {
      addBotMsg("Thanks for your message! For detailed assistance, please visit our contact page at /contact/ or browse our Knowledge Base. A team member will get back to you shortly.");
    }
  }

  // Load Botpress if configured
  function loadBotpress() {
    if (document.querySelector('#botpress-webchat')) return;
    const iframe = document.createElement('iframe');
    iframe.id = 'botpress-webchat';
    iframe.src = BOTPRESS_EMBED_URL;
    iframe.style.cssText = 'width:100%;height:100%;border:none;flex:1;';
    const chatBody = document.querySelector('.chatbot-body');
    const chatInput = document.querySelector('.chatbot-input-area');
    if (chatBody && chatInput) {
      chatBody.replaceWith(iframe);
      chatInput.style.display = 'none';
    }
  }
});
