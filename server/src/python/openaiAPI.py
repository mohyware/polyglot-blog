import os
import openai

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OpenAI API key is not set in the environment variables.")
def get_openai_response(user_input: str, model: str = "gpt-3.5-turbo"):
        
        client = openai.OpenAI(api_key=api_key)

        prompt = f"""
        Please summarize the following text.  
        Then, list important topics from the text as hashtags (e.g., #AI, #Technology).

        Text:
        {user_input}
        """

        response = client.completions.create(
            prompt=[{"role": "user", "content": prompt}],
            model=model,
        )

        return response.choices[0].message["content"]  

print("OpenAI Model is loaded")