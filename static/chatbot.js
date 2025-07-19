class CafetinChatbot {
  constructor() {
    this.isOpen = false
    this.messages = []
    this.responses = this.initializeResponses()
    this.init()
  }

  init() {
    this.createChatbotHTML()
    this.addEventListeners()
    this.addWelcomeMessage()
  }

  initializeResponses() {
    return {
      // Saludos
      saludos: {
        keywords: ["hola", "buenos días", "buenas tardes", "buenas noches", "hey", "hi", "hello"],
        responses: [
          "¡Hola! 👋 Soy el asistente virtual de Cafetín Antojitos. ¿En qué puedo ayudarte hoy?",
          "¡Bienvenido! ☕ Estoy aquí para ayudarte con cualquier pregunta sobre nuestros productos y servicios.",
          "¡Hola! 😊 ¿Te gustaría conocer nuestras promociones especiales o tienes alguna pregunta?",
        ],
      },

      // Horarios
      horarios: {
        keywords: ["horario", "hora", "abierto", "cerrado", "cuando abren", "hasta que hora", "horarios"],
        responses: ["🕐 Nuestros horarios son:\n• Lunes a Domingo: 6:00 AM - 10:00 PM\n¡Te esperamos todos los días!"],
      },

      // Ubicación
      ubicacion: {
        keywords: ["donde", "ubicación", "dirección", "como llegar", "ubicado", "direccion"],
        responses: [
          "📍 Nos encontramos en:\nAv. Principal 123, Ciudad\n\n🚗 Contamos con estacionamiento gratuito\n🚌 Cerca del transporte público",
        ],
      },

      // Menú y productos
      menu: {
        keywords: ["menú", "productos", "que venden", "que tienen", "carta", "comida", "bebidas", "menu"],
        responses: [
          "☕ Nuestro menú incluye:\n\n🔥 Bebidas Calientes:\n• Café Americano ($2.50)\n• Cappuccino ($3.50)\n• Latte ($4.00)\n• Mocha ($4.25)\n\n🧊 Bebidas Frías:\n• Frappés ($4.50)\n• Smoothies ($3.75)\n\n🥐 Panadería:\n• Croissants ($2.00-$2.50)\n• Muffins ($2.75)\n\n🍽️ Comida:\n• Sandwiches ($5.50-$6.50)\n• Ensaladas ($6.75-$7.00)\n\n¿Te interesa algo en particular?",
        ],
      },

      // Precios
      precios: {
        keywords: ["precio", "costo", "cuanto cuesta", "barato", "caro", "ofertas", "precios"],
        responses: [
          "💰 Nuestros precios son muy competitivos:\n\n☕ Bebidas calientes: $2.50 - $4.25\n🧊 Bebidas frías: $3.75 - $4.50\n🥐 Panadería: $2.00 - $2.75\n🍽️ Comida: $5.50 - $7.50\n\n¡Además tenemos promociones especiales con IA! 🤖",
        ],
      },

      // Promociones IA
      promociones: {
        keywords: ["promoción", "descuento", "oferta", "ia", "inteligencia artificial", "recomendación", "promociones"],
        responses: [
          "🤖 ¡Nuestro sistema de IA es increíble!\n\n✨ Características:\n• Recomendaciones personalizadas\n• Promociones basadas en tus gustos\n• Descuentos especiales hasta 20% OFF\n• Análisis de tus preferencias\n\n¡Inicia sesión para ver tus promociones personalizadas!",
        ],
      },

      // Delivery
      delivery: {
        keywords: ["delivery", "entrega", "domicilio", "envío", "llevar", "envio"],
        responses: [
          "🚚 Información de entrega:\n\n📱 Actualmente trabajamos con pedidos para recoger en tienda\n⏰ Tiempo de preparación: 10-15 minutos\n💳 Aceptamos efectivo y tarjetas\n\n¡Pronto tendremos servicio de delivery!",
        ],
      },

      // Contacto
      contacto: {
        keywords: ["teléfono", "contacto", "llamar", "email", "correo", "telefono"],
        responses: [
          "📞 Información de contacto:\n\n📱 Teléfono: +1 (555) 123-4567\n📧 Email: info@cafetin-buensabor.com\n🌐 Redes sociales: @CafetinBuenSabor\n\n¡También puedes visitarnos directamente!",
        ],
      },

      // WiFi
      wifi: {
        keywords: ["wifi", "internet", "contraseña", "password", "conexión", "conexion"],
        responses: [
          "📶 ¡Sí, tenemos WiFi gratuito!\n\n🔐 Red: CafetinWiFi\n🔑 Contraseña: BuenSabor2024\n\n¡Perfecto para trabajar o estudiar mientras disfrutas tu café! ☕💻",
        ],
      },

      // Reservas
      reservas: {
        keywords: ["reserva", "mesa", "apartar", "reservar", "evento"],
        responses: [
          "🪑 Sobre reservas:\n\n• Para grupos pequeños (1-4 personas): No necesitas reserva\n• Para grupos grandes (5+ personas): Te recomendamos llamar\n• Eventos especiales: Contáctanos con anticipación\n\n📞 Llámanos al +1 (555) 123-4567",
        ],
      },

      // Métodos de pago
      pago: {
        keywords: ["pago", "tarjeta", "efectivo", "visa", "mastercard", "como pagar"],
        responses: [
          "💳 Métodos de pago aceptados:\n\n💵 Efectivo\n💳 Tarjetas de crédito/débito\n📱 Pagos móviles\n🏦 Transferencias\n\n¡Elige el que más te convenga!",
        ],
      },

      // Ingredientes/Alergias
      ingredientes: {
        keywords: ["ingredientes", "alergia", "vegano", "vegetariano", "sin gluten", "lactosa"],
        responses: [
          "🌱 Opciones especiales:\n\n✅ Tenemos opciones veganas\n✅ Productos sin gluten disponibles\n✅ Leches vegetales (soya, almendra, avena)\n✅ Información de alérgenos disponible\n\n¡Pregunta a nuestro personal por opciones específicas!",
        ],
      },

      // Trabajo/Estudio
      trabajo: {
        keywords: ["trabajar", "estudiar", "laptop", "enchufes", "silencioso", "ambiente"],
        responses: [
          "💻 ¡Perfecto para trabajar y estudiar!\n\n✅ WiFi gratuito y rápido\n✅ Enchufes en todas las mesas\n✅ Ambiente tranquilo\n✅ Música suave\n✅ Mesas amplias\n\n☕ ¡El lugar ideal para ser productivo!",
        ],
      },

      // Café específico
      cafe: {
        keywords: ["café", "espresso", "americano", "cappuccino", "latte", "mocha"],
        responses: [
          "☕ ¡Somos especialistas en café!\n\n🌟 Nuestros cafés más populares:\n• Americano: Clásico y fuerte ($2.50)\n• Cappuccino: Con espuma perfecta ($3.50)\n• Latte: Cremoso con arte latte ($4.00)\n• Mocha: Con chocolate belga ($4.25)\n\n¡Todos preparados con granos premium!",
        ],
      },

      // Despedidas
      despedidas: {
        keywords: ["gracias", "bye", "adiós", "hasta luego", "chao", "adios"],
        responses: [
          "¡De nada! 😊 ¡Esperamos verte pronto en Cafetín El Buen Sabor! ☕",
          "¡Gracias por contactarnos! 👋 ¡Que tengas un excelente día! ☀️",
          "¡Hasta pronto! 🌟 ¡No olvides probar nuestras promociones IA! 🤖",
        ],
      },

      // Default
      default: {
        keywords: [],
        responses: [
          "🤔 No estoy seguro de entender tu pregunta. ¿Podrías ser más específico?\n\n💡 Puedo ayudarte con:\n• Horarios y ubicación\n• Menú y precios\n• Promociones IA\n• Información de contacto\n• WiFi y ambiente\n• ¡Y mucho más!",
          "🤖 Lo siento, no tengo información sobre eso. ¿Te gustaría que te ayude con algo más?\n\n📞 Para consultas específicas, puedes llamarnos al +1 (555) 123-4567",
        ],
      },
    }
  }

  createChatbotHTML() {
    const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <div id="chatbot-button" class="chatbot-button">
                    <i class="fas fa-comments"></i>
                    <span class="chatbot-notification">1</span>
                </div>
                
                <div id="chatbot-window" class="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="chatbot-title">
                                <h6>Asistente Virtual</h6>
                                <small>Cafetín El Buen Sabor</small>
                            </div>
                        </div>
                        <button id="chatbot-close" class="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div id="chatbot-messages" class="chatbot-messages">
                        <!-- Los mensajes se agregan aquí -->
                    </div>
                    
                    <div class="chatbot-quick-actions">
                        <button class="quick-action-btn" data-message="Horarios">
                            <i class="fas fa-clock"></i> Horarios
                        </button>
                        <button class="quick-action-btn" data-message="Menú">
                            <i class="fas fa-utensils"></i> Menú
                        </button>
                        <button class="quick-action-btn" data-message="Promociones IA">
                            <i class="fas fa-robot"></i> Promociones
                        </button>
                        <button class="quick-action-btn" data-message="Ubicación">
                            <i class="fas fa-map-marker-alt"></i> Ubicación
                        </button>
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Escribe tu pregunta..." maxlength="200">
                        <button id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `

    document.body.insertAdjacentHTML("beforeend", chatbotHTML)
    this.addChatbotStyles()
  }

  addChatbotStyles() {
    const style = document.createElement("style")
    style.textContent = `
            .chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .chatbot-button {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg,rgb(139, 86, 0) 0%,rgb(165, 109, 39) 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                position: relative;
                animation: pulse 2s infinite;
            }

            .chatbot-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
            }

            .chatbot-notification {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff4757;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                animation: bounce 1s infinite;
            }

            .chatbot-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 500px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                display: none;
                flex-direction: column;
                overflow: hidden;
                transform: scale(0.8) translateY(20px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            .chatbot-window.show {
                display: flex;
                transform: scale(1) translateY(0);
                opacity: 1;
            }

            .chatbot-header {
                background: linear-gradient(135deg, rgb(139, 86, 0) 0%, rgb(165, 109, 39) 100%);
                color: white;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .chatbot-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .chatbot-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }

            .chatbot-title h6 {
                margin: 0;
                font-size: 14px;
                font-weight: 600;
            }

            .chatbot-title small {
                opacity: 0.8;
                font-size: 11px;
            }

            .chatbot-close {
                background: none;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.2s;
            }

            .chatbot-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .chatbot-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }

            .chatbot-messages::-webkit-scrollbar {
                width: 4px;
            }

            .chatbot-messages::-webkit-scrollbar-track {
                background: #f1f1f1;
            }

            .chatbot-messages::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 2px;
            }

            .message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
                animation: messageSlide 0.3s ease;
            }

            .message.bot {
                background: #f8f9fa;
                color: #333;
                align-self: flex-start;
                border-bottom-left-radius: 6px;
                border: 1px solid #e9ecef;
            }

            .message.user {
                background: linear-gradient(135deg, rgb(139, 86, 0) 0%, rgb(165, 109, 39) 100%);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 6px;
            }

            .message.typing {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                align-self: flex-start;
                border-bottom-left-radius: 6px;
                padding: 16px;
            }

            .typing-indicator {
                display: flex;
                gap: 4px;
                align-items: center;
            }

            .typing-dot {
                width: 8px;
                height: 8px;
                background: #999;
                border-radius: 50%;
                animation: typingDot 1.4s infinite ease-in-out;
            }

            .typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            .chatbot-quick-actions {
                padding: 15px 20px;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }

            .quick-action-btn {
                background: #f8f9fa;
                border: 1px solid #e9ecef;
                border-radius: 20px;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                color: #666;
            }

            .quick-action-btn:hover {
                background:rgb(165, 109, 39);
                color: white;
                border-color: rgb(165, 109, 39);
            }

            .chatbot-input-container {
                padding: 20px;
                border-top: 1px solid #e9ecef;
                display: flex;
                gap: 10px;
                align-items: center;
            }

            #chatbot-input {
                flex: 1;
                border: 1px solid #e9ecef;
                border-radius: 25px;
                padding: 12px 16px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }

            #chatbot-input:focus {
                border-color: rgb(165, 109, 39);
            }

            #chatbot-send {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, rgb(139, 86, 0) 0%,rgb(165, 109, 39) 100%);
                border: none;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s;
            }

            #chatbot-send:hover {
                transform: scale(1.1);
            }

            #chatbot-send:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-5px); }
                60% { transform: translateY(-3px); }
            }

            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes typingDot {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.4;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .chatbot-window {
                    width: calc(100vw - 40px);
                    height: 70vh;
                    bottom: 80px;
                    right: 20px;
                    left: 20px;
                }
                
                .chatbot-container {
                    right: 20px;
                }
            }
        `

    document.head.appendChild(style)
  }

  addEventListeners() {
    const button = document.getElementById("chatbot-button")
    const closeBtn = document.getElementById("chatbot-close")
    const sendBtn = document.getElementById("chatbot-send")
    const input = document.getElementById("chatbot-input")
    const quickActions = document.querySelectorAll(".quick-action-btn")

    button.addEventListener("click", () => this.toggleChatbot())
    closeBtn.addEventListener("click", () => this.closeChatbot())
    sendBtn.addEventListener("click", () => this.sendMessage())
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage()
    })

    quickActions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const message = btn.dataset.message
        this.sendMessage(message)
      })
    })
  }

  toggleChatbot() {
    const window = document.getElementById("chatbot-window")
    const notification = document.querySelector(".chatbot-notification")

    if (this.isOpen) {
      this.closeChatbot()
    } else {
      window.classList.add("show")
      this.isOpen = true
      if (notification) notification.style.display = "none"
      document.getElementById("chatbot-input").focus()
    }
  }

  closeChatbot() {
    const window = document.getElementById("chatbot-window")
    window.classList.remove("show")
    this.isOpen = false
  }

  addWelcomeMessage() {
    setTimeout(() => {
      this.addMessage(
        "¡Hola! 👋 Soy el asistente virtual de Cafetín El Buen Sabor. ¿En qué puedo ayudarte hoy? ☕",
        "bot",
      )
    }, 1000)
  }

  sendMessage(text = null) {
    const input = document.getElementById("chatbot-input")
    const message = text || input.value.trim()

    if (!message) return

    this.addMessage(message, "user")
    if (!text) input.value = ""

    this.showTypingIndicator()

    setTimeout(
      () => {
        this.hideTypingIndicator()
        const response = this.generateResponse(message)
        this.addMessage(response, "bot")
      },
      1000 + Math.random() * 1000,
    )
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById("chatbot-messages")
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}`
    messageDiv.innerHTML = text.replace(/\n/g, "<br>")

    messagesContainer.appendChild(messageDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    this.messages.push({ text, sender, timestamp: new Date() })
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById("chatbot-messages")
    const typingDiv = document.createElement("div")
    typingDiv.className = "message typing"
    typingDiv.id = "typing-indicator"
    typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `

    messagesContainer.appendChild(typingDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator")
    if (typingIndicator) {
      typingIndicator.remove()
    }
  }

  generateResponse(message) {
    const lowerMessage = message.toLowerCase()

    for (const [category, data] of Object.entries(this.responses)) {
      if (category === "default") continue

      const hasKeyword = data.keywords.some((keyword) => lowerMessage.includes(keyword))

      if (hasKeyword) {
        const responses = data.responses
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }

    const defaultResponses = this.responses.default.responses
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.cafetinChatbot = new CafetinChatbot()
})
