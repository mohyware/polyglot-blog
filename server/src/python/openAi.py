import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

def get_model_response(message: str, model: str = "gpt-3.5-turbo"):
    try:
        api_key = os.environ.get("OPENAI_API_KEY")
        print(f"API Key: {model}")
        # Initialize OpenAI client with API key
        client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

        # Check if the API key is available
        if not client.api_key:
            raise ValueError("OpenAI API key is not set in the environment variables.")

        # Request a completion from the OpenAI chat API
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": message}],
            model=model,
        )

        # Return the chat completion response
        return chat_completion

    except ValueError as e:
        print(f"ValueError: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# Example usage:
response = get_model_response("Say this is a test")
if response:
    print(response)
