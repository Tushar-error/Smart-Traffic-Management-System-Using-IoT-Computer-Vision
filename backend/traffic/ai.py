import google.generativeai as genai
from config import GOOGLE_API_KEY
from traffic.database import get_recent_logs
import json

def get_ai_traffic_report():
    if not GOOGLE_API_KEY:
        return {"error": "Google API Key not configured"}

    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')

        # Get recent 30 cycles of data
        logs = get_recent_logs(30)
        
        if not logs:
            return {"report": "No traffic data available yet for analysis."}

        # Format data for prompt
        data_summary = json.dumps(logs, indent=2)

        prompt = f"""
        You are a smart traffic analyst. Analyze the following traffic log data from a 4-way intersection (N, E, S, W).
        
        Recent Logs:
        {data_summary}
        
        Please provide a concise report including:
        1. Current traffic trends (which lanes are busiest).
        2. Detection of any unusual patterns or congestion.
        3. Recommendations for adjusting signal timings if needed.
        
        Keep the report professional, technical, and under 200 words. 
        Format the output as plain text with clear headings.
        """

        response = model.generate_content(prompt)
        return {"report": response.text}

    except Exception as e:
        return {"error": str(e)}
