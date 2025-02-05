import os
import google.generativeai as genai

api_key = os.environ.get("GEMINI_KEY")
if not api_key:
    raise ValueError("Gemini API key is not set in the environment variables.")
def get_gemini_response(user_input):
        genai.configure(api_key=api_key)

        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = f"""
        Please summarize the following text.  
        Then, list important topics from the text as hashtags (e.g., #AI, #Technology).

        Your response should be structured like this:

        Summary:
        [Summary of the text]

        Important Topics:
        #Topic1
        #Topic2
        #Topic3

        Text:
        {user_input}
        """
        response = model.generate_content(prompt)
        return response.text

print("Gemini AI is loaded")