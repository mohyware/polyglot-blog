import os
import anthropic

api_key = os.environ.get("ANTHROPIC_API_KEY")
if not api_key:
    raise ValueError("OpenAI API key is not set in the environment variables.")
def get_claude_response(user_input):

    client = anthropic.Anthropic(
        api_key=api_key,
    )

    prompt = f"""
    Please summarize the following text.  
    Then, list important topics from the text as hashtags (e.g., #AI, #Technology).

    Text:
    {user_input}
    """
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.content

print("Claude Model is loaded")