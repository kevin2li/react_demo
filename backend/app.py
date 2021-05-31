import base64
import io
import os
import sys

sys.path.append('..')
import time
from pprint import pformat

import torch.nn.functional as F
import torchvision.transforms as T
from flask import Flask, jsonify, request, send_file
from icecream import ic
from PIL import Image

from backend.pytorch_version.models import ZhuNet

# os.environ['FLASK_APP'] = '/home/kevin2li/code/react_demo/flask-demo'
# os.environ['FLASK_ENV']='development'
model = ZhuNet()
model = model.load_from_checkpoint('/home/kevin2li/code/react_demo/backend/pytorch_version/checkpoints/wow-epoch=210-val_loss=0.44-val_acc=0.85.ckpt')
eval_transforms = T.Compose([
    T.ToTensor()
])
app = Flask(__name__)

state = {
    'img_path': None,
    'models': [],
    'embedding_rate': 0.4,
    'dataset': 'WOW',
    'framework': 'pytorch'
}

def img_preprocess(img_path, eval_transforms=eval_transforms):
    img = Image.open(img_path)
    img = eval_transforms(img)
    img = img.unsqueeze(0)
    return img


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
    print(pformat(vars(request)))
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
    state['img_path'] = save_path
    ic(save_path)
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
    if state['img_path'] and models and framework and dataset and embedding_rate:
        img = img_preprocess(state['img_path'])
        logits = model(img)
        probs = F.softmax(logits, dim=1)
        ic(probs)
        response['result'] = probs.tolist()
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
