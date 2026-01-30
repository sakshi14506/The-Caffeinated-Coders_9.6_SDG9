import gradio as gr
import pandas as pd
import folium
import os
from datetime import datetime

DATA_FILE = "reports.csv"

def init_db():
    if not os.path.exists(DATA_FILE):
        df = pd.DataFrame(columns=[
            "id", "time", "issue_type", "description",
            "severity", "status", "lat", "lng"
        ])
        df.to_csv(DATA_FILE, index=False)

def submit_report(issue_type, description, severity, lat, lng):
    init_db()
    df = pd.read_csv(DATA_FILE)

    rid = len(df) + 1
    new_row = {
        "id": rid,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "issue_type": issue_type,
        "description": description,
        "severity": severity,
        "status": "Submitted",
        "lat": lat,
        "lng": lng
    }

    df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    df.to_csv(DATA_FILE, index=False)

    return f"✅ Report submitted successfully! Report ID: {rid}"

def get_reports():
    init_db()
    return pd.read_csv(DATA_FILE)

def generate_map():
    init_db()
    df = pd.read_csv(DATA_FILE)

    if df.empty:
        m = folium.Map(location=[20.5937, 78.9629], zoom_start=5)
        m.save("map.html")
        return "map.html"

    m = folium.Map(location=[df["lat"].mean(), df["lng"].mean()], zoom_start=12)

    for _, row in df.iterrows():
        folium.Marker(
            location=[row["lat"], row["lng"]],
            popup=f"""
            <b>ID:</b> {row['id']}<br>
            <b>Type:</b> {row['issue_type']}<br>
            <b>Severity:</b> {row['severity']}<br>
            <b>Status:</b> {row['status']}<br>
            <b>Desc:</b> {row['description']}
            """
        ).add_to(m)

    m.save("map.html")
    return "map.html"

with gr.Blocks(title="Infrastructure Reporting Platform (PS 9.6)") as demo:
    gr.Markdown("# 🏙️ Infrastructure Reporting Platform (PS 9.6)")
    gr.Markdown("Citizen reports → stored in DB → map pins → admin can view")

    with gr.Tab("📌 Citizen Report"):
        issue_type = gr.Dropdown(
            ["Pothole", "Garbage", "Streetlight", "Water Leakage", "Road Crack", "Drain Blockage"],
            label="Issue Type"
        )
        description = gr.Textbox(label="Description", placeholder="Explain the issue briefly...")
        severity = gr.Slider(1, 10, step=1, value=5, label="Severity (1-10)")
        lat = gr.Number(value=19.0760, label="Latitude")
        lng = gr.Number(value=72.8777, label="Longitude")

        submit_btn = gr.Button("Submit Report")
        submit_out = gr.Textbox(label="Submission Result")

        submit_btn.click(
            submit_report,
            inputs=[issue_type, description, severity, lat, lng],
            outputs=submit_out
        )

    with gr.Tab("🏛 Admin Dashboard"):
        refresh_btn = gr.Button("Refresh Reports")
        reports_table = gr.Dataframe(label="All Reports")

        refresh_btn.click(get_reports, outputs=reports_table)

        map_btn = gr.Button("Generate Map")
        map_file = gr.File(label="Map HTML")
        map_btn.click(generate_map, outputs=map_file)

demo.launch()
