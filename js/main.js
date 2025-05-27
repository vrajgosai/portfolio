// Dark mode from system or localStorage
const stored = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const shouldUseDark = stored === 'dark' || (!stored && prefersDark);
document.documentElement.classList.toggle('dark', shouldUseDark);

// Theme toggle button
document.getElementById('toggle-dark')?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Button glow effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
    btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero h1 fade-up
gsap.from(".hero h1", {
  scrollTrigger: {
    trigger: ".hero h1",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 100,
  duration: 1.2,
  ease: "power4.out"
});

// Subtitle fade-up
gsap.from(".subtitle", {
  scrollTrigger: {
    trigger: ".subtitle",
    start: "top 90%",
    toggleActions: "play none none none"
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out"
});

// Orb motion on scroll
gsap.to(".orb-blue", {
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  },
  x: 100,
  y: -80,
  scale: 1.1,
});
gsap.to(".orb-orange", {
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  },
  x: -80,
  y: 40,
  scale: 1.15,
});

// Scroll reveal on all data-fade sections
document.querySelectorAll("[data-fade]").forEach(el => {
  gsap.fromTo(el,
    { opacity: 0, y: 60 },
    {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }
  );
});


/* ---- orb toggles chat panel ---- */
const orb       = document.getElementById("ambient-orb");
const chatBox   = document.getElementById("vraj-chat");
const chatClose = document.getElementById("chat-close");
const chatInput = document.getElementById("chat-input");
const chatMain  = chatBox?.querySelector("main");

orb?.addEventListener("click", () => {
  chatBox.style.display = "flex";
  chatInput.focus();
});
chatClose?.addEventListener("click", () => {
  chatBox.style.display = "none";
});

/* ---- tiny fake-AI reply demo ---- */
chatInput?.addEventListener("keydown", e => {
  if(e.key === "Enter" && chatInput.value.trim()){
    appendMsg(chatInput.value.trim(), "user");
    setTimeout(()=>appendMsg("I'm only a demo bot for now 🤖", "bot"), 600);
    chatInput.value = "";
  }
});

function appendMsg(text, role){
  const p = document.createElement("p");
  p.className = role;
  p.textContent = text;
  chatMain.appendChild(p);
  chatMain.scrollTop = chatMain.scrollHeight;
}
const burger = document.getElementById('burger');
const menu   = document.querySelector('.menu');

burger?.addEventListener('click', () => {
  menu.classList.toggle('open');
});
/* close the panel when a link is tapped */
document.querySelectorAll('.menu a').forEach(a=>{
  a.addEventListener('click', () => menu.classList.remove('open'));
});



