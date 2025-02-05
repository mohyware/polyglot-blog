import os
import openaiAPI
import openai

api_key = os.environ.get("DEEPSEEK_API_KEY")
if not api_key:
    raise ValueError("DeepSeek API key is not set in the environment variables.")
def get_deepseek_response(user_input):
        client = openai.OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

        prompt = f"""
        Please summarize the following text.  
        Then, list important topics from the text as hashtags (e.g., #AI, #Technology).

        Text:
        {user_input}
        """
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": prompt},
            ],
            stream=False
        )
        return response.choices[0].message.content

print("DeepSeek AI is loaded")