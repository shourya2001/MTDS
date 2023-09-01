import os
from flask import Flask, flash, request, redirect, url_for, session, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import PyPDF2
import fitz
import os
import openai
import torch
import json 
from transformers import T5Tokenizer, T5ForConditionalGeneration, T5Config
from rouge import Rouge
import bert_score
from evaluate import load
from image_save import extract_images
import shutil
# from flask_cloudinary import CloudinaryApp
import cloudinary
from cloudinary.uploader import upload

openai.api_key = "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"
def summarize(text):
    response = openai.Completion.create(
    model="text-davinci-003",
    prompt="Summarize this for a second-grade student:\n\n" + text,
    temperature=0.7,
    max_tokens=1000,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0
    )
    return response

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CLOUDINARY_URL'] = 'cloudinary://du7tc1ufz:125593653656741:UhHdtfJQ9d8NOJdtUpi30CKPKFs'
# cloudinary_app = CloudinaryApp(app)

def check_num_files(folder_path):
    num_files = len([f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))])
    # print(f'The folder {folder_path} contains {num_files} files.')
    return num_files+1


def readPDF(path):
    doc = fitz.open(path)
    text = ""
    for page in doc:
        text+=page.get_text()
    # print(text)
    return text

def summarizer(text):
    model = T5ForConditionalGeneration.from_pretrained('t5-base')
    tokenizer = T5Tokenizer.from_pretrained('t5-base', max_length=1024,model_max_length=1024, truncation=True)
    t5_prepared_Text = "summarize: "+ text
    # print ("Original text preprocessed: \n", text)

    tokenized_text = tokenizer.encode(t5_prepared_Text, return_tensors="pt")


    # summmarize 
    summary_ids = model.generate(tokenized_text,
                                        num_beams=4,
                                        no_repeat_ngram_size=2,
                                        min_length=100,
                                        max_length=700,
                                        early_stopping=True)

    output = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    print ("\n\nSummarized text: \n",output)
    return output


@app.route('/upload', methods=['POST'])
def fileUpload():
    if 'files' not in request.files:
        print('no files')
    file_obj = request.files
    uploaded_files = request.files.getlist('files')
    print(uploaded_files)
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    text=""
    image_path = "./images"
    if os.path.exists(image_path):
        # If the folder exists, delete it and its contents
        shutil.rmtree(image_path)
    if not os.path.isdir(image_path):
        os.mkdir(image_path)
    for file in uploaded_files:
        destination="/".join([target, file.filename])
        file.save(destination)
        session['uploadFilePath']=destination
        extract_images(destination, check_num_files("./images"))
        text += readPDF(destination)
    print(text)
    image_urls = []
    cloudinary.config(cloud_name = 'du7tc1ufz', api_key='125593653656741', 
    api_secret='UhHdtfJQ9d8NOJdtUpi30CKPKFs')
    for file_name in os.listdir(image_path):
        upload_result = upload(os.path.join(image_path, file_name))
        image_url = upload_result['secure_url']
        image_urls.append(image_url)
        # return render_template('upload_success.html', image_url=image_url)
    print(image_urls)
    summary = summarizer(text)
    # summ = summarize(text)
    # print("=========================================")
    # print(summ)
    # print("=========================================")
    print(summary)
    rouge = Rouge()

    scores = rouge.get_scores(text, summary)
    print(scores)
    bertscore = load("bertscore")
    predictions = summary.split('.')
    references = text.split('.')
    b_score = bertscore.compute(predictions=predictions, references=references[:len(predictions)], lang="en")
    print(b_score)
    data = {'message': {'summary': summary, 'rouge': scores, 'bert': b_score, 'image_urls':image_urls}}
    response = jsonify(data)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    print(response)
    return response
# @app.route('/upload', methods=['POST'])
# def fileUpload():
#     print('hello')
#     if 'files' not in request.files:
#         print('no files')
#     file_obj = request.files
#     # for f in file_obj:
#     #     file = request.files.get(f)
#     #     print(file)
#     # print(request.files)
#     uploaded_files = request.files.getlist('files')
#     print(uploaded_files)
#     target=os.path.join(UPLOAD_FOLDER,'test_docs')
#     if not os.path.isdir(target):
#         os.mkdir(target)
#     # logger.info("welcome to upload`")
#     for file in uploaded_files:
#         # filename = secure_filename(file.filename)
#         destination="/".join([target, file.filename])
#         # file.save(file.filename)
#     # file = request.files['file'] 
#     # print(file)
#         file.save(destination)
#     session['uploadFilePath']=destination
#     print(destination)
#     text = readPDF(destination)
#     # print(text)

#     summary = summarizer(text)

#     print(summary)
#     rouge = Rouge()

#     scores = rouge.get_scores(text, summary)
#     print(scores)
#     bertscore = load("bertscore")
#     predictions = summary.split('.')
#     references = text.split('.')
#     b_score = bertscore.compute(predictions=predictions, references=references[:len(predictions)], lang="en")
#     print(b_score)
#     data = {'message': {'summary': summary, 'rouge': scores, 'bert': b_score}}
#     response = jsonify(data)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
#     print(response)
#     return response

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)
    CORS(app, expose_headers='Authorization')