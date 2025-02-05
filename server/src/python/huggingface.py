import os
from huggingface_hub import InferenceClient

from dotenv import load_dotenv
load_dotenv()

api_key = os.environ.get("HUGGING_FACE_KEY")
if not api_key:
    raise ValueError("Huggingface API key is not set in the environment variables.")
def get_huggingface_response(user_input):

    client = InferenceClient(model="google/gemma-2-2b-it", token=api_key)

    prompt = f"""
    Please summarize the following text.  
    Then, list important topics from the text as hashtags (e.g., #AI, #Technology).

    Text:
    {user_input}
    """
    response = client.text_generation(
        prompt=prompt,
        max_new_tokens=500
    )

    return response

print("Huggingface Model is loaded")