import plotly.graph_objects as go
import json

# Parse the data
data = {
    "user_journey": [
        {"step": "Landing", "type": "entry", "description": "User visits FertilityAI chatbot"},
        {"step": "Welcome", "type": "bot_response", "description": "Bot greets and explains capabilities"},
        {"step": "Feature Selection", "type": "decision", "description": "User chooses interaction type"},
        {"step": "Voice Input", "type": "feature", "description": "Speech-to-text conversation"},
        {"step": "Document Upload", "type": "feature", "description": "Medical report analysis"},
        {"step": "Cost Calculator", "type": "feature", "description": "Personalized pricing estimation"},
        {"step": "Appointment Booking", "type": "feature", "description": "Schedule consultation"},
        {"step": "Language Selection", "type": "feature", "description": "Multi-language support"},
        {"step": "Educational Content", "type": "feature", "description": "IVF information and resources"},
        {"step": "Personalization", "type": "ai_process", "description": "AI adapts responses based on user profile"},
        {"step": "Export Options", "type": "action", "description": "Save conversation and recommendations"}
    ],
    "interactions": [
        {"from": "Landing", "to": "Welcome", "type": "automatic"},
        {"from": "Welcome", "to": "Feature Selection", "type": "user_choice"},
        {"from": "Feature Selection", "to": "Voice Input", "type": "branch"},
        {"from": "Feature Selection", "to": "Document Upload", "type": "branch"},
        {"from": "Feature Selection", "to": "Cost Calculator", "type": "branch"},
        {"from": "Feature Selection", "to": "Appointment Booking", "type": "branch"},
        {"from": "Feature Selection", "to": "Language Selection", "type": "branch"},
        {"from": "Feature Selection", "to": "Educational Content", "type": "branch"},
        {"from": "Voice Input", "to": "Personalization", "type": "process"},
        {"from": "Document Upload", "to": "Personalization", "type": "process"},
        {"from": "Cost Calculator", "to": "Personalization", "type": "process"},
        {"from": "Appointment Booking", "to": "Export Options", "type": "completion"},
        {"from": "Personalization", "to": "Export Options", "type": "final"}
    ]
}

# Define positions for nodes in flowchart layout
positions = {
    "Landing": (0, 10),
    "Welcome": (0, 8),
    "Feature Selection": (0, 6),
    "Voice Input": (-4, 4),
    "Document Upload": (-2, 4),
    "Cost Calculator": (0, 4),
    "Appointment Booking": (2, 4),
    "Language Selection": (4, 4),
    "Educational Content": (6, 4),
    "Personalization": (-1, 2),
    "Export Options": (1, 0)
}

# Define colors and symbols for different node types
type_config = {
    "entry": {"color": "#1FB8CD", "symbol": "circle", "size": 25},
    "bot_response": {"color": "#DB4545", "symbol": "square", "size": 25},
    "decision": {"color": "#2E8B57", "symbol": "diamond", "size": 30},
    "feature": {"color": "#5D878F", "symbol": "hexagon", "size": 25},
    "ai_process": {"color": "#D2BA4C", "symbol": "star", "size": 30},
    "action": {"color": "#B4413C", "symbol": "square", "size": 25}
}

# Create the figure
fig = go.Figure()

# Add nodes
for step_data in data["user_journey"]:
    step = step_data["step"]
    step_type = step_data["type"]
    x, y = positions[step]
    
    config = type_config[step_type]
    
    # Abbreviate long step names to fit 15 char limit
    display_name = step
    if len(step) > 15:
        if step == "Feature Selection":
            display_name = "Feature Select"
        elif step == "Document Upload":
            display_name = "Doc Upload"
        elif step == "Cost Calculator":
            display_name = "Cost Calc"
        elif step == "Appointment Booking":
            display_name = "Booking"
        elif step == "Language Selection":
            display_name = "Language"
        elif step == "Educational Content":
            display_name = "Education"
        elif step == "Personalization":
            display_name = "Personaliz"
        elif step == "Export Options":
            display_name = "Export"
    
    fig.add_trace(go.Scatter(
        x=[x], y=[y],
        mode='markers+text',
        marker=dict(
            symbol=config["symbol"],
            size=config["size"],
            color=config["color"],
            line=dict(width=2, color='white')
        ),
        text=[display_name],
        textposition="middle center",
        textfont=dict(size=11, color='white', family="Arial Black"),
        hovertemplate=f"<b>{step}</b><br>{step_data['description']}<extra></extra>",
        showlegend=False,
        name=""
    ))

# Add arrows for connections
for interaction in data["interactions"]:
    from_step = interaction["from"]
    to_step = interaction["to"]
    
    from_pos = positions[from_step]
    to_pos = positions[to_step]
    
    # Calculate arrow direction
    dx = to_pos[0] - from_pos[0]
    dy = to_pos[1] - from_pos[1]
    
    # Adjust start and end points to avoid overlapping with nodes
    arrow_length = (dx**2 + dy**2)**0.5
    if arrow_length > 0:
        unit_dx = dx / arrow_length
        unit_dy = dy / arrow_length
        
        start_x = from_pos[0] + unit_dx * 0.8
        start_y = from_pos[1] + unit_dy * 0.8
        end_x = to_pos[0] - unit_dx * 0.8
        end_y = to_pos[1] - unit_dy * 0.8
        
        fig.add_annotation(
            x=end_x, y=end_y,
            ax=start_x, ay=start_y,
            xref="x", yref="y",
            axref="x", ayref="y",
            arrowhead=2,
            arrowsize=1.5,
            arrowwidth=2,
            arrowcolor="#666666",
            opacity=0.8
        )

# Create legend manually positioned on the left
legend_y = 9
legend_items = [
    ("Entry Point", "#1FB8CD"),
    ("Bot Response", "#DB4545"),
    ("Decision", "#2E8B57"),
    ("Feature/Tool", "#5D878F"),
    ("AI Process", "#D2BA4C"),
    ("User Action", "#B4413C")
]

for i, (label, color) in enumerate(legend_items):
    fig.add_trace(go.Scatter(
        x=[-8], y=[legend_y - i*0.8],
        mode='markers+text',
        marker=dict(size=18, color=color, symbol='square'),
        text=[label],
        textposition="middle right",
        textfont=dict(size=11),
        showlegend=False,
        hoverinfo='skip',
        name=""
    ))

# Update layout
fig.update_layout(
    title="FertilityAI User Flow",
    title_x=0.5,
    xaxis=dict(
        range=[-10, 8],
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        visible=False
    ),
    yaxis=dict(
        range=[-1, 11],
        showgrid=False,
        showticklabels=False,
        zeroline=False,
        visible=False
    ),
    plot_bgcolor='white',
    paper_bgcolor='white',
    showlegend=False
)

# Save the chart
fig.write_image("fertility_ai_flowchart.png", width=1200, height=800)
print("Chart saved as fertility_ai_flowchart.png")