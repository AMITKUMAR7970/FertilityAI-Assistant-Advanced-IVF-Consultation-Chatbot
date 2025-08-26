// Application Data
const appData = {
  botPersonality: {
    name: "FertilityAI Assistant",
    role: "IVF Consultation Specialist",
    avatar: "🤖",
    description: "Your compassionate AI guide through fertility treatment options"
  },
  welcomeMessage: "Hello! I'm FertilityAI Assistant, your specialized IVF consultation companion. I'm here to provide personalized guidance, answer your questions, and support you throughout your fertility journey. How can I help you today?",
  quickActions: [
    {id: "info", label: "IVF Information", icon: "📚"},
    {id: "cost", label: "Cost Calculator", icon: "💰"},
    {id: "success", label: "Success Rates", icon: "📊"},
    {id: "timeline", label: "Treatment Timeline", icon: "📅"},
    {id: "clinics", label: "Find Clinics", icon: "🏥"},
    {id: "support", label: "Emotional Support", icon: "💙"}
  ],
  languages: [
    {code: "en", name: "English", flag: "🇺🇸"},
    {code: "es", name: "Español", flag: "🇪🇸"},
    {code: "fr", name: "Français", flag: "🇫🇷"},
    {code: "de", name: "Deutsch", flag: "🇩🇪"},
    {code: "it", name: "Italiano", flag: "🇮🇹"},
    {code: "pt", name: "Português", flag: "🇵🇹"}
  ],
  treatmentSteps: [
    {step: 1, title: "Initial Consultation", duration: "1-2 weeks", completed: false},
    {step: 2, title: "Testing & Evaluation", duration: "2-4 weeks", completed: false},
    {step: 3, title: "Treatment Planning", duration: "1 week", completed: false},
    {step: 4, title: "Medication Protocol", duration: "2-3 weeks", completed: false},
    {step: 5, title: "Egg Retrieval", duration: "1 day", completed: false},
    {step: 6, title: "Embryo Transfer", duration: "3-5 days", completed: false},
    {step: 7, title: "Pregnancy Test", duration: "2 weeks", completed: false}
  ],
  sampleResponses: {
    greeting: "Welcome! I'm here to help you navigate your fertility journey with personalized, evidence-based guidance.",
    cost: "IVF costs typically range from $12,000-$15,000 per cycle, plus medications ($3,000-$5,000). Let me help you calculate your personalized estimate using our cost calculator tool.",
    success: "Success rates vary by age and clinic. For women under 35, success rates are typically 65-70% per fresh cycle. Would you like a personalized assessment?",
    timeline: "A typical IVF cycle takes 6-8 weeks from start to pregnancy test. Let me show you the detailed timeline using our timeline tool.",
    support: "I understand this journey can be emotionally challenging. Remember, you're not alone, and there are many support resources available.",
    info: "IVF (In Vitro Fertilization) is a fertility treatment where eggs are retrieved from ovaries and fertilized with sperm in a laboratory. The resulting embryos are then transferred to the uterus. This process typically involves ovarian stimulation, egg retrieval, fertilization, embryo culture, and embryo transfer.",
    clinics: "I can help you find reputable fertility clinics in your area. Would you like me to search based on your location and specific needs?"
  },
  costFactors: [
    {factor: "Basic IVF Cycle", range: [12000, 15000]},
    {factor: "Medications", range: [3000, 5000]},
    {factor: "ICSI (if needed)", range: [1500, 2500]},
    {factor: "PGT Testing", range: [3000, 6000]},
    {factor: "Frozen Transfer", range: [3000, 5000]}
  ]
};

// Application State
let currentLanguage = 'en';
let isVoiceRecording = false;
let chatHistory = [];
let currentTheme = 'light';
let settings = {
  fontSize: 'medium',
  showTimestamps: true,
  soundNotifications: false
};

// DOM Elements
const elements = {};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  // Initialize DOM elements after the page loads
  elements.chatMessages = document.getElementById('chatMessages');
  elements.chatInput = document.getElementById('chatInput');
  elements.sendBtn = document.getElementById('sendBtn');
  elements.typingIndicator = document.getElementById('typingIndicator');
  elements.voiceRecordBtn = document.getElementById('voiceRecordBtn');
  elements.themeToggle = document.getElementById('themeToggle');
  elements.quickActions = document.getElementById('quickActions');
  elements.progressTracker = document.getElementById('progressTracker');
  elements.fileInput = document.getElementById('fileInput');
  
  initializeApp();
  setupEventListeners();
  renderQuickActions();
  renderProgressTracker();
  renderLanguageOptions();
  loadSettings();
});

function initializeApp() {
  // Set initial theme
  detectInitialTheme();
  
  // Add welcome message to chat history
  chatHistory.push({
    type: 'bot',
    message: appData.welcomeMessage,
    timestamp: getCurrentTime()
  });
}

function setupEventListeners() {
  // Chat input and send
  if (elements.chatInput) {
    elements.chatInput.addEventListener('keypress', handleChatInputKeypress);
  }
  if (elements.sendBtn) {
    elements.sendBtn.addEventListener('click', sendMessage);
  }
  
  // Voice recording
  if (elements.voiceRecordBtn) {
    elements.voiceRecordBtn.addEventListener('click', toggleVoiceRecording);
  }
  
  const voiceBtn = document.getElementById('voiceBtn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', toggleVoiceRecording);
  }
  
  // Theme toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }
  
  // File upload
  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn && elements.fileInput) {
    uploadBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileUpload);
  }
  
  // Feature buttons
  const languageBtn = document.getElementById('languageBtn');
  if (languageBtn) {
    languageBtn.addEventListener('click', () => openModal('languageModal'));
  }
  
  const calculatorBtn = document.getElementById('calculatorBtn');
  if (calculatorBtn) {
    calculatorBtn.addEventListener('click', () => openModal('calculatorModal'));
  }
  
  const timelineBtn = document.getElementById('timelineBtn');
  if (timelineBtn) {
    timelineBtn.addEventListener('click', () => openModal('timelineModal'));
  }
  
  const appointmentBtn = document.getElementById('appointmentBtn');
  if (appointmentBtn) {
    appointmentBtn.addEventListener('click', () => openModal('appointmentModal'));
  }
  
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => openModal('settingsModal'));
  }
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Modal backdrop clicks
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Calculator controls
  setupCalculatorControls();
  
  // Settings controls
  setupSettingsControls();
  
  // Appointment form
  setupAppointmentForm();
  
  // Timeline rendering
  renderTimeline();
}

function handleChatInputKeypress(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function sendMessage() {
  if (!elements.chatInput) return;
  
  const message = elements.chatInput.value.trim();
  if (!message) return;
  
  // Add user message
  addMessage('user', message);
  elements.chatInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Generate bot response with delay
  setTimeout(() => {
    const response = generateBotResponse(message);
    hideTypingIndicator();
    addMessage('bot', response);
  }, 1000 + Math.random() * 1000);
}

function addMessage(type, message) {
  const timestamp = getCurrentTime();
  const messageData = { type, message, timestamp };
  chatHistory.push(messageData);
  
  const messageElement = createMessageElement(messageData);
  if (elements.chatMessages) {
    elements.chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
  }
}

function createMessageElement(messageData) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${messageData.type}-message`;
  
  const avatar = messageData.type === 'bot' ? '🤖' : '👤';
  
  messageDiv.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <div class="message-text">${messageData.message}</div>
      ${settings.showTimestamps ? `<div class="message-time">${messageData.timestamp}</div>` : ''}
    </div>
  `;
  
  return messageDiv;
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Context-aware responses based on user input
  if (message.includes('what is ivf') || message.includes('ivf') || (message.includes('what') && message.includes('ivf'))) {
    return appData.sampleResponses.info;
  } else if (message.includes('cost') || message.includes('price') || message.includes('expensive') || message.includes('money')) {
    return appData.sampleResponses.cost;
  } else if (message.includes('success') || message.includes('rate') || message.includes('chance') || message.includes('odds')) {
    return appData.sampleResponses.success;
  } else if (message.includes('timeline') || message.includes('how long') || message.includes('duration') || message.includes('time')) {
    return appData.sampleResponses.timeline;
  } else if (message.includes('support') || message.includes('help') || message.includes('emotional') || message.includes('stress')) {
    return appData.sampleResponses.support;
  } else if (message.includes('clinic') || message.includes('doctor') || message.includes('find') || message.includes('recommend')) {
    return appData.sampleResponses.clinics;
  } else if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('greeting')) {
    return appData.sampleResponses.greeting;
  } else {
    // Default empathetic responses
    const responses = [
      "I understand your concern. Could you provide more specific details so I can give you the most accurate guidance? I'm here to help with all aspects of your fertility journey.",
      "That's a great question about fertility treatment. Let me help you understand this better. Would you like me to explain the process step by step?",
      "I'm here to support you through this journey. Could you tell me more about your specific situation? Every fertility journey is unique.",
      "Based on your question, I think it would be helpful to discuss this in more detail. What aspect would you like to focus on first - treatment options, costs, or success rates?",
      "Thank you for sharing that with me. Every fertility journey is unique, and I'm here to provide personalized guidance. What's your main concern right now?",
      "I appreciate you reaching out. Fertility treatment can feel overwhelming, but you don't have to navigate it alone. How can I best support you today?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

function showTypingIndicator() {
  if (elements.typingIndicator) {
    elements.typingIndicator.classList.add('active');
    if (elements.chatMessages) {
      elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }
  }
}

function hideTypingIndicator() {
  if (elements.typingIndicator) {
    elements.typingIndicator.classList.remove('active');
  }
}

function toggleVoiceRecording() {
  isVoiceRecording = !isVoiceRecording;
  
  if (isVoiceRecording && elements.voiceRecordBtn) {
    elements.voiceRecordBtn.classList.add('recording');
    elements.voiceRecordBtn.innerHTML = '<span class="voice-icon">⏹️</span>';
    
    // Simulate voice recording
    setTimeout(() => {
      if (isVoiceRecording) {
        stopVoiceRecording();
        const simulatedText = "I want to know more about IVF treatment options and success rates";
        if (elements.chatInput) {
          elements.chatInput.value = simulatedText;
        }
        
        // Add a message indicating voice input was used
        addMessage('user', `🎤 Voice: ${simulatedText}`);
        if (elements.chatInput) {
          elements.chatInput.value = '';
        }
        
        showTypingIndicator();
        setTimeout(() => {
          hideTypingIndicator();
          addMessage('bot', generateBotResponse(simulatedText));
        }, 1500);
      }
    }, 3000);
  } else {
    stopVoiceRecording();
  }
}

function stopVoiceRecording() {
  isVoiceRecording = false;
  if (elements.voiceRecordBtn) {
    elements.voiceRecordBtn.classList.remove('recording');
    elements.voiceRecordBtn.innerHTML = '<span class="voice-icon">🎤</span>';
  }
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const fileName = file.name;
  const fileSize = (file.size / 1024 / 1024).toFixed(2);
  
  addMessage('user', `📎 Uploaded: ${fileName} (${fileSize}MB)`);
  
  // Simulate file analysis
  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    const analysisResponse = `I've received your document "${fileName}". Based on the medical reports you've shared, I can see several important indicators. Let me analyze this information and provide you with personalized recommendations. Would you like me to explain the key findings and suggest next steps for your treatment plan?`;
    addMessage('bot', analysisResponse);
  }, 2000);
  
  // Reset file input
  e.target.value = '';
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  
  if (elements.themeToggle) {
    const themeIcon = elements.themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
  }
}

function detectInitialTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  currentTheme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  
  if (elements.themeToggle) {
    const themeIcon = elements.themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
  }
}

function renderQuickActions() {
  if (!elements.quickActions) return;
  
  elements.quickActions.innerHTML = '';
  
  appData.quickActions.forEach(action => {
    const actionElement = document.createElement('button');
    actionElement.className = 'quick-action-btn';
    actionElement.innerHTML = `
      <div class="quick-action-icon">${action.icon}</div>
      <div class="quick-action-label">${action.label}</div>
    `;
    
    actionElement.addEventListener('click', () => handleQuickAction(action.id));
    elements.quickActions.appendChild(actionElement);
  });
}

function handleQuickAction(actionId) {
  const responses = {
    info: appData.sampleResponses.info,
    cost: function() {
      openModal('calculatorModal');
      return appData.sampleResponses.cost;
    },
    success: appData.sampleResponses.success,
    timeline: function() {
      openModal('timelineModal');
      return appData.sampleResponses.timeline;
    },
    clinics: appData.sampleResponses.clinics,
    support: appData.sampleResponses.support
  };
  
  let response = responses[actionId];
  if (typeof response === 'function') {
    response = response();
  }
  
  response = response || "I'm here to help with that topic. Could you be more specific about what you'd like to know?";
  
  showTypingIndicator();
  setTimeout(() => {
    hideTypingIndicator();
    addMessage('bot', response);
  }, 800);
}

function renderProgressTracker() {
  if (!elements.progressTracker) return;
  
  elements.progressTracker.innerHTML = '';
  
  appData.treatmentSteps.forEach(step => {
    const stepElement = document.createElement('div');
    stepElement.className = `progress-step ${step.completed ? 'completed' : ''}`;
    stepElement.innerHTML = `
      <div class="progress-step-icon">${step.completed ? '✓' : step.step}</div>
      <div class="progress-step-info">
        <div class="progress-step-title">${step.title}</div>
        <div class="progress-step-duration">${step.duration}</div>
      </div>
    `;
    
    stepElement.addEventListener('click', () => {
      step.completed = !step.completed;
      renderProgressTracker();
      
      const message = step.completed 
        ? `Great! I've marked "${step.title}" as completed. What would you like to know about the next step in your treatment journey?`
        : `I've unmarked "${step.title}". Let me know if you need any guidance with this step or have specific questions.`;
      
      addMessage('bot', message);
    });
    
    elements.progressTracker.appendChild(stepElement);
  });
}

function renderLanguageOptions() {
  const languageGrid = document.getElementById('languageGrid');
  if (!languageGrid) return;
  
  languageGrid.innerHTML = '';
  
  appData.languages.forEach(language => {
    const languageElement = document.createElement('button');
    languageElement.className = `language-option ${language.code === currentLanguage ? 'selected' : ''}`;
    languageElement.innerHTML = `
      <span class="language-flag">${language.flag}</span>
      <span class="language-name">${language.name}</span>
    `;
    
    languageElement.addEventListener('click', () => {
      currentLanguage = language.code;
      updateLanguageSelection();
      closeModal('languageModal');
      
      // Simulate language change
      addMessage('bot', `Language changed to ${language.name}. I can now assist you in ${language.name}. How can I help you today?`);
    });
    
    languageGrid.appendChild(languageElement);
  });
}

function updateLanguageSelection() {
  document.querySelectorAll('.language-option').forEach((option, index) => {
    option.classList.toggle('selected', appData.languages[index].code === currentLanguage);
  });
}

function setupCalculatorControls() {
  const cyclesRange = document.getElementById('cyclesRange');
  const cyclesValue = document.getElementById('cyclesValue');
  const checkboxes = ['icsiCheck', 'pgtCheck', 'frozenCheck'];
  
  if (cyclesRange && cyclesValue) {
    cyclesRange.addEventListener('input', (e) => {
      cyclesValue.textContent = e.target.value;
      updateCostCalculation();
    });
  }
  
  checkboxes.forEach(id => {
    const checkbox = document.getElementById(id);
    if (checkbox) {
      checkbox.addEventListener('change', updateCostCalculation);
    }
  });
  
  updateCostCalculation();
}

function updateCostCalculation() {
  const cyclesRange = document.getElementById('cyclesRange');
  const icsiCheck = document.getElementById('icsiCheck');
  const pgtCheck = document.getElementById('pgtCheck');
  const frozenCheck = document.getElementById('frozenCheck');
  
  if (!cyclesRange) return;
  
  const cycles = parseInt(cyclesRange.value);
  const icsi = icsiCheck ? icsiCheck.checked : false;
  const pgt = pgtCheck ? pgtCheck.checked : false;
  const frozen = frozenCheck ? frozenCheck.checked : false;
  
  let minTotal = (12000 + 3000) * cycles; // Basic + medication
  let maxTotal = (15000 + 5000) * cycles;
  
  const icsiCost = document.getElementById('icsiCost');
  const pgtCost = document.getElementById('pgtCost');
  const frozenCost = document.getElementById('frozenCost');
  const basicCost = document.getElementById('basicCost');
  const medicationCost = document.getElementById('medicationCost');
  const totalCost = document.getElementById('totalCost');
  
  if (icsi) {
    minTotal += 1500;
    maxTotal += 2500;
    if (icsiCost) icsiCost.style.display = 'flex';
  } else {
    if (icsiCost) icsiCost.style.display = 'none';
  }
  
  if (pgt) {
    minTotal += 3000;
    maxTotal += 6000;
    if (pgtCost) pgtCost.style.display = 'flex';
  } else {
    if (pgtCost) pgtCost.style.display = 'none';
  }
  
  if (frozen) {
    minTotal += 3000;
    maxTotal += 5000;
    if (frozenCost) frozenCost.style.display = 'flex';
  } else {
    if (frozenCost) frozenCost.style.display = 'none';
  }
  
  // Update display elements
  if (basicCost) {
    basicCost.textContent = `$${(12000 * cycles).toLocaleString()} - $${(15000 * cycles).toLocaleString()}`;
  }
  if (medicationCost) {
    medicationCost.textContent = `$${(3000 * cycles).toLocaleString()} - $${(5000 * cycles).toLocaleString()}`;
  }
  if (totalCost) {
    totalCost.textContent = `$${minTotal.toLocaleString()} - $${maxTotal.toLocaleString()}`;
  }
}

function renderTimeline() {
  const timelineContainer = document.getElementById('timelineContainer');
  if (!timelineContainer) return;
  
  timelineContainer.innerHTML = '';
  
  appData.treatmentSteps.forEach(step => {
    const stepElement = document.createElement('div');
    stepElement.className = `timeline-step ${step.completed ? 'completed' : ''}`;
    stepElement.innerHTML = `
      <div class="timeline-step-number">${step.completed ? '✓' : step.step}</div>
      <div class="timeline-step-content">
        <div class="timeline-step-title">${step.title}</div>
        <div class="timeline-step-duration">Duration: ${step.duration}</div>
      </div>
    `;
    
    timelineContainer.appendChild(stepElement);
  });
}

function setupSettingsControls() {
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const showTimestamps = document.getElementById('showTimestamps');
  const soundNotifications = document.getElementById('soundNotifications');
  const exportBtn = document.getElementById('exportBtn');
  const clearBtn = document.getElementById('clearBtn');
  
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (e) => {
      settings.fontSize = e.target.value;
      document.body.className = document.body.className.replace(/font-\w+/, '') + ` font-${e.target.value}`;
      saveSettings();
    });
  }
  
  if (showTimestamps) {
    showTimestamps.addEventListener('change', (e) => {
      settings.showTimestamps = e.target.checked;
      saveSettings();
      refreshMessages();
    });
  }
  
  if (soundNotifications) {
    soundNotifications.addEventListener('change', (e) => {
      settings.soundNotifications = e.target.checked;
      saveSettings();
    });
  }
  
  if (exportBtn) {
    exportBtn.addEventListener('click', exportConversation);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearChatHistory);
  }
}

function setupAppointmentForm() {
  const appointmentForm = document.querySelector('.appointment-form');
  if (!appointmentForm) return;
  
  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const appointmentData = {
      name: document.getElementById('patientName')?.value || '',
      email: document.getElementById('patientEmail')?.value || '',
      phone: document.getElementById('patientPhone')?.value || '',
      date: document.getElementById('appointmentDate')?.value || '',
      time: document.getElementById('appointmentTime')?.value || '',
      type: document.getElementById('consultationType')?.value || ''
    };
    
    closeModal('appointmentModal');
    
    addMessage('bot', `Perfect! I've scheduled your ${appointmentData.type} consultation for ${appointmentData.date} at ${appointmentData.time}. You'll receive a confirmation email at ${appointmentData.email} shortly. Is there anything specific you'd like to discuss during your appointment?`);
    
    // Reset form
    appointmentForm.reset();
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    
    // Focus management
    const firstFocusable = modal.querySelector('input, button, select, textarea');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function refreshMessages() {
  if (!elements.chatMessages) return;
  
  elements.chatMessages.innerHTML = '';
  chatHistory.forEach(messageData => {
    const messageElement = createMessageElement(messageData);
    elements.chatMessages.appendChild(messageElement);
  });
  elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function exportConversation() {
  const conversationText = chatHistory.map(msg => 
    `[${msg.timestamp}] ${msg.type.toUpperCase()}: ${msg.message}`
  ).join('\n\n');
  
  const blob = new Blob([conversationText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fertility-consultation-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  closeModal('settingsModal');
  addMessage('bot', 'Your conversation has been exported successfully. You can refer to it anytime during your fertility journey.');
}

function clearChatHistory() {
  if (confirm('Are you sure you want to clear your chat history? This action cannot be undone.')) {
    chatHistory = [];
    if (elements.chatMessages) {
      elements.chatMessages.innerHTML = '';
    }
    closeModal('settingsModal');
    
    // Re-add welcome message
    setTimeout(() => {
      addMessage('bot', appData.welcomeMessage);
    }, 500);
  }
}

function saveSettings() {
  // In a real app, this would save to a backend or localStorage
  console.log('Settings saved:', settings);
}

function loadSettings() {
  // Apply saved settings
  document.body.classList.add(`font-${settings.fontSize}`);
  
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const showTimestamps = document.getElementById('showTimestamps');
  const soundNotifications = document.getElementById('soundNotifications');
  
  if (fontSizeSelect) fontSizeSelect.value = settings.fontSize;
  if (showTimestamps) showTimestamps.checked = settings.showTimestamps;
  if (soundNotifications) soundNotifications.checked = settings.soundNotifications;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Escape to close modals
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
      closeModal(modal.id);
    });
  }
  
  // Ctrl/Cmd + K to focus chat input
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    if (elements.chatInput) {
      elements.chatInput.focus();
    }
  }
});

// Initialize demo interactions
setTimeout(() => {
  // Simulate some initial progress
  if (appData.treatmentSteps[0]) {
    appData.treatmentSteps[0].completed = true;
    renderProgressTracker();
  }
}, 2000);