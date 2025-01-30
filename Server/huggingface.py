import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

def get_model_response(user_input):
    # Load environment variables
    load_dotenv()
    api_key = os.environ.get("HUGGING_FACE_KEY")

    # Initialize the Inference client
    client = InferenceClient(api_key=api_key)

    # Prepare the messages with user input
    messages = [
        {
            "role": "user",
            "content": user_input
        }
    ]

    # Create a streaming request for model completion
    stream = client.chat.completions.create(
        model="google/gemma-2-2b-it", 
        messages=messages, 
        max_tokens=500,
        stream=True
    )

    # Collect and return the generated response
    response = ""
    for chunk in stream:
        response += chunk.choices[0].delta.content
    return response
