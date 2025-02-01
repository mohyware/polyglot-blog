import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

def get_model_response(user_input):
    # Load environment variables
    load_dotenv()
    api_key = os.environ.get("HUGGING_FACE_KEY")

    # Initialize the Inference client
    #client = InferenceClient(api_key=api_key)
    client = InferenceClient(model="google/gemma-2-2b-it", token=api_key)

    # Prepare the prompt with user input
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