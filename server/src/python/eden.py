import json
import requests
import os

api_key = os.environ.get("EDEN_Authorization")
if not api_key:
    raise ValueError("EDEN API key is not set in the environment variables.")

def get_eden_response(user_input):
        prompt = f"""
        Please summarize the following text.  
        Then, list important topics from the text as hashtags (e.g., #AI, #Technology).

        Text:
        {user_input}
        """
        headers = {"Authorization": api_key}

        url = "https://api.edenai.run/v2/text/summarize"
        payload = {
            "providers": "microsoft,connexun",
            "language": "en",
            "text": prompt
        }

        response = requests.post(url, json=payload, headers=headers)
        result = json.loads(response.text)
        return result['microsoft']['result']

print("EDEN AI is loaded")