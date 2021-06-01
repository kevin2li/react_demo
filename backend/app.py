import base64
import io
import os
import sys

sys.path.append('..')
import time

import torch.nn.functional as F
from flask import Flask, jsonify, request
from icecream import ic
from PIL import Image
from backend.utils import img_preprocess, plot_group_bars
from backend.pytorch_version.models import ZhuNet

# os.environ['FLASK_APP'] = '/home/kevin2li/code/react_demo/flask-demo'
# os.environ['FLASK_ENV']='development'
model = ZhuNet()
model = model.load_from_checkpoint('/home/kevin2li/code/react_demo/backend/pytorch_version/checkpoints/wow-epoch=210-val_loss=0.44-val_acc=0.85.ckpt')

app = Flask(__name__)

state = {
    'img_path': [],
    'models': [],
    'embedding_rate': 0.4,
    'dataset': 'WOW',
    'framework': 'pytorch'
}




@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/')
@app.route('/index')
def index():
    return jsonify({'current_tab': '1'})

@app.route('/steganography')
def steganography():
    return jsonify({'current_tab': '2'})

@app.route('/steganalysis')
def steganalysis():
    return jsonify({'current_tab': '3'})

@app.route('/download')
def download():
    return jsonify({'current_tab': '4'})

@app.route('/blog')
def blog():
    return jsonify({'current_tab': '5'})

@app.route('/about')
def about():
    return jsonify({'current_tab': '6'})

@app.route('/submit', methods=['GET', 'POST'])
def submit():
    print(request.method)
    note = request.form.get('note')
    gender = request.form.get('gender')
    imgs = request.files['file']
    imgs.save(f"upload/{imgs.filename}")
    print(note, gender)
    return {'name': 'Lucy'}

@app.route('/image', methods=['GET'])
def get_image():
    img = Image.open('upload/12.png')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    image_binary = buffer.getvalue()
    encoded_img = base64.encodebytes(image_binary).decode('ascii')
    return jsonify({'type': 'image', 'image_data': encoded_img})

@app.route('/upload_image', methods=['POST'])
def upload_image():
    img = request.files['file']
    save_path = f"upload/{img.filename}"
    img.save(save_path)
    state['img_path'].append(save_path)
    ic(state['img_path'])
    return jsonify({'status': 'ok'})

@app.route('/predict', methods=['POST'])
def predict():
    ic(vars(request))
    models = request.form.get('models')
    dataset = request.form.get('dataset')
    embedding_rate = request.form.get('embedding_rate')
    framework = request.form.get('framework')
    ic(models)
    ic(framework)
    ic(dataset)
    ic(embedding_rate)
    response = {'status': 'ok'}
    response['result'] = {}
    if state['img_path'] and models and framework and dataset and embedding_rate:
        ic(type(models))
        if isinstance(models, str):
            img = img_preprocess(state['img_path'][0])
            logits = model(img)
            probs = F.softmax(logits, dim=1).squeeze()
            ic(probs)
            response['result'][models] = probs.tolist()
        elif isinstance(models, list):
            for model_name in models:
                img = img_preprocess(state['img_path'][0])
                logits = model(img)
                probs = F.softmax(logits, dim=1)
                ic(probs)
                response['result'][model_name] = probs.tolist()
        else:
            raise ValueError("not supported format yet")
        ic(response['result'])
        fig = plot_group_bars(response['result'])
        fig.savefig('bar.png')

        img = Image.open('bar.png')
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        image_binary = buffer.getvalue()
        encoded_img = base64.encodebytes(image_binary).decode('ascii')
        response['result']['image'] = encoded_img
    return jsonify(response)

# @app.route('/predict', methods=['POST'])
# def predict():
#     img = request.files['file']
#     save_path = f"upload/{img.filename}"
#     img.save(save_path)
#     img = img_preprocess(save_path)
#     logits = model(img)
#     probs = F.softmax(logits, dim=1)
#     ic(probs)
#     return jsonify({'probs': probs.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
