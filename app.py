import os
import sys
import requests
import json

def main():
    # Get the API key from the environment variables
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        print(json.dumps({"error": "MISTRAL_API_KEY not found in environment variables."}))
        return

    # Get the question from the command-line argument
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No question provided."}))
        return

    question = sys.argv[1]

    # Prepare the data for the API request
    url = "https://api.mistral.ai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "mistral-small",  # Adjust the model if necessary
        "messages": [
            {
                "role": "user",
                "content": question,
            },
        ],
    }

    # Make the API request
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))

        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            # Format the response
            ai_response = {
                "summary": "Mistral AI Response:",
                "tips": result['choices'][0]['message']['content'].split('\n'),  # Split into a list if needed
                 
            }
            print(json.dumps(ai_response))  # Output the response as valid JSON
        else:
            print(json.dumps({"error": f"Received status code {response.status_code}", "details": response.text}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
