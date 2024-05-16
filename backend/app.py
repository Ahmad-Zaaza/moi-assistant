from flask import Flask, request, Response
import time
import os
import requests
from openai import OpenAI
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)


@app.route('/answer', methods=['POST'])
def transcribe_audio():
    binary_data = request.files["file"].read()

    def voice_to_text():
        api_key = os.getenv("OPENAI_API_KEY")
        openai_client = OpenAI(api_key=api_key)

        file_path = f"{str(time.time()).replace('.', '')}.mp3"

        with open(file_path, "wb") as file:
            file.write(binary_data)

        audio_file = open(file_path, "rb")

        transcription = openai_client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )

        answer = transcription.text

        yield f"data: {answer}\n\n ~"

        if os.path.exists(file_path):
            os.remove(file_path)

        # Call the RAG
        rag_url = os.getenv("RAG_URL")
        bot_id = os.getenv("BOT_ID")
        rag_payload = {
            "bot_id": bot_id,
            "question": answer,
            "debug_mode": True
        }

        rag_token = os.getenv("RAG_TOKEN")
        rag_headers = {"Authorization": f"Bearer {rag_token}"}

        rag_response = requests.post(rag_url, json=rag_payload, headers=rag_headers)
        rag_answer = rag_response.json()['answer']

        yield f"data: {rag_answer}\n\n ~"

        response = openai_client.audio.speech.create(
            model="tts-1",
            voice="echo",
            input=rag_answer
        )

        file_path = f"./{str(time.time()).replace('.', '')}.mp3"

        response.write_to_file(file_path)

        # read the file
        if os.path.exists(file_path):
            # Read the content of the file as binary data
            with open(file_path, "rb") as file:
                chunk_size = 1024
                while True:
                    chunk = file.read(chunk_size)
                    if not chunk:
                        break
                    # yield f"data: {chunk}\n\n"
                    yield chunk

            # Delete the file
            os.remove(file_path)

    return Response(voice_to_text(), content_type='text/event-stream')


@app.route('/reset', methods=['POST'])
def reset_bot():
    conv_id = request.form.get('conv_id')
    def reset():
        rag_url = "https://gen-ai-studio.devel.openinnovation.ai/api/app/rag_conversation_debugger/update"
        rag_payload = {
            "id": conv_id,
            "conversation_metadata": None,
            "queries": None
        }
        rag_token = os.getenv("RAG_TOKEN")
        rag_headers = {"Authorization": f"Bearer {rag_token}"}
        bot_response = requests.put(rag_url, json=rag_payload, headers=rag_headers)
        return bot_response

    return Response(reset(), content_type='application/json', status=200)


if __name__ == '__main__':
    app.run(debug=True)
