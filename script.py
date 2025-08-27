# Create advanced user interaction examples and conversation flows
import pandas as pd
import json

# Create comprehensive conversation examples showing advanced interactions
conversation_examples = {
    "basic_consultation": [
        {"role": "user", "message": "Hi, I'm interested in learning about IVF", "timestamp": "2025-08-26 10:00:00"},
        {"role": "bot", "message": "Hello! I'm FertilityAI Assistant, and I'm here to help guide you through IVF options. To provide you with the most relevant information, may I ask a few questions about your situation?", "timestamp": "2025-08-26 10:00:05", "features": ["personalization", "empathy"]},
        {"role": "user", "message": "Sure, what do you need to know?", "timestamp": "2025-08-26 10:00:15"},
        {"role": "bot", "message": "Great! Let me ask about a few key factors:\n\n🎂 What's your age range?\n⏰ How long have you been trying to conceive?\n🔬 Have you had any fertility testing done?\n💊 Are you currently taking any medications?\n\nFeel free to share as much or as little as you're comfortable with.", "timestamp": "2025-08-26 10:00:20", "features": ["structured_input", "privacy_awareness", "emojis"]},
        {"role": "user", "message": "I'm 32, we've been trying for 18 months, and I had some blood tests done recently", "timestamp": "2025-08-26 10:01:00"},
        {"role": "bot", "message": "Thank you for sharing that information. At 32, you're in an excellent age range for IVF success! Women in your age group typically see success rates of 65-70% per fresh cycle at top clinics.\n\nSince you've been trying for 18 months and have had initial testing, IVF could be a great next step. Would you like me to:\n\n📊 Calculate your personalized success probability\n💰 Provide a detailed cost breakdown\n📅 Show you the typical IVF timeline\n🏥 Help you find qualified clinics nearby\n\nWhat would be most helpful right now?", "timestamp": "2025-08-26 10:01:10", "features": ["personalized_statistics", "quick_actions", "guided_next_steps"]}
    ],
    "voice_interaction": [
        {"role": "system", "message": "Voice input detected: 'What are the side effects of IVF medications?'", "timestamp": "2025-08-26 10:05:00", "features": ["voice_recognition"]},
        {"role": "bot", "message": "I heard your question about IVF medication side effects. This is a very common concern, and I'm glad you asked!\n\n🔊 **Voice Response Available** - Would you like me to read this aloud?\n\n**Common IVF Medication Side Effects:**\n\n💉 **Injection Site Reactions:**\n• Mild bruising or swelling\n• Temporary redness\n• Solution: Rotate injection sites, use ice packs\n\n🤰 **Hormonal Effects:**\n• Mild bloating or cramping\n• Mood changes (similar to PMS)\n• Breast tenderness\n• Headaches\n\n⚠️ **When to Contact Your Clinic:**\n• Severe abdominal pain\n• Shortness of breath\n• Rapid weight gain (>5 lbs in 3 days)\n\nWould you like specific information about any particular medications, or do you have other questions about the IVF process?", "timestamp": "2025-08-26 10:05:15", "features": ["voice_output", "structured_medical_info", "safety_warnings", "follow_up_options"]}
    ],
    "document_analysis": [
        {"role": "user", "message": "I'd like to upload my hormone test results for analysis", "timestamp": "2025-08-26 10:10:00"},
        {"role": "bot", "message": "I'd be happy to help you understand your hormone test results! Please use the file upload button 📎 to share your lab report.\n\n**What I can help with:**\n✅ Explain what each hormone level means\n✅ Identify values that may impact fertility\n✅ Suggest questions to ask your doctor\n✅ Recommend next steps based on results\n\n**Privacy & Security:**\n🔒 Your documents are processed securely\n🚫 No data is stored permanently\n👨‍⚕️ This analysis supplements, not replaces, medical advice\n\nPlease upload your report when ready!", "timestamp": "2025-08-26 10:10:05", "features": ["file_upload", "privacy_assurance", "medical_disclaimer"]},
        {"role": "system", "message": "File uploaded: hormone_panel_results.pdf", "timestamp": "2025-08-26 10:10:30", "features": ["file_processing"]},
        {"role": "bot", "message": "Perfect! I've analyzed your hormone panel results. Here's what I found:\n\n📋 **Your Results Summary:**\n\n🟢 **Normal Ranges:**\n• TSH: 2.1 mIU/L (✓ Normal: 0.5-4.5)\n• Prolactin: 18 ng/mL (✓ Normal: 2-25)\n\n🟡 **Needs Attention:**\n• AMH: 1.2 ng/mL (Lower than ideal for your age)\n• FSH: 8.5 mIU/L (Slightly elevated)\n\n**What This Means:**\nYour results suggest diminished ovarian reserve, which is common and treatable. This actually makes IVF a good option as it can help maximize your remaining eggs.\n\n**Recommended Next Steps:**\n1. Discuss these results with a reproductive endocrinologist\n2. Consider additional testing (antral follicle count)\n3. Explore IVF protocols optimized for your hormone profile\n\nWould you like me to help you find specialists who work with similar hormone profiles?", "timestamp": "2025-08-26 10:11:00", "features": ["document_analysis", "medical_interpretation", "personalized_recommendations", "specialist_referral"]}
    ],
    "multilingual_support": [
        {"role": "user", "message": "Can you switch to Spanish? My husband speaks Spanish better", "timestamp": "2025-08-26 10:15:00"},
        {"role": "bot", "message": "¡Por supuesto! Me complace ayudarles en español. 🇪🇸\n\n**Idioma cambiado a Español**\n\nSoy FertilityAI Assistant, su especialista en consultas de FIV. Estoy aquí para brindarles orientación personalizada y apoyo durante su proceso de fertilidad.\n\n¿En qué puedo ayudarles hoy? Pueden preguntarme sobre:\n\n🔬 Información sobre tratamientos de FIV\n💰 Calculadora de costos\n📊 Tasas de éxito personalizadas\n📅 Cronograma de tratamiento\n🏥 Clínicas especializadas\n💙 Apoyo emocional\n\n*Nota: Puedo cambiar entre idiomas en cualquier momento durante nuestra conversación.*", "timestamp": "2025-08-26 10:15:10", "features": ["language_switching", "multilingual_support", "cultural_adaptation"]},
        {"role": "user", "message": "¿Cuáles son las tasas de éxito para mujeres de 35 años?", "timestamp": "2025-08-26 10:15:30"},
        {"role": "bot", "message": "Excelente pregunta sobre las tasas de éxito para mujeres de 35 años.\n\n📊 **Tasas de Éxito de FIV a los 35 años:**\n\n🎯 **Por Ciclo Fresco:**\n• Transferencia de embrión fresco: ~55-60%\n• Embarazo clínico: ~50-55%\n• Nacimiento vivo: ~45-50%\n\n❄️ **Transferencia de Embrión Congelado (FET):**\n• Tasa de éxito: ~55-65%\n• Mejor resultado con embriones probados genéticamente\n\n📈 **Factores que Mejoran las Posibilidades:**\n• Estilo de vida saludable\n• Peso corporal óptimo\n• No fumar\n• Manejo del estrés\n• Clínica con experiencia\n\n**Datos Importantes:**\n- A los 35 años, la calidad de óvulos comienza a declinar gradualmente\n- Las pruebas genéticas preimplantacionales (PGT) pueden mejorar las tasas\n- Cada caso es único - sus resultados pueden variar\n\n¿Les gustaría que calcule una estimación personalizada basada en su situación específica?", "timestamp": "2025-08-26 10:15:45", "features": ["multilingual_medical_content", "detailed_statistics", "personalized_follow_up"]}
    ]
}

# Create user interaction patterns and engagement metrics
user_interaction_patterns = {
    "session_types": [
        {"type": "Information Seeking", "percentage": 45, "avg_duration_minutes": 12, "features_used": ["text_chat", "quick_actions", "educational_content"]},
        {"type": "Cost Planning", "percentage": 25, "avg_duration_minutes": 8, "features_used": ["cost_calculator", "insurance_checker", "financing_options"]},
        {"type": "Clinic Research", "percentage": 15, "avg_duration_minutes": 15, "features_used": ["clinic_finder", "reviews", "appointment_booking"]},
        {"type": "Emotional Support", "percentage": 10, "avg_duration_minutes": 20, "features_used": ["support_chat", "resources", "community_links"]},
        {"type": "Document Analysis", "percentage": 5, "avg_duration_minutes": 6, "features_used": ["file_upload", "report_analysis", "recommendations"]}
    ],
    "feature_usage": [
        {"feature": "Text Chat", "usage_rate": 100, "satisfaction": 4.7},
        {"feature": "Voice Input", "usage_rate": 35, "satisfaction": 4.4},
        {"feature": "File Upload", "usage_rate": 20, "satisfaction": 4.8},
        {"feature": "Cost Calculator", "usage_rate": 60, "satisfaction": 4.6},
        {"feature": "Language Switch", "usage_rate": 15, "satisfaction": 4.9},
        {"feature": "Timeline Tracker", "usage_rate": 45, "satisfaction": 4.5},
        {"feature": "Appointment Booking", "usage_rate": 25, "satisfaction": 4.3}
    ],
    "user_journey_stages": [
        {"stage": "Awareness", "duration_days": "1-7", "interactions": 3, "questions": ["What is IVF?", "Am I a candidate?", "How much does it cost?"]},
        {"stage": "Research", "duration_days": "7-30", "interactions": 8, "questions": ["Success rates?", "Best clinics?", "Insurance coverage?"]},
        {"stage": "Decision", "duration_days": "30-60", "interactions": 12, "questions": ["Timeline?", "Risks?", "Alternatives?"]},
        {"stage": "Preparation", "duration_days": "60-90", "interactions": 15, "questions": ["Next steps?", "Medications?", "Lifestyle changes?"]},
        {"stage": "Treatment", "duration_days": "90-120", "interactions": 20, "questions": ["Side effects?", "Monitoring?", "Support resources?"]}
    ]
}

# Advanced chatbot capabilities and AI features
advanced_capabilities = {
    "natural_language_processing": {
        "intent_recognition": ["medical_inquiry", "cost_question", "appointment_request", "emotional_support", "document_analysis"],
        "entity_extraction": ["age", "duration_trying", "medical_conditions", "medications", "location", "insurance_type"],
        "sentiment_analysis": ["anxious", "hopeful", "confused", "frustrated", "excited", "scared"],
        "context_awareness": ["previous_conversations", "user_profile", "treatment_stage", "medical_history"]
    },
    "personalization_features": {
        "user_profiling": ["demographic_info", "medical_history", "preferences", "communication_style"],
        "adaptive_responses": ["complexity_level", "emotional_tone", "information_depth", "cultural_sensitivity"],
        "progress_tracking": ["consultation_journey", "treatment_timeline", "goal_achievement", "learning_progress"],
        "recommendation_engine": ["clinic_matching", "treatment_options", "resources", "support_groups"]
    },
    "integration_capabilities": {
        "healthcare_systems": ["EMR_integration", "lab_results", "appointment_systems", "prescription_management"],
        "third_party_services": ["insurance_verification", "pharmacy_integration", "telehealth_platforms", "payment_processing"],
        "communication_channels": ["web_chat", "mobile_app", "voice_assistants", "sms_integration", "email_followup"],
        "data_analytics": ["conversation_analytics", "outcome_tracking", "satisfaction_metrics", "clinical_insights"]
    }
}

# Save all data to files
with open('conversation_examples.json', 'w', encoding='utf-8') as f:
    json.dump(conversation_examples, f, ensure_ascii=False, indent=2)

with open('user_interaction_patterns.json', 'w', encoding='utf-8') as f:
    json.dump(user_interaction_patterns, f, ensure_ascii=False, indent=2)

with open('advanced_capabilities.json', 'w', encoding='utf-8') as f:
    json.dump(advanced_capabilities, f, ensure_ascii=False, indent=2)

# Create CSV files for easier analysis
pd.DataFrame(user_interaction_patterns['session_types']).to_csv('session_types_analysis.csv', index=False)
pd.DataFrame(user_interaction_patterns['feature_usage']).to_csv('feature_usage_metrics.csv', index=False)
pd.DataFrame(user_interaction_patterns['user_journey_stages']).to_csv('user_journey_analysis.csv', index=False)

print("Advanced User Interaction Examples Created!")
print("=" * 50)

print("\n📱 Interactive Features Demonstrated:")
for feature in user_interaction_patterns['feature_usage']:
    print(f"  • {feature['feature']}: {feature['usage_rate']}% usage rate, {feature['satisfaction']}/5.0 satisfaction")

print("\n🗣️ Conversation Types Supported:")
for conv_type, examples in conversation_examples.items():
    print(f"  • {conv_type.replace('_', ' ').title()}: {len(examples)} interaction examples")

print("\n🤖 Advanced AI Capabilities:")
for category, capabilities in advanced_capabilities.items():
    print(f"  • {category.replace('_', ' ').title()}: {len(capabilities)} capability areas")

print("\n📊 User Journey Analysis:")
for stage in user_interaction_patterns['user_journey_stages']:
    print(f"  • {stage['stage']}: {stage['duration_days']} duration, {stage['interactions']} avg interactions")

print(f"\nFiles created:")
print("• conversation_examples.json - Detailed conversation flows")
print("• user_interaction_patterns.json - Usage patterns and metrics")
print("• advanced_capabilities.json - AI features and integrations")
print("• session_types_analysis.csv - Session type breakdown")
print("• feature_usage_metrics.csv - Feature usage statistics")
print("• user_journey_analysis.csv - Patient journey stages")